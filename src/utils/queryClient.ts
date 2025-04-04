import { QueryClient } from "@tanstack/react-query";

/**
 * Tanstack Query Client for the application.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
