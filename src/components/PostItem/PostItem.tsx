import { PostType } from "../../types/postType";
import styles from "./PostItem.module.css";

/**
 * Type for the PostItem component
 */
type PostItemProps = {
  post: PostType;
  onClick: () => void;
};

/**
 * PostItem component
 * @param {PostItemProps} props The props for the PostItem component
 */
export const PostItem = ({ post, onClick }: PostItemProps): JSX.Element => {
  return (
    <div className={styles.postItem} onClick={onClick} role='button' tabIndex={0} aria-label={post.title}>
      <h3 className={styles.postItem__title}>{post.title}</h3>
      <p className={styles.postItem__body}>{post.body}</p>
    </div>
  );
};
