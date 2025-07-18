import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import type { NewBook } from "../types/Book";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: NewBook) => void;
};

export function AddBookDialog({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<NewBook>({
    title: "",
    author: "",
    image: "",
    description: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit() {
    onSave(form);
    setForm({ title: "", author: "", image: "", description: "" });
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Livro</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Título"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            label="Descrição"
            name="description"
            fullWidth
            value={form.description}
            onChange={handleChange}
          />
          <TextField
            label="Autor"
            name="author"
            fullWidth
            value={form.author}
            onChange={handleChange}
          />
          <TextField
            label="URL da imagem"
            name="image"
            fullWidth
            value={form.image}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
