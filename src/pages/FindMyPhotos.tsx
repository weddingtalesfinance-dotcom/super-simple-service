import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Step = "scan" | "searching" | "results" | "error";

const STEPS: Step[] = ["scan", "searching", "results"];

const BASE_URL = "https://f38dc480-0bdf-4922-8f74-2d88a1b31285-00-256oyq99y1aya.pike.replit.dev/api";
const API_KEY = import.meta.env.VITE_FACESEARCH_API_KEY ?? "";

interface SearchResult {
  url?: string;
  path?: string;
  score?: number;
  similarity?: number;
  [key: string]: unknown;
}

export default function FindMyPhotos() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("scan");
  const [selfie, setSelfie] = useState<string | null>(null);
  const [selfieBlob, setSelfieBlob] = useState<Blob | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const openCamera = useCallback(async () => {
    setCameraError("");
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setCameraError("Camera access was denied. Please allow camera permissions and try again.");
      setCameraOpen(false);
    }
  }, []);

  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setSelfie(dataUrl);
    canvas.toBlob((blob) => { if (blob) setSelfieBlob(blob); }, "image/jpeg", 0.92);
  }, []);

  const searchPhotos = useCallback(async (blob: Blob) => {
    setStep("searching");
    setErrorMsg("");
    try {
      const form = new FormData();
      form.append("file", blob, "selfie.jpg");

      const res = await fetch(`${BASE_URL}/search`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server error: ${res.status}`);
      }

      const data = await res.json();
      const photos: SearchResult[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data?.matches)
        ? data.matches
        : [];

      setResults(photos);
      setStep("results");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setErrorMsg(msg.toLowerCase().includes("no face")
        ? "No face detected in your photo. Please retake your selfie."
        : "Could not connect to the search service. Please try again.");
      setStep("error");
    }
  }, []);

  const donePhoto = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
    if (selfieBlob) searchPhotos(selfieBlob);
  }, [selfieBlob, searchPhotos]);

  const retake = useCallback(() => {
    setSelfie(null);
    setSelfieBlob(null);
    openCamera();
  }, [openCamera]);

  const reset = () => {
    setStep("scan");
    setSelfie(null);
    setSelfieBlob(null);
    setResults([]);
    setErrorMsg("");
  };

  const currentIndex = STEPS.indexOf(step === "error" ? "results" : step);
  const getPhotoUrl = (r: SearchResult) => (r.url as string) || (r.path as string) || "";

  return (
    <div className="min-h-screen bg-[hsl(0_0%_98%)] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="font-display text-[18px] font-bold text-gray-900">
          Xito<span className="text-[hsl(4_72%_52%)]">.</span>Events
        </div>
        <div className="w-12" />
      </header>

      {/* Progress bar */}
      <div className="flex gap-1.5 px-5 pt-4">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ background: currentIndex >= i ? "hsl(4 72% 52%)" : "hsl(0 0% 88%)" }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">

        {/* ── STEP 1: SCAN ── */}
        {step === "scan" && (
          <div className="w-full max-w-sm flex flex-col items-center gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(15_55%_96%)] flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(4,72%,52%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h1 className="font-display text-[26px] font-bold text-gray-900 leading-tight">Find Your Photos</h1>
              <p className="text-[13px] text-gray-400 mt-1">Take a quick selfie and we'll find all your event photos instantly.</p>
            </div>

            {cameraError && (
              <div className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-600 text-center">
                {cameraError}
              </div>
            )}

            {!cameraOpen && !selfie && (
              <button
                onClick={openCamera}
                className="w-full py-4 rounded-2xl font-semibold text-white text-[15px] transition-all active:scale-95"
                style={{ background: "hsl(4 72% 52%)", boxShadow: "0 4px 20px hsl(4 72% 52% / 0.35)" }}
              >
                Scan Your Photo
              </button>
            )}

            {cameraOpen && !selfie && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-60 rounded-full border-2 border-white/60" style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.35)" }} />
                  </div>
                </div>
                <button
                  onClick={takePhoto}
                  className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
                  style={{ background: "hsl(4 72% 52%)", boxShadow: "0 4px 16px hsl(4 72% 52% / 0.4)" }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/20" />
                </button>
              </div>
            )}

            {selfie && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="w-full aspect-square rounded-2xl overflow-hidden">
                  <img src={selfie} alt="Your selfie" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={retake}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Retake
                  </button>
                  <button
                    onClick={donePhoto}
                    className="flex-1 py-3 rounded-xl text-white text-[14px] font-semibold transition-all active:scale-95"
                    style={{ background: "hsl(4 72% 52%)" }}
                  >
                    Done ✓
                  </button>
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* ── SEARCHING ── */}
        {step === "searching" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(15_55%_96%)] flex items-center justify-center mx-auto">
              <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(4,72%,52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-[22px] font-bold text-gray-900">Scanning your face…</h2>
              <p className="text-[13px] text-gray-400 mt-1">Searching through event photos for a match</p>
            </div>
            {selfie && (
              <img src={selfie} alt="Selfie" className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md" />
            )}
          </div>
        )}

        {/* ── ERROR ── */}
        {step === "error" && (
          <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(4,72%,52%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-[22px] font-bold text-gray-900">Search Failed</h2>
              <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">{errorMsg}</p>
            </div>
            <button
              onClick={reset}
              className="w-full py-4 rounded-2xl font-semibold text-white text-[15px]"
              style={{ background: "hsl(4 72% 52%)" }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === "results" && (
          <div className="w-full max-w-2xl flex flex-col gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(15_55%_96%)] flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(4,72%,52%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-display text-[24px] font-bold text-gray-900">
                {results.length > 0 ? "Photos Found!" : "No Photos Found"}
              </h2>
              <p className="text-[13px] text-gray-400 mt-1">
                {results.length > 0
                  ? <><span className="font-semibold text-gray-700">{results.length}</span> matching photo{results.length !== 1 ? "s" : ""} found for your face</>
                  : <>No matching photos found. Try retaking your selfie with better lighting.</>
                }
              </p>
            </div>

            {selfie && (
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3">
                <img src={selfie} alt="Selfie" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-gray-800">Your selfie</p>
                  <p className="text-[12px] text-green-600">✓ Face matched · {results.length} photos found</p>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {results.map((r, i) => {
                  const url = getPhotoUrl(r);
                  return (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 group relative cursor-pointer">
                      {url ? (
                        <img
                          src={url}
                          alt={`Match ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[12px]">No preview</div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-end p-2 opacity-0 group-hover:opacity-100">
                        {url && (
                          <a
                            href={url}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-1.5 rounded-lg bg-white text-[12px] font-semibold text-gray-800 text-center block"
                          >
                            Download
                          </a>
                        )}
                      </div>
                      {(r.score != null || r.similarity != null) && (
                        <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                          {Math.round(((r.score ?? r.similarity) as number) * 100)}% match
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <button
              onClick={reset}
              className="w-full py-3 rounded-2xl border border-gray-200 text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors"
            >
              Scan Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
