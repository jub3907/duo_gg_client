import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL } from 'config/env';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export function createApolloClient() {
  const errorLink = onError(
    ({ graphQLErrors, networkError, response, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.map((error) => {
          graphQLErrors.forEach((error) => {
            if (process.env.NODE_ENV === 'development') {
              console.error(error);
              console.error(
                `[GraphQL error]\n<Message> ${error.message} ${error.stack}`,
              );
              console.error(error.extensions);
            }
          });
        });
      }
      if (networkError) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Network Error]: ${networkError}`);
        }
        networkError.message = '서버 오류 발생가 발생했습니다.';
      }
    },
  );

  const headerLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers,
    }));
    return forward(operation);
  });

  const cache = new InMemoryCache();

  const httpLink = new HttpLink({
    uri: API_URL,
    credentials: 'include',
  });

  return new ApolloClient({
    link: from([errorLink, headerLink, httpLink]),
    cache,
    ssrMode: typeof window === 'undefined',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      },
    },
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

export const withApollo = (PageComponent: any) => {
  const WithApollo = ({ apollClient, apolloState, ...pageProps }: any) => {
    const client = initializeApollo(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  return WithApollo;
};
