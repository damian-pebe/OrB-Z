import { useEffect, useRef, useState } from "react";
import type {
  UnsubscribeFunction,
  screensType,
} from "../../../../../types/types";
import { ItemOption } from "../ui/item";

export default function PreviewScreens() {
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

  return (
    <div className="flex flex-col gap-2">
      <ItemOption
        label="Unsubscribe"
        onClick={() => {
          unsubRef.current();
          console.log("unsub button clicked");
        }}
      />

      <div className="text-white text-xs">
        {stats?.promise.map((screen, idx) => (
          <div key={idx}>• {screen.promise}</div>
        ))}
      </div>
    </div>
  );
}
