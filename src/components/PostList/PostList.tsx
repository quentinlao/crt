import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import styles from "./PostList.module.css";
import { PostType } from "../../types/postType";

/**
 * Displays a list of blog posts with edit and delete functionality
 * @function PostList
 * @returns {JSX.Element} Rendered post list component
 */
export const PostList = (): JSX.Element => {
  const { posts, isLoading, error, deletePost, updatePost } = usePosts();
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  /**
   * Handles entering edit mode for a post
   * @param {PostType} post - The post to edit
   */
  const handleEdit = (post: PostType) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);

    // Focus the title input when editing starts
    setTimeout(() => {
      const titleInput = document.getElementById(`edit-title-${post.id}`) as HTMLInputElement;
      titleInput?.focus();
    }, 0);
  };

  /**
   * Handles saving an edited post
   * @param {number} id - The ID of the post to save
   */
  const handleSave = (id: number) => {
    updatePost({ id, post: { title: editTitle, body: editBody } });
    setEditingPost(null);
  };

  return (
    <div className={styles.postList}>
      <h2 className={styles.postList__title}>Posts</h2>
      <div className={styles.postList__container}>
        {posts?.map((post) => (
          <div key={post.id} className={styles.postList__item} role='listitem'>
            {editingPost === post.id ? (
              <div className={styles.postList__editForm}>
                <label htmlFor={`edit-title-${post.id}`} className='sr-only'>
                  Title
                </label>
                <input
                  id={`edit-title-${post.id}`}
                  type='text'
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={styles.postList__input}
                  aria-describedby={`edit-body-${post.id}`}
                />
                <label htmlFor={`edit-body-${post.id}`} className='sr-only'>
                  Body
                </label>
                <textarea
                  id={`edit-body-${post.id}`}
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className={styles.postList__textarea}
                />
                <button
                  onClick={() => handleSave(post.id)}
                  className={[styles.postList__button, styles["postList__button--primary"]].join(" ")}
                  aria-label={`Save post titled "${post.title}"`}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <Link to={`/posts/${post.id}`} className={styles.postList__link}>
                  <h3 className={styles.postList__postTitle}>{post.title}</h3>
                </Link>
                <p className={styles.postList__postBody}>{post.body}</p>
                <div className={styles.postList__actions}>
                  <button
                    onClick={() => handleEdit(post)}
                    className={[styles.postList__button, styles["postList__button--primary"]].join(" ")}
                    aria-label={`Edit post titled "${post.title}"`}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deletePost(post.id)}
                    className={[styles.postList__button, styles["postList__button--danger"]].join(" ")}
                    aria-label={`Delete post titled "${post.title}"`}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
