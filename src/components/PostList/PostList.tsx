import React, { useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import styles from "./PostList.module.css";

export const PostList: React.FC = () => {
  const { posts, isLoading, error, deletePost, updatePost } = usePosts();
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const handleEdit = (post: any) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const handleSave = (id: number) => {
    updatePost({ id, post: { title: editTitle, body: editBody } });
    setEditingPost(null);
  };

  return (
    <div className={styles.postList}>
      <h2 className={styles.postList__title}>Posts</h2>
      <div className={styles.postList__container}>
        {posts?.map((post) => (
          <div key={post.id} className={styles.postList__item}>
            {editingPost === post.id ? (
              <div className={styles.postList__editForm}>
                <input
                  type='text'
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={styles.postList__input}
                />
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className={styles.postList__textarea}
                />
                <button
                  onClick={() => handleSave(post.id)}
                  className={[styles.postList__button, styles["postList__button--primary"]].join(" ")}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h3 className={styles.postList__postTitle}>{post.title}</h3>
                <p className={styles.postList__postBody}>{post.body}</p>
                <div className={styles.postList__actions}>
                  <button
                    onClick={() => handleEdit(post)}
                    className={[styles.postList__button, styles["postList__button--primary"]].join(" ")}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className={[styles.postList__button, styles["postList__button--danger"]].join(" ")}
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
