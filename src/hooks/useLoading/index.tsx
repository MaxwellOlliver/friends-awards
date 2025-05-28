import { useState } from "react";

export const useLoading = <T extends Record<string, boolean>>(
  initialLoading: T
) => {
  const [loading, setLoading] = useState(initialLoading);

  const setLoadingState = (key: keyof T, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  return {
    loading,
    setLoadingState,
  };
};
