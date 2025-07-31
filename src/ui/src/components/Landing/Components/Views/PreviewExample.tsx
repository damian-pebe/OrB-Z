import { useRef, useState, useEffect } from "react";

export default function ScreenCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCapture = async (sourceId: string) => {
    console.log("[ScreenCapture] Starting capture for source:", sourceId);
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: sourceId,
            maxWidth: 1920,
            maxHeight: 1080,
            maxFrameRate: 30,
          },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        console.log("[ScreenCapture] Video playback started");
      }

      setStream(stream);
    } catch (err) {
      console.error("[ScreenCapture] Error during screen capture:", err);
    }
  };

  const stopCapture = () => {
    if (stream) {
      console.log("[ScreenCapture] Stopping capture");
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  useEffect(() => {
    const handleSourceSelect = (e: Event) => {
      const custom = e as CustomEvent<string>;
      console.log(
        "[ScreenCapture] Received source-selected event:",
        custom.detail
      );
      startCapture(custom.detail);
    };

    window.addEventListener("source-selected", handleSourceSelect);
    return () =>
      window.removeEventListener("source-selected", handleSourceSelect);
  }, []);

  return (
    <div>
      <button onClick={stopCapture} disabled={!stream}>
        Stop Capture
      </button>
      <video ref={videoRef} width={640} height={360} autoPlay muted />
    </div>
  );
}
