import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { useState } from "react";
import { createMemoryRouter, MemoryRouter, RouteObject, RouterProvider } from "react-router-dom";
import { PostDetail } from "../../components/PostDetail/PostDetail";

/**
 * WrapperProvider component
 * This component is used to wrap the children components with necessary providers
 * such as QueryClientProvider and RouterProvider.
 */
const WrapperProvider = ({
  children,
  wrapperProps,
  routes,
}: {
  children: React.ReactNode;
  wrapperProps: wrapperProps;
  routes?: RouteObject[];
}) => {
  const [queryClient] = useState(() => new QueryClient());

  let wrapperElement = children;

  if (!wrapperProps) {
    return wrapperElement;
  }

  const { router, reactQuery } = wrapperProps;

  if (router) {
    if (routes) {
      const router = createMemoryRouter(
        [
          {
            path: "/posts/:postId",
            element: <PostDetail />,
          },
        ],
        {
          initialEntries: ["/posts/1"],
        }
      );
      return (wrapperElement = (
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      ));
    } else {
      wrapperElement = <MemoryRouter>{wrapperElement}</MemoryRouter>;
    }
  }

  if (reactQuery) {
    wrapperElement = <QueryClientProvider client={queryClient}>{wrapperElement}</QueryClientProvider>;
  }

  return wrapperElement;
};

/**
 * wrapperProps type
 * This type is used to define the properties that can be passed to the WrapperProvider component.
 */
export type wrapperProps = {
  router?: boolean;
  reactQuery?: boolean;
};

/**
 * createRender function
 * This function is used to create a custom render function that wraps the components with necessary providers.
 * It takes wrapperProps as an argument and returns a render function.
 */
const createRender =
  (wrapperProps: wrapperProps) =>
  (ui: React.ReactElement, { routes }: { routes?: RouteObject[] } = {}) => {
    type RenderProps = { children: React.ReactNode };

    function RenderWrapper({ children }: RenderProps) {
      return (
        <WrapperProvider wrapperProps={wrapperProps} routes={routes}>
          {children}
        </WrapperProvider>
      );
    }
    return { ...render(ui, { wrapper: RenderWrapper }) };
  };

export { createRender };
