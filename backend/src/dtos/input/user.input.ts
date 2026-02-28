import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
    @Field(() => String)
    name!: string;

    @Field(() => String)
    email!: string;
}

@InputType()
export class UpdateProfileInput {
    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    avatarUrl?: string | null;
}
