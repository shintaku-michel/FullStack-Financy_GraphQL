import { prismaClient } from "../../prisma/prisma";
import { RegisterInput } from "../dtos/input/auth.input";
import { hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";
import { User } from "../generated/client";

export class AuthService {
    async register(data: RegisterInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (existingUser) {
            throw new Error("E-mail já cadastrado!");
        }
        const hash = await hashPassword(data.password);
        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
            }
        })
        return this.generateTokens(user);
    }

    generateTokens(user: User) {
        const token = signJwt({ id: user.id, email: user.email }, '15m')
        const refreshToken = signJwt({ id: user.id, email: user.email }, '1d')
        return {
            token,
            refreshToken,
            user
        }
    }
}
