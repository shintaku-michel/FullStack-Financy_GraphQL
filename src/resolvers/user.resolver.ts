import { Arg, ID, Query, Resolver } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.services";

@Resolver(() => UserModel)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => UserModel)
    async getUser(
        @Arg("id", () => ID) id: string
    ): Promise<UserModel | null> {
        return this.userService.findUser(id);
    }
}
