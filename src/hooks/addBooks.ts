import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Book, NewBook } from '../types/Book';

export function useAddBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook: NewBook): Promise<Book> => {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) throw new Error('Erro ao adicionar livro');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}
