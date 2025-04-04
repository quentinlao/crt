import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services/postService";
import { PostType } from "../types/postType";

export const usePost = (id: number) => {
  return useQuery<PostType, Error>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
};
