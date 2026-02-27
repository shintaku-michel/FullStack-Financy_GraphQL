import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apolloClient } from "../lib/graphql/apollo";
import { LOGOUT } from "../lib/graphql/mutations/Logout";
import { REFRESH_TOKEN } from "../lib/graphql/mutations/RefreshToken";
import { LOGIN } from "../lib/graphql/mutations/Login";
import { REGISTER } from "../lib/graphql/mutations/Register";
import type { LoginInput, RegisterInput, User } from "../types";

type AuthMutationData = {
    user: User;
    token: string;
    refreshToken: string;
};

type RegisterMutationData = { register: AuthMutationData };
type LoginMutationData = { login: AuthMutationData };
type RefreshMutationData = { refreshToken: { token: string; refreshToken: string } };

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    signup: (data: RegisterInput) => Promise<boolean>;
    login: (data: LoginInput) => Promise<boolean>;
    refreshAccessToken: () => Promise<boolean>;
    logout: () => Promise<void>;
    logoutLocal: () => void;
}

function setAuthState(set: (state: Partial<AuthState>) => void, data: AuthMutationData) {
    set({
        user: {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
        },
        token: data.token,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
    });
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,

            login: async (loginData: LoginInput) => {
                const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                    mutation: LOGIN,
                    variables: { data: { email: loginData.email, password: loginData.password } },
                });
                if (data?.login) {
                    setAuthState(set, data.login);
                    return true;
                }
                return false;
            },

            signup: async (registerData: RegisterInput) => {
                const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
                    mutation: REGISTER,
                    variables: { data: { name: registerData.name, email: registerData.email, password: registerData.password } },
                });
                if (data?.register) {
                    setAuthState(set, data.register);
                    return true;
                }
                return false;
            },

            refreshAccessToken: async () => {
                try {
                    const currentRefreshToken = get().refreshToken;
                    if (!currentRefreshToken) return false;

                    const { data } = await apolloClient.mutate<RefreshMutationData, { data: { refreshToken: string } }>({
                        mutation: REFRESH_TOKEN,
                        variables: { data: { refreshToken: currentRefreshToken } },
                    });

                    if (data?.refreshToken) {
                        set({ token: data.refreshToken.token, refreshToken: data.refreshToken.refreshToken });
                        return true;
                    }
                    return false;
                } catch {
                    return false;
                }
            },

            logout: async () => {
                const currentRefreshToken = get().refreshToken;
                if (currentRefreshToken) {
                    try {
                        await apolloClient.mutate({
                            mutation: LOGOUT,
                            variables: { data: { refreshToken: currentRefreshToken } },
                        });
                    } catch {
                        // Prossegue com logout local mesmo que a chamada falhe
                    }
                }
                get().logoutLocal();
            },

            logoutLocal: () => {
                set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
                apolloClient.clearStore();
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
