import { Arg, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionInput } from "../dtos/input/transaction.input";
import { GraphqlContext } from "../graphql/context";
import { IsAuth } from "../middlewares/auth.middlewares";
import { TransactionModel } from "../models/transaction.model";
import { UserModel } from "../models/user.model";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.services";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
    private transactionService = new TransactionService();
    private userService = new UserService();

    @Mutation(() => TransactionModel)
    async createTransaction(
        @Arg("data", () => TransactionInput) data: TransactionInput,
        @Ctx() ctx: GraphqlContext
    ): Promise<TransactionModel> {
        return this.transactionService.createTransaction(data, ctx.user!);
    }

    @Mutation(() => TransactionModel)
    async updateTransaction(
        @Arg("id", () => ID) id: string,
        @Arg("data", () => TransactionInput) data: TransactionInput,
        @Ctx() ctx: GraphqlContext
    ): Promise<TransactionModel> {
        return this.transactionService.updateTransaction(id, data, ctx.user!);
    }

    @Mutation(() => Boolean)
    async deleteTransaction(
        @Arg("id", () => ID) id: string,
        @Ctx() ctx: GraphqlContext
    ): Promise<boolean> {
        return this.transactionService.deleteTransaction(id, ctx.user!);
    }

    @Query(() => [TransactionModel])
    async listTransactions(
        @Ctx() ctx: GraphqlContext
    ): Promise<TransactionModel[]> {
        return this.transactionService.listTransactions(ctx.user!);
    }

    @FieldResolver(() => UserModel)
    async author(@Root() transaction: TransactionModel): Promise<UserModel> {
        return this.userService.findUser(transaction.authorId);
    }

    @FieldResolver(() => String)
    async authorName(@Root() transaction: TransactionModel): Promise<string> {
        const user = await this.userService.findUser(transaction.authorId);
        return user.name;
    }
}
