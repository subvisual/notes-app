import { useEffect, useRef, useState } from "react";
import { useStore } from "../lib/store";
import CheckSVG from "../assets/circle-check.svg";
import ErrorSVG from "../assets/circle-error.svg";
import LoaderSVG from "../assets/loader.svg";

const DELAY = 2000;

export default function StatusBar() {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const {
    session: { status, statusMessage, setStatus },
  } = useStore();

  const [tempStatus, setTempStatus] = useState<typeof status>("idle");
  const [tempStatusMessage, setTempStatusMessage] =
    useState<typeof statusMessage>("");

  function clear() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => {
    clear();

    if (status !== "idle") {
      setTempStatus(status);
      setTempStatusMessage(statusMessage);
    }

    timeout.current = setTimeout(() => {
      setStatus("idle", "");
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
      style={{ opacity: status === "idle" ? 0 : 1 }}
    >
      {StatusIcon[tempStatus]}
      <p className="ml-2">{tempStatusMessage}</p>
    </div>
  );
}
