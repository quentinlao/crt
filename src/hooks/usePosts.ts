import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Post } from "../services/api";

/**
 * Custom hook for managing blog posts
 * @returns {Object} Object containing posts data and mutation functions
 * @property {Post[]} posts - Array of blog posts
 * @property {boolean} isLoading - Loading state indicator
 * @property {Error | null} error - Error state
 * @property {Function} createPost - Function to create a new post
 * @property {Function} updatePost - Function to update an existing post
 * @property {Function} deletePost - Function to delete a post
 */
export const usePosts = () => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: api.getPosts,
  });

  const createPostMutation = useMutation({
    mutationFn: api.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => api.updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: api.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts,
    isLoading,
    error,
    createPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
  };
};
