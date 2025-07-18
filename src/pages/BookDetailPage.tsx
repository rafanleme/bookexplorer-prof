import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";

export default function BookDetailPage() {
  const { id } = useParams();
  
  const { data: books } = useBooks();

  const book = books?.find((b) => b.id === Number(id));

  if (!book) {
    return <Typography variant="h6">Livro não encontrado.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardMedia
          component="img"
          height="300"
          image={book.image}
          alt={book.title}
          sx={{ objectFit: "cover", objectPosition: "top" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {book.author}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {book.description}
          </Typography>
          <Button
            variant="outlined"
            component={Link}
            to="/books"
            sx={{ mt: 3 }}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
