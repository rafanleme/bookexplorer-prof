import { useLikedBooks } from "../hooks/useLikedBooks";
import { BookList } from "../components/BookList";
import Header from "../components/Header";
import {
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

export default function LikedBooksPage() {
  const { data: liked, isLoading } = useLikedBooks();

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          💖 Livros Curtidos
        </Typography>

        {liked && liked.length > 0 ? (
          <BookList books={liked} />
        ) : (
          <Typography variant="body1">Você ainda não curtiu nenhum livro.</Typography>
        )}
      </Container>
    </>
  );
}
