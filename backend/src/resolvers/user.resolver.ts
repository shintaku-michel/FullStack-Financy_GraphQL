import { Arg, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UpdateProfileInput, UserInput as CreateUserInput } from '../dtos/input/user.input';
import { GqlUser } from "../graphql/decorators/user.decorator";
import { IsAuth } from "../middlewares/auth.middlewares";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.services";

@Resolver(() => UserModel)
export class UserResolver {
    private userService = new UserService()

    @Mutation(() => UserModel)
    async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput): Promise<UserModel> {
        return this.userService.createUser(data);
    }

    @UseMiddleware(IsAuth)
    @Query(() => UserModel)
    async getUser(
        @Arg("id", () => ID) id: string
    ): Promise<UserModel | null> {
        return this.userService.findUser(id);
    }

    @UseMiddleware(IsAuth)
    @Query(() => [UserModel])
    async listUsers(): Promise<UserModel[]> {
        return this.userService.listUsers();
    }

    @UseMiddleware(IsAuth)
    @Mutation(() => UserModel)
    async updateProfile(
        @Arg("data", () => UpdateProfileInput) data: UpdateProfileInput,
        @GqlUser() user: any
    ): Promise<UserModel> {
        return this.userService.updateProfile(user.id, data);
    }
}
