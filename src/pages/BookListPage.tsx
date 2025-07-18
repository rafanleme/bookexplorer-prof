import Header from "../components/Header";
import { BookList } from "../components/BookList";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useBooks } from "../hooks/useBooks";
import { useState } from "react";
import { AddBookDialog } from "../components/AddBookDialog";
import { useAddBook } from "../hooks/addBooks";
import { useNavigate } from "react-router-dom";

export default function BookListPage() {
  const { data: books, isLoading, isError } = useBooks();
  const addBook = useAddBook();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !books || !books.length) {
    return <Typography variant="body1">Nenhum livro encontrado.</Typography>;
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">📚 Livros</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => navigate("/liked")}>
              Ver Curtidos
            </Button>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Adicionar Livro
            </Button>
          </Stack>
        </Stack>

        <BookList books={books} />

        <AddBookDialog
          open={open}
          onClose={() => setOpen(false)}
          onSave={(data) => addBook.mutate(data)}
        />
      </Container>
    </>
  );
}
