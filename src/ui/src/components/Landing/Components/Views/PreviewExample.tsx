import { useRef, useState } from "react";

export default function ScreenCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: { width: 1280, height: 720, frameRate: 30 },
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
          background: "linear-gradient(90deg, #4f8cff 0%, #3358ff 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(79,140,255,0.15)",
          cursor: "pointer",
          transition: "transform 0.1s, box-shadow 0.2s",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
