import {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "./Portal";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface FloatingElementProps {
  children: React.ReactNode;
  position?: Position;
  isOpen?: boolean;
  onClose?: () => void;
  attachToRef: RefObject<HTMLElement>;
}

const FloatingElementComponent = ({
  children,
  position = "bottom-left",
  attachToRef,
  isOpen,
  onClose,
}: FloatingElementProps) => {
  const [positionStyle, setPositionStyle] = useState({});
  const contentRef = useRef<HTMLDivElement>(null);

  const closeCallback = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useClickOutside(contentRef, closeCallback, [attachToRef]);

  const getScrollOffsets = () => {
    return { scrollTop: window.scrollY, scrollLeft: window.scrollX };
  };

  const isSpaceAvailable = (
    position: FloatingElementProps["position"],
    contentRect: DOMRect,
    attachRect: DOMRect
  ) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    switch (position) {
      case "bottom-left":
        return {
          x: attachRect.left + contentRect.width <= viewportWidth,
          y: attachRect.bottom + contentRect.height <= viewportHeight,
        };
      case "bottom-right":
        return {
          y: attachRect.bottom + contentRect.height <= viewportHeight,
          x: attachRect.right - contentRect.width >= 0,
        };
      case "top-left":
        return {
          y: attachRect.top - contentRect.height >= 0,
          x: attachRect.left + contentRect.width <= viewportWidth,
        };
      case "top-right":
        return {
          y: attachRect.top - contentRect.height >= 0,
          x: attachRect.right - contentRect.width >= 0,
        };
      default:
        return true;
    }
  };

  const handleGetAttachToPosition = () => {
    if (!attachToRef.current || !contentRef.current) return;

    const { top, left, right, bottom } =
      attachToRef.current.getBoundingClientRect();
    const { height: contentHeight, width: contentWidth } =
      contentRef.current.getBoundingClientRect();

    const scrollOffsets = getScrollOffsets();

    let finalPosition = position;

    const spaceAvailable = isSpaceAvailable(
      position,
      { height: contentHeight, width: contentWidth } as DOMRect,
      { top, left, right, bottom } as DOMRect
    );

    if (
      typeof spaceAvailable !== "boolean" &&
      Object.values(spaceAvailable).some((value) => !value)
    ) {
      const [posY, posX] = position.split("-");
      switch (position) {
        case "bottom-left":
          finalPosition =
            `${spaceAvailable.y ? posY : "top"}-${spaceAvailable.x ? posX : "right"}` as Position;
          break;
        case "bottom-right":
          finalPosition =
            `${spaceAvailable.y ? posY : "top"}-${spaceAvailable.x ? posX : "left"}` as Position;
          break;
        case "top-left":
          finalPosition =
            `${spaceAvailable.y ? posY : "bottom"}-${spaceAvailable.x ? posX : "right"}` as Position;
          break;
        case "top-right":
          finalPosition =
            `${spaceAvailable.y ? posY : "bottom"}-${spaceAvailable.x ? posX : "left"}` as Position;
          break;
        default:
          break;
      }
    }

    switch (finalPosition) {
      case "top-left":
        setPositionStyle({
          top: top - contentHeight + scrollOffsets.scrollTop,
          left: left + scrollOffsets.scrollLeft,
        });
        break;
      case "top-right":
        setPositionStyle({
          top: top - contentHeight + scrollOffsets.scrollTop,
          left: right - contentWidth + scrollOffsets.scrollLeft,
        });
        break;
      case "bottom-left":
        setPositionStyle({
          top: bottom + scrollOffsets.scrollTop,
          left: left + scrollOffsets.scrollLeft,
        });
        break;
      case "bottom-right":
        setPositionStyle({
          top: bottom + scrollOffsets.scrollTop,
          left: right - contentWidth + scrollOffsets.scrollLeft,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!contentRef.current && !isOpen) return;

    handleGetAttachToPosition();
    const handleScroll = () => handleGetAttachToPosition();
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [attachToRef, position, contentRef.current, isOpen]);

  return (
    <Portal>
      <div
        className={cn(
          "absolute",
          "pointer-events-none",
          "z-50",
          "opacity-0",
          "top-0",
          "left-0",
          "py-1",
          isOpen && "pointer-events-auto opacity-100 animate-fade-in",
          !isOpen && "!top-0 !left-0"
        )}
        style={positionStyle}
        ref={contentRef}
      >
        <div className={cn("rounded-md", "shadow-sm")}>{children}</div>
      </div>
    </Portal>
  );
};

export const FloatingElement = memo(FloatingElementComponent);
