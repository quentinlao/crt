import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./PostList.module.css";
import { queryClient } from "../../utils/queryClient";
import { api } from "../../services/api";
import { PostItem } from "../PostItem/PostItem";

/**
 * Loader for the PostList component
 */
export async function loader() {
  try {
    const posts = await queryClient.ensureQueryData({
      queryKey: ["posts"],
      queryFn: () => api.getPosts(),
      staleTime: 1000 * 60 * 5,
    });
    return posts;
  } catch (error) {
    console.error("Error loading posts:", error);

    throw new Error("Failed to load posts");
  }
}

/**
 * PostList component
 */
export const PostList = (): JSX.Element => {
  const posts = useLoaderData() satisfies Awaited<ReturnType<typeof loader>>;
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  if (!posts) {
    return <div>Loading...</div>;
  }

  if (posts instanceof Error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className={styles.postList}>
      <h2 className={styles.postList__title}>Posts</h2>
      <div className={styles.postList__container}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} onClick={() => handlePostClick(post.id)} />
        ))}
      </div>
    </div>
  );
};
