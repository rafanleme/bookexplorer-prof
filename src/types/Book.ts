export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  isLiked?: boolean;
};

export type NewBook = Omit<Book, "id">;
