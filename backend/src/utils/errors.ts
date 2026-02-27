import { GraphQLError } from "graphql";

export const AppError = {
    unauthenticated: (message = "Usuário não autenticado.") =>
        new GraphQLError(message, { extensions: { code: "UNAUTHENTICATED" } }),

    forbidden: (message = "Sem permissão para realizar esta ação.") =>
        new GraphQLError(message, { extensions: { code: "FORBIDDEN" } }),

    notFound: (message = "Recurso não encontrado.") =>
        new GraphQLError(message, { extensions: { code: "NOT_FOUND" } }),

    conflict: (message = "Recurso já existe.") =>
        new GraphQLError(message, { extensions: { code: "CONFLICT" } }),

    invalidCredentials: (message = "Credenciais inválidas.") =>
        new GraphQLError(message, { extensions: { code: "INVALID_CREDENTIALS" } }),

    invalidRefreshToken: (message = "Refresh token inválido ou expirado.") =>
        new GraphQLError(message, { extensions: { code: "INVALID_REFRESH_TOKEN" } }),

    constraintViolation: (message: string) =>
        new GraphQLError(message, { extensions: { code: "CONSTRAINT_VIOLATION" } }),
};
