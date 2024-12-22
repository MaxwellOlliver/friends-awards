import { cn } from "@/utils/cn";

interface FormFieldProps {
  id?: string;
  label?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField = ({
  label,
  error,
  id,
  children,
  className,
  required,
}: FormFieldProps) => {
  return (
    <div className={cn("form-field flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-left",
            required &&
              'after:content-["*"] after:text-error after:ml-1 after:text-sm'
          )}
        >
          {label}
        </label>
      )}
      {children}
      {error && <em className="text-sm text-error text-left">{error}</em>}
    </div>
  );
};
