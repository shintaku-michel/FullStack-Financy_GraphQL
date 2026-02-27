import { useAuthStore } from "@/stores/auth";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = new SetContextLink((prevContext) => {
    const token = useAuthStore.getState().token;
    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

/**
 * Singleton: garante que todas as operações que falham simultaneamente
 * compartilham o mesmo Promise de refresh — apenas 1 chamada ao backend.
 */
let refreshingPromise: Promise<boolean> | null = null;

const refreshLink = new ApolloLink((operation, forward) => {
    // Guard anti-loop: se o próprio RefreshToken falhar, desloga localmente e encerra
    if (operation.operationName === "RefreshToken") {
        return new Observable((observer) => {
            const sub = forward(operation).subscribe({
                next: (result) => {
                    if (result.errors?.some((e: { extensions?: { code?: string } }) => e.extensions?.code === "UNAUTHENTICATED")) {
                        useAuthStore.getState().logoutLocal();
                    }
                    observer.next(result);
                },
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
            });
            return () => sub.unsubscribe();
        });
    }

    return new Observable((observer) => {
        let pendingRefresh = false;
        const sub = forward(operation).subscribe({
            next: (result) => {
                const isUnauth = result.errors?.some(
                    (e) => e.extensions?.code === "UNAUTHENTICATED"
                );

                if (!isUnauth) {
                    observer.next(result);
                    return;
                }

                pendingRefresh = true;

                // Concorrência: todas as operações falhas aguardam o mesmo Promise
                if (!refreshingPromise) {
                    refreshingPromise = useAuthStore
                        .getState()
                        .refreshAccessToken()
                        .finally(() => { refreshingPromise = null; });
                }

                refreshingPromise
                    .then((success) => {
                        pendingRefresh = false;
                        if (!success) {
                            useAuthStore.getState().logoutLocal();
                            observer.next(result);
                            observer.complete();
                            return;
                        }
                        // authLink relê o token do store → pega o novo token automaticamente
                        forward(operation).subscribe({
                            next: observer.next.bind(observer),
                            error: observer.error.bind(observer),
                            complete: observer.complete.bind(observer),
                        });
                    })
                    .catch(() => {
                        pendingRefresh = false;
                        useAuthStore.getState().logoutLocal();
                        observer.next(result);
                        observer.complete();
                    });
            },
            error: observer.error.bind(observer),
            complete: () => {
                // Só completa o observer se não há refresh pendente
                // (o observer será completado pelo subscription do retry)
                if (!pendingRefresh) observer.complete();
            },
        });

        return () => sub.unsubscribe();
    });
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([refreshLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});
