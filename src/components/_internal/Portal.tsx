import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export const Portal = ({
  children,
  containerId = "root-portal",
}: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById(containerId));
  }, [containerId]);

  if (!container) return <></>;

  return createPortal(children, container);
};
