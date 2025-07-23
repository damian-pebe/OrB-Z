import { useEffect, useRef, useState, useCallback } from "react";
import type {
  screensType,
  UnsubscribeFunction,
} from "../../../../../../../../types/types";

export function useViews() {
  const unsubRef = useRef<UnsubscribeFunction>(() => {});
  const [stats, setStats] = useState<screensType | null>(null);

  useEffect(() => {
    console.log("start subscribeViewer");

    unsubRef.current = window.electron.subscribeViewer((incomingStats) => {
      console.log("RECEIVED STATS:", incomingStats);
      setStats(incomingStats);
    });

    console.log("RETURNING subscribeViewer");

    return () => {
      unsubRef.current();
    };
  }, []);

  const unsubscribe = useCallback(() => {
    unsubRef.current();
    console.log("unsub called manually");
  }, []);

  return {
    stats,
    unsubscribe,
  };
}
