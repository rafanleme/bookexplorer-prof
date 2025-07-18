import { Stack } from "@mui/material";
import { BookItem } from "./BookItem";
import type { Book } from "../types/Book";

type Props = {
  books: Book[];
};

export function BookList({ books }: Props) {
  return (
    <Stack spacing={2}>
      {books.map((book) => (
        <BookItem
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          image={book.image}
          isLiked={book.isLiked}
        />
      ))}
    </Stack>
  );
}
