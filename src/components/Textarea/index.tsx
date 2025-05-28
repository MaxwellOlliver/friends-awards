import { forwardRef, useId } from "react";
import { FormField } from "../Form/form-field";
import { cn } from "@/utils/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Textarea: React.FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function Textarea(
  { label, error, className, required, ...props }: TextareaProps,
  ref
) {
  const hookId = useId();
  const id = props.id ?? hookId;

  return (
    <FormField
      id={id}
      label={label}
      error={error}
      className={className}
      required={required}
    >
      <textarea
        ref={ref}
        className={cn(
          [
            "flex",
            "items-center",
            "w-full",
            "text-sm",
            "px-4",
            "py-4",
            "resize-none",
            "min-h-24",
            "dark:bg-[#ffffff13]",
            "ring-primary",
            "focus-within:ring-2",
            "transition-all",
            "duration-200",
            "rounded-md",
            "focus:ring-2",
            "outline-none",
            "focus:ring-primary",
            "focus:hover:border-primary",
            "placeholder:text-gray-500",
          ].join(" "),
          error &&
            !props.disabled &&
            "border-error hover:border-error focus:ring-error focus:border-error focus:hover:border-error",
          props.disabled && "pointer-events-none bg-gray-100"
        )}
        {...props}
      />
    </FormField>
  );
});
