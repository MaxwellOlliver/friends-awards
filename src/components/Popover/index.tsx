import { useRef, useState } from "react";
import {
  FloatingElement,
  FloatingElementProps,
} from "../_internal/FloatingElement";

interface PopoverProps {
  content:
    | React.ReactNode
    | ((props: { isOpen: boolean; onToggle: () => void }) => React.ReactNode);
  children:
    | React.ReactNode
    | ((props: { isOpen: boolean; onToggle: () => void }) => React.ReactNode);
  position?: FloatingElementProps["position"];
  triggerOn?: "click" | "hover";
  closable?: boolean;
}

export const Popover = ({
  children: Children,
  position,
  triggerOn = "click",
  content,
  closable = true,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<number | null>(null);

  const toggleDropdown = () => {
    if (!closable && isOpen) {
      return;
    }

    setIsOpen((s) => !s);
  };

  const handleMouseInContainer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, 300);
  };

  const handleMouseIsOutContainer = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const childrenIsFunction = typeof Children === "function";

  return (
    <>
      <div
        onClick={() =>
          triggerOn === "click" && !childrenIsFunction && toggleDropdown()
        }
        className="w-fit"
        ref={triggerRef}
        onMouseEnter={() => triggerOn === "hover" && handleMouseInContainer()}
        onMouseLeave={() =>
          triggerOn === "hover" && handleMouseIsOutContainer()
        }
      >
        {childrenIsFunction ? (
          <Children isOpen={isOpen} onToggle={toggleDropdown} />
        ) : (
          Children
        )}
      </div>
      <FloatingElement
        isOpen={isOpen}
        onClose={() => closable && setIsOpen(false)}
        attachToRef={triggerRef}
        position={position}
      >
        <div
          className="popover min-w-44"
          onMouseEnter={() => triggerOn === "hover" && handleMouseInContainer()}
          onMouseLeave={() =>
            triggerOn === "hover" && handleMouseIsOutContainer()
          }
        >
          {typeof content === "function"
            ? content({ isOpen, onToggle: toggleDropdown })
            : content}
        </div>
      </FloatingElement>
    </>
  );
};
