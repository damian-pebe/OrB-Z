import { useEffect, useRef, useState } from "react";
import { useScreenStore } from "../../../../../stores";

export default function ScreenCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingSourceId, setRecordingSourceId] = useState<string | null>(
    null
  );
  const sources = useScreenStore((state) => state.screenSources);
  const visibleSource = sources.find((s) => s.visible);

  const startCapture = async (sourceId: string) => {
    try {
      const mediaStream = await (navigator.mediaDevices as any).getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: sourceId,
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
      setRecordingSourceId(sourceId);
    } catch (err) {
      console.error("Error during screen capture:", err);
    }
  };

  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setStream(null);
      setRecordingSourceId(null);
    }
  };

  useEffect(() => {
    if (visibleSource?.id && visibleSource.id !== recordingSourceId) {
      startCapture(visibleSource.id);
    }

    if (!visibleSource && recordingSourceId) {
      stopCapture();
    }
  }, [visibleSource?.id, recordingSourceId]);

  useEffect(() => {
    const stillExists = sources.some((s) => s.id === recordingSourceId);
    if (recordingSourceId && !stillExists) {
      console.warn("Recording source was removed. Stopping capture...");
      stopCapture();
    }
  }, [sources, recordingSourceId]);

  return (
    <div>
      <video ref={videoRef} width={640} height={360} autoPlay />
    </div>
  );
}
