import { Arg, ID, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuth } from "../middlewares/auth.middlewares";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.services";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
    private userService = new UserService()

    @Query(() => UserModel)
    async getUser(
        @Arg("id", () => ID) id: string
    ): Promise<UserModel | null> {
        return this.userService.findUser(id);
    }
}
