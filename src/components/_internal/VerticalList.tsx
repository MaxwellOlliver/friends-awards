import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";

interface VerticalListProps {
  children: React.ReactNode;
  thinScrollbar?: boolean;
}

export const VerticalList = ({
  children,
  thinScrollbar,
}: VerticalListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        containerRef.current!.scrollLeft += event.deltaY;
      }
    };

    containerRef.current?.addEventListener("wheel", handleWheel);

    return () => {
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex overflow-x-auto",
        thinScrollbar && "thin-scrollbar",
        "w-full"
      )}
      ref={containerRef}
    >
      {children}
    </div>
  );
};
