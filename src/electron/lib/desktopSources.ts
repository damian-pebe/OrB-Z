import { desktopCapturer } from "electron";
import { type DesktopSource } from "../preload.cjs";

export async function fetchDesktopSources(): Promise<DesktopSource[]> {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
    fetchWindowIcons: true,
    thumbnailSize: { width: 300, height: 200 },
  });

  return sources.map((s) => ({
    id: s.id,
    name: s.name,
    type: s.id.startsWith("window:") ? "window" : "screen",
    thumbnail: s.thumbnail.toDataURL(),
  }));
}
