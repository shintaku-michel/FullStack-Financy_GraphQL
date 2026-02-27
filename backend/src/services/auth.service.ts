import { prismaClient } from "../../prisma/prisma";
import { LoginInput, LogoutInput, RefreshTokenInput, RegisterInput } from "../dtos/input/auth.input";
import { User } from "../generated/client";
import { AppError } from "../utils/errors";
import { comparePassword, hashPassword } from "../utils/hash";
import { JwtPayload, signJwt, verifyJwt } from "../utils/jwt";

const REFRESH_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 1 dia em ms

export class AuthService {
    async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: { email: data.email }
        });
        if (!existingUser) throw AppError.notFound("Usuário não cadastrado.");
        const match = await comparePassword(data.password, existingUser.password!);
        if (!match) throw AppError.invalidCredentials("Senha incorreta.");
        return this.generateTokens(existingUser);
    }

    async register(data: RegisterInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: { email: data.email }
        });
        if (existingUser) throw AppError.conflict("E-mail já cadastrado.");
        const hash = await hashPassword(data.password);
        const user = await prismaClient.user.create({
            data: { name: data.name, email: data.email, password: hash }
        });
        return this.generateTokens(user);
    }

    async refreshToken(data: RefreshTokenInput) {
        // 1. Verifica assinatura e expiração do JWT
        let payload: JwtPayload;
        try {
            payload = verifyJwt(data.refreshToken) as JwtPayload;
        } catch {
            throw AppError.invalidRefreshToken();
        }

        // 2. Busca o registro no banco
        const storedToken = await prismaClient.refreshToken.findUnique({
            where: { token: data.refreshToken }
        });
        if (!storedToken) throw AppError.invalidRefreshToken("Refresh token não encontrado.");

        // 3. Reuse Detection: token já foi rotacionado (revogado)
        //    → indica possível roubo → revoga TODOS os tokens do usuário
        if (storedToken.revoked) {
            await prismaClient.refreshToken.updateMany({
                where: { userId: storedToken.userId },
                data: { revoked: true }
            });
            throw AppError.invalidRefreshToken("Refresh token já utilizado. Faça login novamente.");
        }

        // 4. Verifica expiração no banco (defesa em profundidade)
        if (storedToken.expiresAt < new Date()) {
            throw AppError.invalidRefreshToken("Refresh token expirado.");
        }

        // 5. Rotaciona: revoga o token atual
        await prismaClient.refreshToken.update({
            where: { id: storedToken.id },
            data: { revoked: true }
        });

        // 6. Gera novo par de tokens
        const user = await prismaClient.user.findUnique({ where: { id: payload.id } });
        if (!user) throw AppError.notFound("Usuário não encontrado.");

        return this.generateTokens(user);
    }

    async logout(data: LogoutInput) {
        const storedToken = await prismaClient.refreshToken.findUnique({
            where: { token: data.refreshToken }
        });
        if (storedToken && !storedToken.revoked) {
            await prismaClient.refreshToken.update({
                where: { id: storedToken.id },
                data: { revoked: true }
            });
        }
        return true;
    }

    async generateTokens(user: User) {
        const token = signJwt({ id: user.id, email: user.email }, "5s");
        const refreshToken = signJwt({ id: user.id, email: user.email }, "1d");

        await prismaClient.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
            }
        });

        return { token, refreshToken, user };
    }
}
