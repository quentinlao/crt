import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Post } from "../services/api";

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
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) =>
      api.updatePost(id, post),
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
