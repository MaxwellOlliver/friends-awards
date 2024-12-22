import { cn } from '@/lib/utils';

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
    <div className={cn('form-field flex flex-col gap-1 w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-sm font-medium text-left',
            required &&
              'after:content-["*"] after:text-error after:ml-1 after:text-sm'
          )}
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-error text-left">{error}</span>}
    </div>
  );
};
