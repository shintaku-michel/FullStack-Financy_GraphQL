import { MiddlewareFn } from "type-graphql";
import { GraphqlContext } from "../graphql/context";
import { AppError } from "../utils/errors";

export const IsAuth: MiddlewareFn<GraphqlContext> = async ({ context }, next) => {
    if (!context.user) {
        throw AppError.unauthenticated();
    }
    return next();
};
