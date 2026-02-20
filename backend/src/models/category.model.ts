import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryModel {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => ID)
    authorId!: string;

    @Field(() => String)
    authorName?: string;

    @Field(() => GraphQLISODateTime)
    createdAt!: Date;

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date;
}
