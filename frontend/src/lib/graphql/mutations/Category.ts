import { gql } from "@apollo/client";

export const CATEGORY = gql`
    mutation CreateCategory($data: CategoryInput!) {
        createCategory(data: $data) {
            id
            name
            description
            icon
            color
            authorName
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($id: ID!, $data: CategoryInput!) {
        updateCategory(id: $id, data: $data) {
            id
            name
            description
            icon
            color
            authorName
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id)
    }
`;