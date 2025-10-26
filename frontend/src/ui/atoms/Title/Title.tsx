import React from "react";
import styles from "./Title.module.scss";
import clsx from "clsx";

type TitleSize = "sm" | "md" | "lg" | "xl";
type TitleWeight = "regular" | "bold";
type TitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps {
  tag?: TitleTag;
  size?: TitleSize;
  weight?: TitleWeight;
  className?: string;
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({
  tag: Tag = "h2",
  size = "md",
  weight = "bold",
  className,
  children,
}) => {
  const titleClass = clsx(
    styles.title,
    styles[`title--${size}`],
    styles[`title--${weight}`],
    className
  );

  return <Tag className={titleClass}>{children}</Tag>;
};

export default Title;
