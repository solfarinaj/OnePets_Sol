"use client";

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "solid";
  full?: boolean;
};

export function Button({
  children,
  variant = "default",
  full,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "op-btn",
    variant === "solid" ? "solid" : "",
    variant === "ghost" ? "ghost" : "",
    full ? "full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
