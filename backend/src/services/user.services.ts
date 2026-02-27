import { prismaClient } from "../../prisma/prisma";
import { UserInput } from "../dtos/input/user.input";
import { AppError } from "../utils/errors";

export class UserService {
    async createUser(data: UserInput) {
        const findUser = await prismaClient.user.findUnique({
            where: { email: data.email }
        });
        if (findUser) throw AppError.conflict("Usuário já cadastrado.");
        return prismaClient.user.create({
            data: { name: data.name, email: data.email }
        });
    }

    async findUser(id: string) {
        const user = await prismaClient.user.findUnique({ where: { id } });
        if (!user) throw AppError.notFound("Usuário não existe.");
        return user;
    }

    async listUsers() {
        return prismaClient.user.findMany();
    }
}
