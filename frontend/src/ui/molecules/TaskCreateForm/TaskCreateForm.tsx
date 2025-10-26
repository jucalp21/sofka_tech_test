import React, { useState } from "react";
import styles from "./TaskCreateForm.module.scss";
import Title from "../../atoms/Title/Title";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";

interface TaskCreateFormProps {
  onCreate: (title: string, description?: string) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    onCreate(title.trim(), description.trim() || undefined);
    setTitle("");
    setDescription("");
    setError(undefined);
  };

  return (
    <form className={styles["task-form"]} onSubmit={handleSubmit}>
      <header className={styles["task-form__header"]}>
        <Title tag="h3" size="md">
          Nueva tarea
        </Title>
      </header>

      <Input
        label="Título"
        placeholder="Ej. Ir al mercado"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
      />

      <Input
        label="Descripción"
        placeholder="Opcional..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className={styles["task-form__actions"]}>
        <Button type="submit" variant="primary">
          Crear
        </Button>
      </div>
    </form>
  );
};

export default TaskCreateForm;
