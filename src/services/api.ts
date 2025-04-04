import { PostType } from "../types/postType";

const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * API service for managing blog posts
 * @namespace api
 */
export const api = {
  /**
   * Fetches all posts from the API
   * @returns {Promise<PostType[]>} A promise that resolves to an array of posts
   */
  getPosts: async (): Promise<PostType[]> => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Fetches a single post by ID
   * @param {number} id - The ID of the post to fetch
   * @returns {Promise<PostType>} A promise that resolves to the requested post
   */
  getPost: async (id: number): Promise<PostType> => {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Creates a new post
   * @param {Omit<PostType, "id">} post - The post data to create (excluding ID)
   * @returns {Promise<PostType>} A promise that resolves to the created post
   */
  createPost: async (post: Omit<PostType, "id">): Promise<PostType> => {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Updates an existing post
   * @param {number} id - The ID of the post to update
   * @param {Partial<PostType>} post - The post data to update
   * @returns {Promise<PostType>} A promise that resolves to the updated post
   */
  updatePost: async (id: number, post: Partial<PostType>): Promise<PostType> => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Deletes a post
   * @param {number} id - The ID of the post to delete
   * @returns {Promise<void>} A promise that resolves when the post is deleted
   */
  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.statusText}`);
    }
  },
};
