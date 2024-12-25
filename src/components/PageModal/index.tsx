import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";

interface PageModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  closable?: boolean;
}

const animationsConfig: KeyframeAnimationOptions = {
  duration: 200,
  easing: "ease-out",
  fill: "forwards",
};

export const PageModal = ({
  children,
  isOpen,
  onClose,
  closable = true,
}: PageModalProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function openingAnimation() {
    overlayRef.current?.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      animationsConfig
    );
    contentRef.current?.animate(
      [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
      animationsConfig
    );
  }

  function closeAnimation() {
    overlayRef.current?.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      animationsConfig
    );
    contentRef.current
      ?.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
        animationsConfig
      )
      .addEventListener("finish", () => {
        setInternalIsOpen(false);
      });
  }

  useEffect(() => {
    if (isOpen) {
      openingAnimation();
      setInternalIsOpen(true);
    } else {
      closeAnimation();
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-center items-center pt-16",
        {
          "pointer-events-none hidden": !internalIsOpen,
        }
      )}
    >
      <div
        role="overlay"
        className="h-dvh bg-black bg-opacity-20 absolute inset-0 z-0 opacity-0 animate-fade-in"
        style={{
          animationFillMode: "forwards",
        }}
        onClick={closable ? onClose : undefined}
        ref={overlayRef}
      >
        <header className="absolute inset-0 h-16 flex items-center justify-end px-4">
          {closable && (
            <Button color="primary" variant="ghost" onClick={onClose} size="sm">
              <X className="size-4 text-white" onClick={onClose} />
            </Button>
          )}
        </header>
      </div>
      <div
        className="w-full z-10 bg-background-light h-[calc(100dvh-4rem)] overflow-y-auto flex justify-center"
        ref={contentRef}
      >
        <div className="px-8 py-12">{internalIsOpen && children}</div>
      </div>
    </div>
  );
};
