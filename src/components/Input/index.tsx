import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { forwardRef, useEffect, useId, useState } from "react";
import { Loader } from "../Loader";
import { cn } from "@/utils/cn";
import { FormField } from "../Form/form-field";
import { inputVariants } from "./variants";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "ref"> {
  label?: string;
  error?: string;
  containerClassName?: string;
  datalistData?: string[];
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  isLoading?: boolean;
  iconClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    datalistData,
    iconLeft: IconLeft,
    iconRight: IconRight,
    className,
    isLoading,
    containerClassName,
    iconClassName,
    ...props
  },
  ref
) {
  const [wasError, setWasError] = useState(false);
  const { control, input } = inputVariants({
    formState: props.error
      ? "isError"
      : wasError && !props.error
        ? "isSuccess"
        : undefined,
  });

  const [type, setType] = useState(
    props.type === "number" ? "text" : (props.type ?? "text")
  );
  const initialType = props.type ?? "text";

  const hookId = useId();

  const id = props.id ?? hookId;

  const handleTogglePassword = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  useEffect(() => {
    if (props.error) {
      setWasError(true);
    }
  }, [props.error]);

  return (
    <FormField label={props.label} error={props.error} id={id}>
      <div className={cn(control(), containerClassName)}>
        {IconLeft && (
          <div
            className={cn("flex items-center text-primary-500", iconClassName)}
          >
            <IconLeft className="size-4 mr-2" />
          </div>
        )}
        <div className="flex items-center relative w-full">
          <input
            ref={ref}
            {...props}
            className={cn(input(), className)}
            id={id}
            list={props.list ?? `${id}-list`}
            type={type}
            onBlur={(e) => {
              if (!props.error) {
                setWasError(false);
              }

              if (props.onBlur) {
                props.onBlur(e);
              }
            }}
          />
          {type === "password" && (
            <EyeOff
              className="absolute right-0 size-4 cursor-pointer"
              onClick={handleTogglePassword}
            />
          )}
          {type === "text" && initialType === "password" && (
            <Eye
              className="absolute right-0 size-4 cursor-pointer"
              onClick={handleTogglePassword}
            />
          )}
        </div>
        {IconRight && !isLoading && (
          <div
            className={cn("flex items-center text-primary-500", iconClassName)}
          >
            <IconRight className="size-4 ml-2" />
          </div>
        )}
        {isLoading && (
          <div
            className={cn("flex items-center text-primary-500", iconClassName)}
          >
            <Loader className="w-6 ml-2" />
          </div>
        )}
        {datalistData && (
          <datalist id={props.list ?? `${id}-list`} className="ml-2">
            {datalistData?.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        )}
      </div>
    </FormField>
  );
});
