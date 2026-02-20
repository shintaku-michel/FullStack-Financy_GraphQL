import { Field, Float, InputType } from "type-graphql";
import { TransactionType } from "../../generated/enums";

@InputType()
export class TransactionInput {
    @Field(() => String)
    description!: string;

    @Field(() => Float)
    amount!: number;

    @Field(() => TransactionType)
    type!: TransactionType;

    @Field(() => String)
    categoryId!: string;
}
