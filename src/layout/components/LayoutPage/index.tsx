import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export const LayoutPage = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-[1000px] w-full flex flex-col p-8", className)}>
      {children}
    </div>
  );
};
