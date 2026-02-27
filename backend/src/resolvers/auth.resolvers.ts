import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginInput, LogoutInput, RefreshTokenInput, RegisterInput } from "../dtos/input/auth.input";
import { LoginOutput, RefreshTokenOutput, RegisterOutput } from "../dtos/output/auth.output";
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
    private authService = new AuthService();

    @Mutation(() => LoginOutput)
    async login(
        @Arg("data", () => LoginInput) data: LoginInput
    ): Promise<LoginOutput> {
        return this.authService.login(data);
    }

    @Mutation(() => RegisterOutput)
    async register(
        @Arg("data", () => RegisterInput) data: RegisterInput
    ): Promise<RegisterOutput> {
        return this.authService.register(data);
    }

    // Público: funciona mesmo sem access token (ex.: silently refresh em background)
    @Mutation(() => RefreshTokenOutput)
    async refreshToken(
        @Arg("data", () => RefreshTokenInput) data: RefreshTokenInput
    ): Promise<RefreshTokenOutput> {
        return this.authService.refreshToken(data);
    }

    // Público: funciona mesmo com access token expirado
    @Mutation(() => Boolean)
    async logout(
        @Arg("data", () => LogoutInput) data: LogoutInput
    ): Promise<boolean> {
        return this.authService.logout(data);
    }
}
