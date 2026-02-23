import { Arg, Ctx, FieldResolver, ID, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CategoryInput } from "../dtos/input/category.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { prismaClient } from "../../prisma/prisma";
import { GraphqlContext } from "../graphql/context";
import { IsAuth } from "../middlewares/auth.middlewares";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { CategoryService } from "../services/category.service";
import { UserService } from "../services/user.services";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
    private categoryService = new CategoryService();
    private userService = new UserService();

    @Mutation(() => CategoryModel)
    async createCategory(
        @Arg("data", () => CategoryInput) data: CategoryInput,
        @GqlUser() user: any
    ): Promise<CategoryModel> {
        return this.categoryService.createCategory(data, user.id);
    }

    @Mutation(() => CategoryModel)
    async updateCategory(
        @Arg("id", () => ID) id: string,
        @Arg("data", () => CategoryInput) data: CategoryInput,
        @GqlUser() user: any
    ): Promise<CategoryModel> {
        return this.categoryService.updateCategory(id, data, user.id);
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg("id", () => ID) id: string,
        @GqlUser() user: any
    ): Promise<boolean> {
        return this.categoryService.deleteCategory(id, user.id);
    }

    @Query(() => [CategoryModel])
    async listCategories(@Ctx() ctx: GraphqlContext): Promise<CategoryModel[]> {
        return this.categoryService.listCategories(ctx.user!);
    }

    @FieldResolver(() => UserModel)
    async author(@Root() category: CategoryModel): Promise<UserModel> {
        return this.userService.findUser(category.authorId);
    }

    @FieldResolver(() => String)
    async authorName(@Root() category: CategoryModel): Promise<string> {
        const user = await this.userService.findUser(category.authorId);
        return user.name;
    }

    @FieldResolver(() => Int)
    async transactionCount(
        @Root() category: CategoryModel,
        @Ctx() ctx: GraphqlContext
    ): Promise<number> {
        return prismaClient.transaction.count({
            where: { categoryId: category.id, authorId: ctx.user! }
        });
    }
}
