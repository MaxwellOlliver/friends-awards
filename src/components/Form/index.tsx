import { HTMLAttributes, ReactNode } from "react";

export const Form = ({
  children,
  ...props
}: HTMLAttributes<HTMLFormElement> & { children: ReactNode }) => {
  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onSubmit?.(e);
      }}
    >
      {children}
    </form>
  );
};
