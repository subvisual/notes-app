import { useEffect, useRef } from "react";
import { useStore } from "../lib/store";

const DELAY = 2000;

export default function StatusBar() {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const {
    session: { status, statusMessage, setStatus },
  } = useStore();

  function clear() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => {
    clear();

    timeout.current = setTimeout(() => setStatus("idle", ""), DELAY);

    return () => clear();
  }, [status, statusMessage, setStatus]);

  if (status === "idle") {
    return null;
  }

  return (
    <div className="absolute right-8 bottom-8 rounded bg-light-3 px-4 py-2 text-dark-2 dark:bg-light-2 dark:text-dark-3    ">
      {statusMessage}
    </div>
  );
}
