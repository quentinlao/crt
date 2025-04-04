import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { PostDetail, loader as postDetailLoader, action as postDetailAction } from "./components/PostDetail/PostDetail";
import { PostList, loader as postListLoader } from "./components/PostList/PostList";
import { MainLayout } from "./components/MainLayout/MainLayout";

/**
 * Router for the application.
 */
export const router = createBrowserRouter(
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
