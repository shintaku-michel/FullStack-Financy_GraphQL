import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryInput {
    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    icon?: string;

    @Field(() => String, { nullable: true })
    color?: string;
}
