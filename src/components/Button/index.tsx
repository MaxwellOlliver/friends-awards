import React, { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

import { buttonVariants } from "./variants";
import { cn } from "@/utils/cn";
import { Loader } from "../Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
  color?: "primary" | "secondary" | "error" | "warning" | "success" | "info";
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  isLoading?: boolean;
}

export const Button = ({
  children,
  size,
  className,
  color,
  variant,
  iconLeft: IconLeft,
  iconRight: IconRight,
  isLoading,
  ...props
}: ButtonProps) => {
  const { base, icon } = buttonVariants({
    size,
    variant,
    color,
  });

  return (
    <button
      type="button"
      className={cn(base(), className)}
      data-variant={variant}
      data-color={color}
      {...props}
      disabled={isLoading || props.disabled}
    >
      <div className="flex items-center justify-between">
        {(IconLeft || isLoading) && (
          <span className="mr-2">
            {isLoading ? (
              <Loader className="size-4" />
            ) : (
              IconLeft && <IconLeft className={icon()} />
            )}
          </span>
        )}
        <div>{children}</div>
        {IconRight && (
          <span className="ml-1">
            <IconRight className={icon()} />
          </span>
        )}
      </div>
    </button>
  );
};
Button.displayName = "Button";
