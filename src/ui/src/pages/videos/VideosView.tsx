import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import GlassContainer from "../../components/GlassContainer";
import TitleWrapper from "../../components/TitleWrapper";
import ButtonBorders from "../landing/views/components/ButtonBorders";
import Loader from "./Loader";

const mockApiCall = (
  file: File,
  onProgress: (p: number) => void
): Promise<any> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          resolve({
            riskLevel: "High",
            details: "Detected copyrighted music in audio track.",
            fileName: file.name,
            duration: "20:00",
          });
        }, 1000);
      }
    }, 300);
  });
};

const VideosView: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showHistory, setShowHistory] = useState(false);
  const mockHistory = [
    {
      fileName: "stream1.mp4",
      reviewDate: "2025-09-04 10:15",
      result: {
        riskLevel: "High",
        details: t("video.copyright_music"),
        fileName: "stream1.mp4",
        duration: "15:00",
      },
    },
    {
      fileName: "gameplay.mov",
      reviewDate: "2025-09-03 18:40",
      result: {
        riskLevel: "Low",
        details: t("video.history_no_issues"),
        fileName: "gameplay.mov",
        duration: "45:00",
      },
    },
    {
      fileName: "tutorial.mkv",
      reviewDate: "2025-09-02 21:05",
      result: {
        riskLevel: "Medium",
        details: t("video.possible_copyright_image"),
        fileName: "tutorial.mkv",
        duration: "30:00",
      },
    },
  ];
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const allowedExtensions = ["mp4", "mov", "avi", "mkv"];
  const getExtension = (filename: string) => {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop()?.toLowerCase() : "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = getExtension(file.name);
      if (!allowedExtensions.includes(ext || "")) {
        setErrorMsg(t("video.error_invalid_file"));
        setSelectedFile(null);
        setResult(null);
        setProgress(0);
        return;
      }
      setSelectedFile(file);
      setResult(null);
      setProgress(0);
      setErrorMsg("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const ext = getExtension(file.name);
      if (!allowedExtensions.includes(ext || "")) {
        setErrorMsg(t("video.error_invalid_file"));
        setSelectedFile(null);
        setResult(null);
        setProgress(0);
        return;
      }
      setSelectedFile(file);
      setResult(null);
      setProgress(0);
      setErrorMsg("");
    }
  };

  const getFileCacheKey = (file: File) => {
    // Usar nombre y tamaño para identificar el archivo (puedes mejorar con hash en backend real)
    return ["video-analysis", file.name, file.size];
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setProgress(0);
    setResult(null);
    setErrorMsg("");
    const cacheKey = getFileCacheKey(selectedFile);
    const cached = queryClient.getQueryData<any>(cacheKey);
    if (cached) {
      setResult(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    const res = await mockApiCall(selectedFile, setProgress);
    setResult(res);
    queryClient.setQueryData(cacheKey, res);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full">
      <GlassContainer className="w-full max-w-xl mx-auto flex flex-col gap-6 bg-white/5 shadow-lg font-nunito">
        <TitleWrapper
          label={t("video.review_title")}
          className="w-full text-center font-righteous text-3xl text-white mb-2 font-righteous"
          lineClassName="bg-white/20 h-1 w-16 mx-auto mb-4"
        >
          {!loading &&
            !result &&
            (() => {
              if (
                selectedFile &&
                Boolean(queryClient.getQueryData(getFileCacheKey(selectedFile)))
              ) {
                setResult(
                  queryClient.getQueryData(getFileCacheKey(selectedFile))
                );
                return null;
              }
              return (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 transition-all duration-300 hover:border-primary/60 mb-2 font-nunito"
                >
                  <input
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    ref={inputRef}
                    onChange={handleFileChange}
                  />
                  {!selectedFile && (
                    <>
                      <ButtonBorders
                        label={t("video.select_file")}
                        onClick={() => inputRef.current?.click()}
                        className="mb-3 w-full"
                      />
                      <div className="text-muted-foreground text-base mb-2 font-nunito">
                        {t("video.drag_here")}
                      </div>
                    </>
                  )}
                  {errorMsg && (
                    <div className="mt-2 text-red-400 font-nunito text-lg">
                      {errorMsg}
                    </div>
                  )}
                  {selectedFile && !errorMsg && !loading && !result && (
                    <div className="mt-2 text-white font-nunito text-lg flex items-center justify-center gap-2">
                      {t("video.selected")} {selectedFile.name}
                      <button
                        type="button"
                        className="ml-2 px-2 py-1 rounded-full bg-white/20 hover:bg-red-500/80 text-white text-xs font-bold transition-colors duration-200"
                        onClick={() => {
                          setSelectedFile(null);
                          if (inputRef.current) inputRef.current.value = "";
                        }}
                        aria-label={t("video.remove_file")}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          {!result && !loading && selectedFile && (
            <ButtonBorders
              label={t("video.analyze")}
              onClick={handleUpload}
              disabled={!selectedFile || loading}
              className="w-full mb-2"
            />
          )}
          {result && (
            <ButtonBorders
              label={t("video.analyze_another")}
              onClick={() => {
                setSelectedFile(null);
                setResult(null);
                setProgress(0);
                setErrorMsg("");
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="w-full mb-2"
            />
          )}
          {loading && (
            <div className="w-full flex flex-col items-center gap-2 mt-2 font-nunito">
              <Loader />
            </div>
          )}
          {result && (
            <div className="w-full bg-white/10 rounded-xl p-5 mt-4 flex flex-col items-center shadow-md font-nunito text-white">
              <h3 className="text-white font-bold text-xl mb-2 font-righteous">
                {t("video.result_title")}
              </h3>
              <div className="text-white text-base">
                <strong>{t("video.file")}</strong> {result.fileName}
                <br />
                <strong>{t("video.duration")}</strong> {result.duration}
                <br />
                <strong>{t("video.risk_level")}</strong>{" "}
                <span
                  className={
                    result.riskLevel === "High"
                      ? "text-red-400 font-bold"
                      : result.riskLevel === "Medium"
                      ? "text-yellow-400 font-bold"
                      : "text-green-400 font-bold"
                  }
                >
                  {t(`video.history_${result.riskLevel.toLowerCase()}`)}
                </span>
                <br />
                <strong>{t("video.details")}</strong> {result.details}
              </div>
            </div>
          )}
          {}
          {!selectedFile && !loading && !result && (
            <div className="w-full flex justify-end mt-2">
              <ButtonBorders
                label={t("video.history")}
                onClick={() => setShowHistory(true)}
                className="w-32 border-white"
              />
            </div>
          )}
          {}
          {showHistory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="rounded-xl p-6 shadow-2xl w-full max-w-md font-nunito text-white relative"
                style={{
                  backgroundImage: "url(/background.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  boxShadow: "0 8px 32px 0 rgba(129, 134, 63, 0.25)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <button
                  className="absolute top-2 right-3 text-white text-xl font-bold hover:text-red-400"
                  onClick={() => setShowHistory(false)}
                  aria-label="Cerrar historial"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-righteous mb-4 text-center">
                  {t("video.history_title")}
                </h2>
                <ul className="divide-y divide-white/20">
                  {mockHistory.map((item, idx) => (
                    <li
                      key={idx}
                      className="py-3 px-2 hover:bg-white/10 rounded-lg cursor-pointer transition-all"
                      onClick={() => {
                        setResult(item.result);
                        setShowHistory(false);
                        setSelectedFile(null);
                        if (inputRef.current) inputRef.current.value = "";
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">{item.fileName}</span>
                        <span className="text-xs text-white/80">
                          {t("video.history_date")} {item.reviewDate}
                        </span>
                        <span className="text-sm">
                          <strong>{t("video.history_risk")}</strong>{" "}
                          <span
                            className={
                              item.result.riskLevel === "High"
                                ? "text-red-400 font-bold"
                                : item.result.riskLevel === "Medium"
                                ? "text-yellow-400 font-bold"
                                : "text-green-400 font-bold"
                            }
                          >
                            {t(
                              `video.history_${item.result.riskLevel.toLowerCase()}`
                            )}
                          </span>
                        </span>
                        <span className="text-xs text-white/70">
                          {item.result.details}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </TitleWrapper>
      </GlassContainer>
    </div>
  );
};

export default VideosView;
