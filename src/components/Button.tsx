import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};
