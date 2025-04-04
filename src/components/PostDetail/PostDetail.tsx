import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import styles from "./PostDetail.module.css";

export const PostDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = usePost(Number(id));

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;
  if (!post) return <div className={styles.error}>Post not found</div>;

  return (
    <div className={styles.postDetail}>
      <h1 className={styles.postDetail__title}>{post.title}</h1>
      <p className={styles.postDetail__body}>{post.body}</p>
    </div>
  );
};
