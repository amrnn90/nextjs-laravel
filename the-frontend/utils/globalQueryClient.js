import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failCount, error) =>
        String(error.response?.status).startsWith("4") &&
        error.response?.status !== 408
          ? false
          : true,
    },
  },
});

export default queryClient;
