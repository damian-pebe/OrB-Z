import { useEffect, useRef } from "react";
import type { UnsubscribeFunction } from "../../../../../types/types";

export default function PreviewScreens() {
  const unsubRef = useRef<UnsubscribeFunction>(() => {});

  useEffect(() => {
    console.log("start subscribeViewer");

    unsubRef.current = window.electron.subscribeViewer((stats) => {
      console.log("RECEIVED STATS:", stats);
    });

    console.log("RETURNING subscribeViewer");

    return () => {
      unsubRef.current();
    };
  }, []);

  return (
    <div className="text-white flex flex-col gap-2">
      preview
      <button
        onClick={() => {
          unsubRef.current();
          console.log("unsub button clicked");
        }}
        className="outline"
      >
        unsub
      </button>
    </div>
  );
}
