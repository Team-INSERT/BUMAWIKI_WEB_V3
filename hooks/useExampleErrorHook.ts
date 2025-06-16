import { useEffect, useState } from "react";

export const useExampleErrorHook = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState((prev) => !prev);
  }, [state]);

  return null;
};
