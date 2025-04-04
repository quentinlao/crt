import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useActionData,
  ActionFunctionArgs,
} from "react-router-dom";
import { api } from "../../services/api";
import { queryClient } from "../../utils/queryClient";
import styles from "./PostDetail.module.css";
import { useState, useEffect } from "react";
import { PostType } from "../../types/postType";

/**
 * Action for the PostDetail component
 * @param {ActionFunctionArgs} params The parameters for the action
 * @returns {Promise<{ ok: boolean }>} The result of the action
 */
export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const id = parseInt(params.postId as string);

  await api.updatePost(id, updates as Partial<PostType>);
  return { ok: true };
}

/**
 * Loader for the PostDetail component
 * @param {LoaderFunctionArgs} params The parameters for the loader
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const id = parseInt(params.postId as string);
  const post = await queryClient.ensureQueryData({
    queryKey: ["post", id],
    queryFn: () => api.getPost(id),
  });
  if (!post) {
    throw new Response("Not found", { status: 404 });
  }
  return post;
}

/**
 * PostDetail component
 */
export const PostDetail = (): JSX.Element => {
  const post = useLoaderData() satisfies Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as { ok: boolean } | undefined;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (actionData?.ok) {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["post", post.id] });
    }
  }, [actionData, post.id]);

  const handleDelete = async () => {
    await api.deletePost(post.id);
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
    navigate("/");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.postDetail}>
      <div className={styles.postDetail__content}>
        {isEditing ? (
          <Form method='post' className={styles.postDetail__form}>
            <div className={styles.postDetail__formGroup}>
              <label htmlFor='title' className={styles.postDetail__label}>
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                defaultValue={post.title}
                className={styles.postDetail__input}
              />
            </div>
            <div className={styles.postDetail__formGroup}>
              <label htmlFor='body' className={styles.postDetail__label}>
                Body
              </label>
              <textarea id='body' name='body' defaultValue={post.body} className={styles.postDetail__textarea} />
            </div>
            <div className={styles.postDetail__actions}>
              <button type='submit' aria-label='Save' className={styles.postDetail__button}>
                Save
              </button>
              <button type='button' aria-label='Cancel' onClick={handleCancel} className={styles.postDetail__button}>
                Cancel
              </button>
            </div>
          </Form>
        ) : (
          <>
            <h1 className={styles.postDetail__title}>{post.title}</h1>
            <p className={styles.postDetail__body}>{post.body}</p>
            <div className={styles.postDetail__actions}>
              <button
                type='button'
                aria-label='Edit'
                onClick={() => setIsEditing(true)}
                className={styles.postDetail__button}
              >
                Edit
              </button>
              <button type='button' onClick={handleDelete} className={styles.postDetail__button}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
