import { prismaClient } from "../../prisma/prisma";
import { TransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
    async createTransaction(data: TransactionInput, authorId: string) {
        return prismaClient.transaction.create({
            data: {
                description: data.description,
                amount: data.amount,
                type: data.type,
                authorId,
                categoryId: data.categoryId,
            },
            include: { category: true },
        });
    }

    async listTransactions(authorId: string) {
        return prismaClient.transaction.findMany({
            where: { authorId },
            include: { category: true },
        });
    }

    async updateTransaction(id: string, data: TransactionInput, authorId: string) {
        const transaction = await prismaClient.transaction.findUnique({ where: { id } });
        if (!transaction) throw new Error("Transação não encontrada.");
        if (transaction.authorId !== authorId) throw new Error("Sem permissão para editar esta transação.");

        return prismaClient.transaction.update({
            where: { id },
            data: {
                description: data.description,
                amount: data.amount,
                type: data.type,
                categoryId: data.categoryId,
            },
            include: { category: true },
        });
    }

    async deleteTransaction(id: string, authorId: string) {
        const transaction = await prismaClient.transaction.findUnique({ where: { id } });
        if (!transaction) throw new Error("Transação não encontrada.");
        if (transaction.authorId !== authorId) throw new Error("Sem permissão para excluir esta transação.");

        await prismaClient.transaction.delete({ where: { id } });
        return true;
    }
}
