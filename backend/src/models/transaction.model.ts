import { Field, Float, GraphQLISODateTime, ID, ObjectType, registerEnumType } from "type-graphql";
import { TransactionType } from "../generated/enums";
import { CategoryModel } from "./category.model";

registerEnumType(TransactionType, {
    name: "TransactionType",
    description: "Tipo da transação: INCOME (Receita) ou EXPENSE (Despesa)",
});

@ObjectType()
export class TransactionModel {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    description!: string;

    @Field(() => Float)
    amount!: number;

    @Field(() => TransactionType)
    type!: TransactionType;

    @Field(() => ID)
    authorId!: string;

    @Field(() => String)
    authorName?: string;

    @Field(() => CategoryModel)
    category!: CategoryModel;

    @Field(() => GraphQLISODateTime)
    createdAt!: Date;

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date;
}
