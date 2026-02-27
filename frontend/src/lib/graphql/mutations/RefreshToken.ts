import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
    mutation RefreshToken($data: RefreshTokenInput!) {
        refreshToken(data: $data) {
            token
            refreshToken
        }
    }
`;
