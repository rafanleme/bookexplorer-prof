import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const BookDetailPage = lazy(() => import("./pages/BookDetailPage"));
const BookListPage = lazy(() => import("./pages/BookListPage"));
const LikedBooks = lazy(() => import("./pages/BooksLikedPage"));
const Login = lazy(() => import("./pages/LoginPage"));

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <p style={{ padding: "1rem" }}>
                Carregando...
              </p>
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/books" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books" element={<BookListPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route
                path="/liked"
                element={
                  <ProtectedRoute>
                    <LikedBooks />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/books" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
