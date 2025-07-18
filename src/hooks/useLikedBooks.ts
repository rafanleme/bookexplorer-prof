import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { Book } from "../types/Book";

export const useLikedBooks = () => {
  return useQuery<Book[]>({
    queryKey: ["likedBooks"],
    queryFn: async () => {
      const res = await api.get("/books/liked");
      return res.data;
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: number) => {
      const res = await api.post(`/books/${bookId}/like`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedBooks"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
