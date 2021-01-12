import { QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { persistWithLocalStorage } from "react-query/persist-localstorage-experimental";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "../utils/globalQueryClient";
import { UserProvider } from "../hooks/useUser";
import { GlobalStyles } from 'twin.macro'


persistWithLocalStorage(queryClient);

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </UserProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
