import { useEffect, useRef, useState } from "react";

interface AccordionProps {
  children: React.ReactNode;
  header: ({ isOpen }: { isOpen: boolean }) => React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const Accordion = ({
  children,
  header,
  defaultOpen,
  isOpen,
  onToggle,
}: AccordionProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(!!defaultOpen);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen === undefined) return;

    setInternalIsOpen(isOpen);
  }, [isOpen]);

  const handleSetContentHeight = () => {
    setContentHeight(contentRef.current!.scrollHeight);
  };

  useEffect(() => {
    if (!contentRef.current) return;

    handleSetContentHeight();

    const observer = new ResizeObserver(() => {
      if (!contentRef.current) return;

      handleSetContentHeight();
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [contentRef.current]);

  function toggleAccordion() {
    const newValue = !internalIsOpen;

    setInternalIsOpen(newValue);
    onToggle?.(newValue);
  }

  return (
    <div className="w-full flex flex-col">
      <div
        role="button"
        className="accordion__header select-none"
        onClick={toggleAccordion}
      >
        {header({ isOpen: internalIsOpen })}
      </div>
      <div
        className="accordion__content transition-[height] overflow-hidden"
        style={{ height: internalIsOpen ? contentHeight : 0 }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};
