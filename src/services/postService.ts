import axios from "axios";
import { PostType } from "../types/postType";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async (): Promise<PostType[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPost = async (id: number): Promise<PostType> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updatePost = async ({ id, post }: { id: number; post: Partial<PostType> }): Promise<PostType> => {
  const response = await axios.put(`${API_URL}/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
