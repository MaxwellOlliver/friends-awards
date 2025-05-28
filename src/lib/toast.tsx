import { cn } from "@/utils/cn";
import { Info, LucideIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { tv } from "tailwind-variants";
import { getErrorResponse } from "../http/axios";
import { AxiosError } from "axios";

interface AddToastProps {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  icon?: LucideIcon;
}

const toastVariants = tv({
  slots: {
    container: "rounded-md max-w-screen shadow-lg p-4 flex gap-4 items-center",
    iconWrapper: "p-2 rounded-full flex items-center justify-center",
  },
  variants: {
    type: {
      success: {
        container: "bg-success",
        iconWrapper: "bg-white text-success",
      },
      error: {
        container: "bg-error",
        iconWrapper: "bg-white text-error",
      },
      warning: {
        container: "bg-warning",
        iconWrapper: "bg-white text-warning",
      },
      info: {
        container: "bg-info",
        iconWrapper: "bg-white text-info",
      },
    },
  },
});

export const addToast = ({
  message,
  title,
  icon: Icon,
  type = "success",
}: AddToastProps) => {
  const { container, iconWrapper } = toastVariants({ type });

  return toast.custom(
    (t) => (
      <div
        className={cn(
          container(),
          t.visible ? "animate-slide-enter" : "animate-slide-leave"
        )}
      >
        <div className="h-full flex items-center">
          <div className={iconWrapper()}>
            {Icon ? <Icon className="size-4" /> : <Info className="size-4" />}
          </div>
        </div>
        <div className="h-full text-sm min-w-44">
          <h2 className="text-white font-semibold">{title}</h2>
          <p className="text-white">{message}</p>
        </div>
        <div className="h-full flex items-center">
          <button
            className="text-white p-1 rounded-md hover:bg-white/30 transition-colors duration-200"
            onClick={() => toast.remove(t.id)}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
};

export const addToastWithError = ({
  error,
  title,
  icon,
  type,
}: Omit<AddToastProps, "message"> & { error: Error }) => {
  const errorMessage =
    error instanceof AxiosError
      ? getErrorResponse(error).message
      : error.message;

  return addToast({
    title,
    message: errorMessage,
    type: type ?? "error",
    icon,
  });
};
