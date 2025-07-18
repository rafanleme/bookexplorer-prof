import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToggleLike } from "../hooks/useLikedBooks";

export function LikeButton({ bookId, isLiked }: { bookId: number; isLiked: boolean }) {
  const { isAuthenticated } = useAuth();
  const { mutate } = useToggleLike();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      mutate(bookId);
    }
  };

  return <button onClick={handleClick}>{isLiked ? "❤️" : "🤍"} Curtir</button>;
}
