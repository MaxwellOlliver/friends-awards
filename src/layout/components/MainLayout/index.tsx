import { ReactNode } from "react";
import { Navbar } from "../Navbar";
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
        "w-full max-h-[100dvh] h-[100dvh] grid grid-rows-[64px,1fr] gap-8",
        className
      )}
    >
      <Navbar />
      <main className="w-full flex justify-center p-8 overflow-y-auto">
        <div className="max-w-[1000px] w-full">{children}</div>
      </main>
    </div>
  );
};
