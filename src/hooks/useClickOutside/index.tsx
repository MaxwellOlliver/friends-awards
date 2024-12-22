import { useEffect } from "react";

type UseClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void,
  exceptions?: React.RefObject<HTMLElement>[]
) => void;

export const useClickOutside: UseClickOutside = (ref, handler, exceptions) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }

      if (exceptions) {
        const isException = exceptions.some((exception) =>
          exception.current?.contains(event.target as HTMLElement)
        );

        if (isException) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, exceptions]);
};
