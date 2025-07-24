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
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture} disabled={!stream}>
        Stop Capture
      </button>
      <video ref={videoRef} width={640} height={360} autoPlay muted />
    </div>
  );
}
