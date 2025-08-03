import { useEffect } from "react";
import { ItemOption } from "../../../../ui/item";
import { useViews } from "../hooks/useViews";

export default function PreviewScreens() {
  const { stats, unsubscribe } = useViews();

  useEffect(() => {
    console.log(stats);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <ItemOption label="Unsubscribe" onClick={unsubscribe} />

      <div className="text-white text-xs">
        {stats ? (
          <>
            <div>Received {stats.promise.length} items</div>
            <div className="mt-2 font-semibold">Screens:</div>
            {stats.promise
              .filter((item) => item.type === "screen")
              .map((screen, idx) => (
                <div key={`screen-${idx}`}>
                  • {screen.title ?? `Screen ${idx + 1}`}
                </div>
              ))}
            <div className="mt-2 font-semibold">Windows:</div>
            {stats.promise
              .filter((item) => item.type === "window")
              .map((window, idx) => (
                <div key={`window-${idx}`}>• {window.title}</div>
              ))}
          </>
        ) : (
          <div>No screens received</div>
        )}
      </div>
    </div>
  );
}
