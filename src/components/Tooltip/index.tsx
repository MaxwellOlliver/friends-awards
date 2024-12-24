import { useCallback, useEffect, useRef, useState } from "react";
import { tooltipVariants } from "./variants";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [internalPosition, setInternalPosition] = useState(position);

  const getCalculatedPosition = useCallback(
    function getCalculatedPosition() {
      const tooltip = tooltipRef.current;
      const content = contentRef.current;

      if (!tooltip || !content) return;

      const tooltipRect = tooltip.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const heightWithPadding = tooltipRect.height + 16;

      if (position === "top" && contentRect.top - heightWithPadding < 0) {
        setInternalPosition("bottom");
        return;
      }

      if (
        position === "bottom" &&
        contentRect.bottom + heightWithPadding > window.innerHeight
      ) {
        setInternalPosition("top");
        return;
      }

      if (position === "left" && contentRect.left - heightWithPadding < 0) {
        setInternalPosition("right");
        return;
      }

      if (
        position === "right" &&
        contentRect.right + heightWithPadding > window.innerWidth
      ) {
        setInternalPosition("left");
        return;
      }

      setInternalPosition(position);
    },
    [position]
  );

  useEffect(() => {
    if (!contentRef.current) return;

    getCalculatedPosition();

    window.addEventListener("resize", getCalculatedPosition);

    return () => {
      window.removeEventListener("resize", getCalculatedPosition);
    };
  }, [getCalculatedPosition, position]);

  return (
    <div className="tooltip relative group max-w-fit">
      <div className="min-w-0 max-w-fit" ref={contentRef}>
        {children}
      </div>
      <span
        className={tooltipVariants({ position: internalPosition })}
        data-position={internalPosition}
      >
        <span className="p-2 break-words w-full" ref={tooltipRef}>
          {text}
        </span>
        <span
          className="tooltip-arrow absolute w-2 h-2 bg-neutral-700 rounded-sm"
          style={{
            transform:
              position === "top"
                ? "translate(-50%, 0%) rotate(45deg) "
                : position === "bottom"
                  ? "rotate(45deg) translate(-50%, 0%) rotate(45deg) "
                  : position === "left"
                    ? "translate(0%, -50%) rotate(45deg) "
                    : "translate(0%, -50%) rotate(45deg)",
          }}
        />
      </span>
    </div>
  );
};
