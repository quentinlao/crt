import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const api = {
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  },

  createPost: async (post: Omit<Post, "id">): Promise<Post> => {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await axios.put(`${API_URL}/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/posts/${id}`);
  },
};
