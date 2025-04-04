import { Route, createHashRouter, createRoutesFromElements } from "react-router-dom";

import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { PostDetail, loader as postDetailLoader, action as postDetailAction } from "./components/PostDetail/PostDetail";
import { PostList, loader as postListLoader } from "./components/PostList/PostList";
import { MainLayout } from "./components/MainLayout/MainLayout";

/**
 * Router for the application.
 * using HashRouter to support older browsers and environments.
 * This router uses hash-based routing, which is useful for static file servers
 * and environments that do not support the HTML5 history API.
 */
export const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<PostList />} loader={postListLoader} errorElement={<ErrorPage />} />
      <Route path='posts'>
        <Route
          path=':postId'
          element={<PostDetail />}
          loader={postDetailLoader}
          errorElement={<ErrorPage />}
          action={postDetailAction}
        />
      </Route>
    </Route>
  )
);
