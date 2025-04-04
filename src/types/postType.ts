/**
 * Represents a blog post in the system
 */
export type PostType = {
  /** Unique identifier for the post */
  id: number;
  /** Title of the post */
  title: string;
  /** Content of the post */
  body: string;
  /** ID of the user who created the post */
  userId: number;
};
