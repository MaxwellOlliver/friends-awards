import { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const MainLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full min-h-[100dvh] flex p-8 gap-4 relative justify-center",
        className
      )}
    >
      <main className="max-w-[1200px] w-full">{children}</main>
    </div>
  );
};
