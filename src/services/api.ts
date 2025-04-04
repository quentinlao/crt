import axios from "axios";
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
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  /**
   * Fetches a single post by ID
   * @param {number} id - The ID of the post to fetch
   * @returns {Promise<Post>} A promise that resolves to the requested post
   */
  getPost: async (id: number): Promise<PostType> => {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  },

  /**
   * Creates a new post
   * @param {Omit<Post, "id">} post - The post data to create (excluding ID)
   * @returns {Promise<Post>} A promise that resolves to the created post
   */
  createPost: async (post: Omit<PostType, "id">): Promise<PostType> => {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  },

  /**
   * Updates an existing post
   * @param {number} id - The ID of the post to update
   * @param {Partial<Post>} post - The post data to update
   * @returns {Promise<Post>} A promise that resolves to the updated post
   */
  updatePost: async (id: number, post: Partial<PostType>): Promise<PostType> => {
    const response = await axios.put(`${API_URL}/posts/${id}`, post);
    return response.data;
  },

  /**
   * Deletes a post
   * @param {number} id - The ID of the post to delete
   * @returns {Promise<void>} A promise that resolves when the post is deleted
   */
  deletePost: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/posts/${id}`);
  },
};
