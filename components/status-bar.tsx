import { useEffect, useRef, useState } from "react";
import { useStore } from "../lib/store";
import CheckSVG from "../assets/circle-check.svg";
import ErrorSVG from "../assets/circle-error.svg";
import LoaderSVG from "../assets/loader.svg";

const DELAY = 2000;

export default function StatusBar() {
  const [visible, setVisible] = useState(false);
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

    if (status !== "idle") {
      setVisible(true);
    }

    timeout.current = setTimeout(() => {
      setVisible(false);
    }, DELAY);

    return () => clear();
  }, [status, statusMessage, setStatus]);

  const StatusIcon = {
    idle: null,
    loading: (
      <div className="animate-spin">
        <LoaderSVG />
      </div>
    ),
    error: <ErrorSVG />,
    ok: <CheckSVG />,
  };

  return (
    <div
      className="absolute right-8 bottom-8 flex items-center rounded bg-light-3 px-4 py-3 text-dark-2 transition-opacity dark:bg-light-2 dark:text-dark-3"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {StatusIcon[status]}
      <p className="ml-2">{statusMessage}</p>
    </div>
  );
}
