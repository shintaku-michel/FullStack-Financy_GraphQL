export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}
export interface LoginInput {
    email: string;
    password: string;
}

