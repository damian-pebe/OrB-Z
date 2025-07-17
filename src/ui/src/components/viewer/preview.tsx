import { useEffect, useRef } from "react";
import type { UnsubscribeFunction } from "../../../../../types/types";
import { ItemOption } from "../ui/item";

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
    <ItemOption
      label="Unsubscribe"
      onClick={() => {
        unsubRef.current();
        console.log("unsub button clicked");
      }}
    />
  );
}
