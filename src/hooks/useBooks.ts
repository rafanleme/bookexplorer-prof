import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { Book } from "../types/Book";

export function useBooks() {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await api.get<Book[]>("/books");
      return data;
    },
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
}
