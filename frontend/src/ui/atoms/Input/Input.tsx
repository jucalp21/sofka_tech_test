import React, { useId } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  fullWidth = true,
  className,
  id,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id ?? `in-${autoId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const rootClass = clsx(
    styles.input,
    error && styles["input--error"],
    fullWidth && "w-100",
    className
  );

  return (
    <div className={rootClass}>
      {label && (
        <label htmlFor={inputId} className={styles["input-label"]}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={styles.input__control}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...rest}
      />

      {hint && !error && (
        <small id={hintId} className={styles["input-hint"]}>
          {hint}
        </small>
      )}

      {error && (
        <small
          id={errorId}
          className={clsx(styles["input-hint"], styles["input-hint--error"])}
        >
          {error}
        </small>
      )}
    </div>
  );
};

export default Input;
