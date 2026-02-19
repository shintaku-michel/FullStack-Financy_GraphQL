import jwt, { Secret, SignOptions } from "jsonwebtoken";

export type JwtPayload = {
    id: string;
    email: string;
};

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
    const secret: Secret = process.env.JWT_SECRET as unknown as Secret;
    const expiration = expiresIn ?? process.env.JWT_EXPIRES_IN;
    const options: SignOptions | undefined = expiration
        ? { expiresIn: expiration as unknown as NonNullable<SignOptions>["expiresIn"] }
        : undefined;
    return jwt.sign(payload, secret, options);
};
