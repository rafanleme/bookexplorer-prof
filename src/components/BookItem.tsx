import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToggleLike } from "../hooks/useLikedBooks";

type Props = {
  id: number;
  title: string;
  author: string;
  image: string;
  isLiked?: boolean;
};

export function BookItem({ id, title, author, image, isLiked }: Props) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toggleLike = useToggleLike();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      toggleLike.mutate(id);
    }
  };

  return (
    <Card sx={{ display: "flex", maxWidth: 600 }}>
      <CardActionArea
        component={Link}
        to={`/books/${id}`}
        sx={{ display: "flex", alignItems: "stretch" }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ width: 100, objectFit: "cover" }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
            px: 2,
            py: 1,
          }}
        >
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {author}
            </Typography>
          </CardContent>

          <Box>
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
