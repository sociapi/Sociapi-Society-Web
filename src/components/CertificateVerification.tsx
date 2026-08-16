import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { findCertificate, Certificate } from "../data/certificates";

interface VerificationState {
  status: "idle" | "loading" | "success" | "error";
  certificate: Certificate | null;
  enteredId: string;
}

function CertificateVerification() {
  const { certificateId: paramCertificateId } = useParams<{ certificateId?: string }>();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [verification, setVerification] = useState<VerificationState>({
    status: "idle",
    certificate: null,
    enteredId: ""
  });

  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-verify from URL parameter
  useEffect(() => {
    if (paramCertificateId) {
      handleVerify(paramCertificateId);
      setInputValue(paramCertificateId);
    }
  }, [paramCertificateId]);

  const handleVerify = (id?: string) => {
    const certificateIdToVerify = id || inputValue.trim();

    if (!certificateIdToVerify) {
      setVerification({ status: "idle", certificate: null, enteredId: "" });
      return;
    }

    setVerification({ status: "loading", certificate: null, enteredId: certificateIdToVerify });

    // Simulate API call with small delay
    setTimeout(() => {
      const cert = findCertificate(certificateIdToVerify);
      if (cert) {
        setVerification({ status: "success", certificate: cert, enteredId: certificateIdToVerify });
        // Update URL if not already there
        if (window.location.pathname !== `/verify/${certificateIdToVerify}`) {
          navigate(`/verify/${certificateIdToVerify}`, { replace: true });
        }
      } else {
        setVerification({ status: "error", certificate: null, enteredId: certificateIdToVerify });
      }
    }, 600);
  };

  const handleReset = () => {
    setVerification({ status: "idle", certificate: null, enteredId: "" });
    setInputValue("");
    navigate("/verify", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#070907]">
      {/* ============ HERO SECTION ============ */}
      <section className="relative px-4 pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7bd355]/30 bg-[#7bd355]/[.08] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355] shadow-[0_0_8px_#7bd355]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7bd355] sm:text-xs">
              ✓ Verify Certificate
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-black tracking-[-0.04em] text-[#e8ecee] sm:text-5xl md:text-6xl">
            Certificate <span className="bg-gradient-to-r from-[#7bd355] via-[#9fd380] to-[#7bd355] bg-clip-text text-transparent">Verification</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#939596]">
            Verify the authenticity of a certificate issued by Sociapi Society.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#939596]">
            Enter the certificate ID below or scan the QR code on the certificate.
          </p>

          {/* Divider */}
          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#7bd355]/70 to-transparent" />
        </motion.div>
      </section>

      {/* ============ VERIFICATION FORM & RESULT SECTION ============ */}
      <section className="relative px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          {/* If verification is idle or loading, show form */}
          {(verification.status === "idle" || verification.status === "loading") && (
            <motion.div
              key="form-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl"
            >
              {/* Verification Card */}
              <div className="rounded-[2rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(22,24,22,0.98),rgba(12,14,13,0.95))] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
                <label className="mb-5 block font-heading text-lg font-bold text-[#e8ecee]">
                  Certificate ID
                </label>

                {/* Input Group */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleVerify();
                    }}
                    placeholder="e.g. SB26-EWD-001"
                    className="flex-1 rounded-xl border border-[#e8ecee]/20 bg-[#e8ecee]/5 px-4 py-3 text-[#e8ecee] placeholder-[#939596] transition focus:border-[#7bd355]/50 focus:bg-[#e8ecee]/8 focus:outline-none focus:ring-2 focus:ring-[#7bd355]/20 sm:py-4"
                  />
                  <button
                    onClick={() => handleVerify()}
                    disabled={verification.status === "loading"}
                    className="group/btn relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#7bd355] px-6 py-3 font-bold text-[#0c140a] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(123,211,85,0.35)] disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-[0_8px_24px_rgba(123,211,85,0.35)] sm:px-8 sm:py-4"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {verification.status === "loading" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 border-2 border-[#0c140a] border-t-transparent rounded-full"
                          />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                          </svg>
                          Verify Certificate
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-300 group-hover/btn:translate-x-0" />
                  </button>
                </div>

                {/* Helper Text */}
                <p className="mt-5 text-center text-sm text-[#939596]">
                  Official certificate verification by Sociapi Society
                </p>
              </div>
            </motion.div>
          )}

          {/* If verification is success, show certificate details */}
          {verification.status === "success" && verification.certificate && (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Result Header Card */}
              <div className="rounded-[2rem] border border-[#7bd355]/30 bg-gradient-to-b from-[#7bd355]/15 via-[#517642]/5 to-transparent p-8 shadow-[0_18px_70px_rgba(123,211,85,0.15)] backdrop-blur-xl sm:p-10">
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:gap-6 md:text-left">
                  {/* Check Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#7bd355]/20 md:h-20 md:w-20"
                  >
                    <svg
                      className="h-8 w-8 text-[#7bd355] md:h-10 md:w-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>

                  <div>
                    <h2 className="font-heading text-3xl font-black text-[#e8ecee] sm:text-4xl">
                      Certificate Verified
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-[#939596]">
                      This certificate is authentic and was officially issued by Sociapi Society.
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 rounded-full border border-[#7bd355] bg-[#7bd355]/20 px-4 py-2">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#7bd355]">
                      {verification.certificate.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Details Section */}
              <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
                {/* Left Column - Certificate Info */}
                <div className="lg:col-span-2">
                  <div className="rounded-[2rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(22,24,22,0.98),rgba(12,14,13,0.95))] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
                    <h3 className="font-heading text-2xl font-bold text-[#e8ecee] sm:text-3xl">
                      Certificate Details
                    </h3>
                    <div className="mt-8 space-y-6">
                      {[
                        { label: "Certificate ID", value: verification.certificate.certificateId },
                        { label: "Full Name", value: verification.certificate.name },
                        { label: "Program", value: verification.certificate.program },
                        { label: "Course", value: verification.certificate.course },
                        { label: "Issue Date", value: verification.certificate.issueDate },
                        { label: "Certificate Type", value: verification.certificate.certificateType },
                        { label: "Issued By", value: verification.certificate.issuedBy }
                      ].map((item, idx) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx }}
                          className="flex flex-col gap-2 border-b border-[#e8ecee]/8 pb-6 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-[#7bd355]">
                            {item.label}
                          </span>
                          <span className="text-base font-medium text-[#e8ecee]">{item.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Certificate Preview */}
                <div className="flex flex-col gap-6">
                  {/* Certificate Preview Card */}
                  <div className="rounded-[2rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(22,24,22,0.98),rgba(12,14,13,0.95))] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <h3 className="font-heading text-lg font-bold text-[#e8ecee]">
                      Certificate Preview
                    </h3>
                    <div className="mt-6 flex h-64 items-center justify-center rounded-xl border border-[#e8ecee]/10 bg-gradient-to-br from-[#7bd355]/10 to-transparent">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-[#7bd355]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M12 13H8M16 17H8M12 9H8" />
                        </svg>
                        <p className="mt-3 text-xs text-[#939596]">Certificate file coming soon</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#7bd355]/30 bg-[#7bd355]/10 px-4 py-3 text-sm font-bold text-[#7bd355] transition-all duration-300 hover:border-[#7bd355]/60 hover:bg-[#7bd355]/20">
                        <span className="relative z-10">View Full</span>
                        <span className="absolute inset-0 -translate-x-full bg-[#7bd355]/10 transition-transform duration-300 group-hover/btn:translate-x-0" />
                      </button>
                      <button className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#7bd355] px-4 py-3 text-sm font-bold text-[#0c140a] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(123,211,85,0.35)]">
                        <span className="relative z-10 flex items-center gap-2">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Download
                        </span>
                        <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-300 group-hover/btn:translate-x-0" />
                      </button>
                    </div>
                  </div>

                  {/* QR Code Info */}
                  <div className="rounded-[2rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(22,24,22,0.98),rgba(12,14,13,0.95))] p-6 backdrop-blur-xl">
                    <p className="text-sm text-[#939596]">
                      <span className="font-bold text-[#7bd355]">Scan QR Code:</span> Every certificate has a unique verification ID. Scan the QR code on your certificate to verify it instantly.
                    </p>
                    <p className="mt-3 break-all text-xs text-[#7bd355]">
                      https://sociapis.vercel.app/verify/{verification.certificate.certificateId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Try Again Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleReset}
                  className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#e8ecee]/20 bg-[#e8ecee]/5 px-8 py-3.5 font-bold text-[#e8ecee] transition-all duration-300 hover:border-[#7bd355]/50 hover:bg-[#7bd355]/10 hover:text-[#7bd355] sm:px-10 sm:py-4"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21.5 2v6h-6M2.5 22v-6h6" />
                      <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                    </svg>
                    Verify Another Certificate
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-[#7bd355]/10 transition-transform duration-300 group-hover/btn:translate-x-0" />
                </button>
              </div>
            </motion.div>
          )}

          {/* If verification is error, show error state */}
          {verification.status === "error" && (
            <motion.div
              key="error-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl"
            >
              <div className="rounded-[2rem] border border-red-500/30 bg-gradient-to-b from-red-500/10 via-red-500/5 to-transparent p-8 shadow-[0_18px_70px_rgba(239,68,68,0.15)] backdrop-blur-xl sm:p-10">
                <div className="flex flex-col items-center gap-6 text-center">
                  {/* Error Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 sm:h-20 sm:w-20"
                  >
                    <svg
                      className="h-8 w-8 text-red-400 sm:h-10 sm:w-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </motion.div>

                  <div>
                    <h2 className="font-heading text-3xl font-black text-[#e8ecee] sm:text-4xl">
                      Certificate Not Found
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-[#939596]">
                      We could not find a certificate with this ID. Please check the certificate ID and try again.
                    </p>
                    <p className="mt-4 rounded-lg border border-[#e8ecee]/10 bg-[#e8ecee]/5 px-4 py-2.5 font-mono text-sm text-[#7bd355]">
                      "{verification.enteredId}"
                    </p>
                  </div>

                  {/* Try Again Button */}
                  <button
                    onClick={handleReset}
                    className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#7bd355] px-8 py-3.5 font-bold text-[#0c140a] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(123,211,85,0.35)] sm:px-10 sm:py-4"
                  >
                    <span className="relative z-10">Try Again</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-300 group-hover/btn:translate-x-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CertificateVerification;
