import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Book, NewBook } from '../types/Book';
import { api } from '../api/axios';

export function useAddBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook: NewBook): Promise<Book> => {
      const { data } = await api.post<Book>('/books', newBook);
      return data; // axios coloca o payload no campo `data`
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}
