import { useRef, useState } from "react";
import { useScreenStore } from "../../../../stores";

export default function ScreenCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const sources = useScreenStore((state) => state.screenSources);
  const sourceId = sources[0]?.id;

  const startCapture = async () => {
    try {
      const testSourceId = sourceId;

      const mediaStream = await (navigator.mediaDevices as any).getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: testSourceId,
            maxWidth: 1920,
            maxHeight: 1080,
            maxFrameRate: 240,
          },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      setStream(mediaStream);
    } catch (err) {
      console.error("Error during screen capture:", err);
    }
  };

  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  return (
    <div>
      <button
        onClick={startCapture}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(79,140,255,0.15)",
          transition: "transform 0.1s, box-shadow 0.2s",
          cursor: !sourceId ? "not-allowed" : "pointer",
          opacity: !sourceId ? 0.6 : 1,
          background: !sourceId
            ? "linear-gradient(90deg, #ccc 0%, #aaa 100%)"
            : "linear-gradient(90deg, #4f8cff 0%, #3358ff 100%)",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        disabled={!sourceId}
      >
        Start Capture
      </button>
      <button
        onClick={stopCapture}
        disabled={!stream}
        style={{
          padding: "10px 20px",
          background: !stream
            ? "linear-gradient(90deg, #ccc 0%, #aaa 100%)"
            : "linear-gradient(90deg, #ff4f4f 0%, #ff3358 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          boxShadow: !stream
            ? "0 2px 8px rgba(200,200,200,0.15)"
            : "0 2px 8px rgba(255,79,79,0.15)",
          cursor: !stream ? "not-allowed" : "pointer",
          opacity: !stream ? 0.6 : 1,
          transition: "transform 0.1s, box-shadow 0.2s, opacity 0.2s",
        }}
        onMouseDown={(e) => {
          if (stream) e.currentTarget.style.transform = "scale(0.96)";
        }}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Stop Capture
      </button>
      <video ref={videoRef} width={640} height={360} autoPlay muted />
    </div>
  );
}
