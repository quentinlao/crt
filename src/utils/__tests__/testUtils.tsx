import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { useState } from "react";
import { createMemoryRouter, MemoryRouter, RouterProvider, RouteObject } from "react-router-dom";
import { History } from "history";
import { PostDetail } from "../../components/PostDetail/PostDetail";

const WrapperProvider = ({
  children,
  wrapperProps,
  routes,
}: // history,
{
  children: React.ReactNode;
  wrapperProps: wrapperProps;
  routes?: RouteObject[];
  history?: History;
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

export type wrapperProps = {
  router?: boolean;
  reactQuery?: boolean;
  history?: History;
};

const createRender =
  (wrapperProps: wrapperProps) =>
  (ui: React.ReactElement, { routes, history }: { routes?: RouteObject[]; history?: History } = {}) => {
    type RenderProps = { children: React.ReactNode };

    function RenderWrapper({ children }: RenderProps) {
      return (
        <WrapperProvider wrapperProps={wrapperProps} history={history} routes={routes}>
          {children}
        </WrapperProvider>
      );
    }
    return { ...render(ui, { wrapper: RenderWrapper }) };
  };

export { createRender };
