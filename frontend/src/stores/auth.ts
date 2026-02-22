import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apolloClient } from "../lib/graphql/apollo";
import { LOGIN } from "../lib/graphql/mutations/Login";
import { REGISTER } from "../lib/graphql/mutations/Register";
import type { LoginInput, RegisterInput, User } from "../types";

type RegisterMutationData = {
    register: {
        user: User;
        token: string;
        refreshToken: string;
    }
}
type LoginMutationData = {
    login: {
        user: User;
        token: string;
        refreshToken: string;
    }
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    signup: (data: RegisterInput) => Promise<boolean>;
    login: (data: LoginInput) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (loginData: LoginInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                        mutation: LOGIN,
                        variables: {
                            data: {
                                email: loginData.email,
                                password: loginData.password
                            }
                        }
                    });
                    if (data?.login) {
                        const { token, user } = data.login;
                        set({
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false

                } catch (error) {
                    console.error("Erro no login:");
                    throw error;
                }
            },

            signup: async (registerData: RegisterInput) => {
                try {
                    const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
                        mutation: REGISTER,
                        variables: {
                            data: {
                                name: registerData.name,
                                email: registerData.email,
                                password: registerData.password
                            }
                        }
                    });
                    if (data?.register) {
                        const { token, user } = data.register;
                        set({
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false

                } catch (error) {
                    console.error("Erro no cadastro:");
                    throw error
                }
            }
        }),
        {
            name: "auth-storage"
        }
    )
);