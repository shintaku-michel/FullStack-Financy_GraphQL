import { createParameterDecorator, ResolverData } from "type-graphql";
import { prismaClient } from "../../../prisma/prisma";
import { User } from "../../generated/client";
import { GraphqlContext } from "../context";

export const GqlUser = () => {
    return createParameterDecorator(
        async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
            if (!context || !context.user) return null
            try {
                const user = await prismaClient.user.findUnique({
                    where: {
                        id: context.user
                    }
                });
                if (!user) throw new Error("Usuário não encontrado.");
                return user;
            } catch (error) {
                throw error;
            }
        }
    )
}