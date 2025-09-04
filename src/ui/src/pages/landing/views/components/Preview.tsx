import { useEffect, useRef, useState } from "react";
import { useScreenStore } from "../../../../stores/useScreenStore";
import { Video } from "lucide-react";

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
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
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
      stopCapture();
    }
  }, [sources, recordingSourceId]);

  useEffect(() => {
    if (recordingSourceId) {
      const currentSource = sources.find((s) => s.id === recordingSourceId);
      if (currentSource && currentSource.visible === false) {
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
      {visibleSource ? (
        <video ref={videoRef} className="h-full object-contain" autoPlay />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white/50 space-y-4">
          <div className="w-32 h-32 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
            <Video size={64} />
          </div>
          <p className="text-sm text-center font-light">No screen selected</p>
          <p className="text-xs text-center text-white/30 max-w-xs">
            Select a screen or window from the left panel to start capturing
          </p>
        </div>
      )}
    </div>
  );
}
