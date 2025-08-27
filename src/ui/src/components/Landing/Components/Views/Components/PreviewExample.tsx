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
    stopCapture();
    await new Promise((res) => setTimeout(res, 200));

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

      const videoTracks = mediaStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].onended = () => {
          console.warn("Stream ended unexpectedly. Stopping.");
          stopCapture();
        };
      }

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
    console.log(
      "stopCapture called - current stream:",
      !!stream,
      "current recording:",
      recordingSourceId
    );

    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        console.log("Stopping track:", track.kind, track.readyState);
        track.stop();
      });
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }

    setStream(null);
    setRecordingSourceId(null);
    console.log("stopCapture completed");
  };

  useEffect(() => {
    console.log(
      "Effect triggered - visibleSource:",
      visibleSource?.id,
      "recordingSourceId:",
      recordingSourceId
    );

    if (visibleSource?.id && visibleSource.id !== recordingSourceId) {
      console.log(`Starting capture for visible source: ${visibleSource.id}`);
      startCapture(visibleSource.id);
    }

    if (!visibleSource && recordingSourceId) {
      console.log("No visible source, stopping capture");
      stopCapture();
    }
  }, [visibleSource?.id, recordingSourceId]);

  useEffect(() => {
    console.log(
      "Sources changed, checking if recording source still exists..."
    );
    const stillExists = sources.some((s) => s.id === recordingSourceId);
    if (recordingSourceId && !stillExists) {
      console.warn("Recording source was removed. Stopping capture...");
      stopCapture();
    }
  }, [sources, recordingSourceId]);

  useEffect(() => {
    console.log("Checking visibility for current recording source...");
    if (recordingSourceId) {
      const currentSource = sources.find((s) => s.id === recordingSourceId);
      console.log(`Current source:`, currentSource);
      if (currentSource && currentSource.visible === false) {
        console.log(
          `Source ${recordingSourceId} visibility set to false, stopping capture`
        );
        stopCapture();
      }
    }
  }, [sources, recordingSourceId]);

  useEffect(() => {
    return () => {
      stopCapture();
    };
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
      <video ref={videoRef} className="h-full object-contain" autoPlay />
    </div>
  );
}
