import { prismaClient } from "../../prisma/prisma";
import { CategoryInput } from "../dtos/input/category.input";

export class CategoryService {
    async createCategory(data: CategoryInput, authorId: string) {
        const existing = await prismaClient.category.findUnique({
            where: { name_authorId: { name: data.name, authorId } }
        });
        if (existing) throw new Error("Categoria já cadastrada.");
        return prismaClient.category.create({
            data: { name: data.name, description: data.description, icon: data.icon, color: data.color, authorId }
        });
    }

    async listCategories(authorId: string) {
        return prismaClient.category.findMany({ where: { authorId } });
    }

    async updateCategory(id: string, data: CategoryInput, userId: string) {
        const category = await prismaClient.category.findUnique({ where: { id } });
        if (!category) throw new Error("Categoria não encontrada.");
        if (category.authorId !== userId) throw new Error("Sem permissão para editar esta categoria.");

        const nameConflict = await prismaClient.category.findUnique({
            where: { name_authorId: { name: data.name, authorId: userId } }
        });
        if (nameConflict && nameConflict.id !== id) throw new Error("Já existe uma categoria com esse nome.");

        return prismaClient.category.update({
            where: { id },
            data: { name: data.name, description: data.description, icon: data.icon, color: data.color }
        });
    }

    async deleteCategory(id: string, userId: string) {
        const category = await prismaClient.category.findUnique({ where: { id } });
        if (!category) throw new Error("Categoria não encontrada.");
        if (category.authorId !== userId) throw new Error("Sem permissão para excluir esta categoria.");

        const linkedTransactions = await prismaClient.transaction.count({ where: { categoryId: id } });
        if (linkedTransactions > 0) throw new Error(`Não é possível excluir: existem ${linkedTransactions} transação(ões) vinculada(s) a esta categoria.`);

        await prismaClient.category.delete({ where: { id } });
        return true;
    }
}
