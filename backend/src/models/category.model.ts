import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryModel {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    icon?: string;

    @Field(() => String, { nullable: true })
    color?: string;

    @Field(() => ID)
    authorId!: string;

    @Field(() => String)
    authorName?: string;

    @Field(() => Int)
    transactionCount?: number;

    @Field(() => GraphQLISODateTime)
    createdAt!: Date;

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date;
}
