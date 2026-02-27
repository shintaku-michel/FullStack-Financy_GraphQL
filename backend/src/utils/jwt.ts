import { createHash } from "crypto";
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

export const verifyJwt = (token: string) => {
    const secret: Secret = process.env.JWT_SECRET as unknown as Secret;
    return jwt.verify(token, secret) as JwtPayload | null;
}

/** SHA-256 hash de um token JWT para armazenamento seguro no banco */
export const hashToken = (token: string): string => {
    return createHash("sha256").update(token).digest("hex");
};