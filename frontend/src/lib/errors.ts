const ERROR_MESSAGES: Record<string, string> = {
    UNAUTHENTICATED: "Sessão expirada. Faça login novamente.",
    FORBIDDEN: "Você não tem permissão para realizar esta ação.",
    NOT_FOUND: "Recurso não encontrado.",
    CONFLICT: "Este registro já existe.",
    INVALID_CREDENTIALS: "E-mail ou senha incorretos.",
    INVALID_REFRESH_TOKEN: "Sessão inválida. Faça login novamente.",
    CONSTRAINT_VIOLATION: "Não é possível excluir: este registro está em uso.",
};

type GraphQLErrorLike = {
    graphQLErrors: Array<{ extensions?: { code?: string } }>;
};

function isApolloError(error: unknown): error is GraphQLErrorLike {
    return (
        typeof error === "object" &&
        error !== null &&
        "graphQLErrors" in error &&
        Array.isArray((error as GraphQLErrorLike).graphQLErrors)
    );
}

export function getErrorMessage(error: unknown, fallback = "Algo deu errado."): string {
    if (isApolloError(error) && error.graphQLErrors.length > 0) {
        const code = error.graphQLErrors[0].extensions?.code;
        if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];
    }
    return fallback;
}
