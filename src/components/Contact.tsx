"use client";

import { useRef, useState } from "react";
import { profile } from "@/data/content";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./Icons";
import { Send, ExternalLink, MessageSquare, User, Mail, CheckCircle2, MapPin, AlertCircle } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setErrorMessage(null);

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    // Honeypot spam protection: bots fill this hidden field
    const honey = (formData.get("_honey") as string)?.trim() || "";
    if (honey) {
      setSubmitted(true);
      return;
    }

    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const subject = ((formData.get("subject") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();

    // Field-level validation
    if (!name || name.length < 2) {
      setErrorMessage("Please enter your name (minimum 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!message || message.length < 5) {
      setErrorMessage("Please enter your message (minimum 5 characters).");
      return;
    }

    setSending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/hashimalideveloper@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          subject: subject || "New Portfolio Contact Message",
          _subject: `New Portfolio Contact Message from ${name}`,
          message,
          _template: "table",
        }),
      });

      const data = await response.json().catch(() => null);

      const isSuccess = data?.success === "true" || data?.success === true;
      const isActivation =
        typeof data?.message === "string" && data.message.toLowerCase().includes("activation");

      if (isSuccess || isActivation) {
        setSubmittedData({ name, email, subject, message });
        setNeedsActivation(isActivation);
        setSubmitted(true);
        form.reset();
      } else {
        const errorText =
          data?.message ||
          "Form submission failed. Please try again or reach out directly on WhatsApp.";
        setErrorMessage(errorText);
      }
    } catch {
      setErrorMessage(
        "Network connection error. Please check your internet connection and try again."
      );
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#0E1530] border border-white/10 hover:border-brand-2/50 hover:shadow-[0_0_15px_rgba(125,211,252,0.15)] text-white text-sm placeholder:text-muted/60 caret-[#7DD3FC] focus:outline-none focus:border-[#7DD3FC] focus:ring-1 focus:ring-[#7DD3FC]/40 transition-all duration-200";

  const textareaClass =
    inputClass + " resize-none leading-relaxed";
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background radial spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 100%, rgba(76,141,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-reveal className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-brand/20 text-xs font-semibold text-brand-2 mb-4 shadow-sm">
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Get In Touch</span>
          </div>
          <h2
            id="contact-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
          >
            Let&apos;s Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-2">
              Together
            </span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind, an engineering role open, or want to collaborate? Send a message below.
          </p>
        </div>

        {/* 2-Column Contact Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Connect & Info (lg:col-span-5) */}
          <div data-reveal className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-surface/75 border border-white/8 hover:border-brand-2/50 hover:shadow-[0_0_28px_rgba(76,141,255,0.2)] backdrop-blur-md flex flex-col gap-5 shadow-sm transition-all duration-300">
              <h3 className="font-heading font-bold text-lg text-text">Direct Links</h3>

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hashim Ali on LinkedIn"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-2/60 border border-white/8 hover:border-brand-2/70 hover:shadow-[0_0_20px_rgba(76,141,255,0.25)] hover:bg-surface-2 hover:-translate-y-0.5 group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0A66C2]/15 border border-[#0A66C2]/30 group-hover:border-[#0A66C2]/60 group-hover:shadow-[0_0_12px_rgba(10,102,194,0.4)] flex items-center justify-center shrink-0 transition-all">
                    <LinkedInIcon className="w-5 h-5 text-[#0A66C2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text group-hover:text-white transition-colors">
                      LinkedIn
                    </p>
                    <p className="text-xs text-muted truncate">linkedin.com/in/hashimali-tech</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-brand-2 transition-colors shrink-0" />
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hashim Ali on GitHub"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-2/60 border border-white/8 hover:border-brand-2/70 hover:shadow-[0_0_20px_rgba(125,211,252,0.3)] hover:bg-surface-2 hover:-translate-y-0.5 group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] flex items-center justify-center shrink-0 transition-all">
                    <GitHubIcon className="w-5 h-5 text-text" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text group-hover:text-white transition-colors">
                      GitHub
                    </p>
                    <p className="text-xs text-muted truncate">github.com/hashimali-Tech</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-brand-2 transition-colors shrink-0" />
                </a>
              )}

              <div className="pt-2 flex items-center gap-2 text-xs text-muted">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Available for software engineering opportunities</span>
              </div>
            </div>

            {/* Location card */}
            <div className="p-6 rounded-2xl bg-surface/75 border border-white/8 hover:border-brand-2/50 hover:shadow-[0_0_24px_rgba(76,141,255,0.18)] backdrop-blur-md flex items-start gap-3.5 shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/25 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-brand-2" />
              </div>
              <div>
                <p className="text-xs text-muted">Location</p>
                <p className="text-sm font-semibold text-text mt-0.5">{profile.location}</p>
                <p className="text-xs text-muted/70 mt-1">Open to remote, hybrid &amp; on-site work</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (lg:col-span-7) */}
          <div data-reveal className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface/75 border border-white/8 hover:border-brand-2/40 hover:shadow-[0_0_32px_rgba(76,141,255,0.16)] backdrop-blur-md shadow-sm transition-all duration-500">
              {submitted && submittedData ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-text">Thank You, {submittedData.name}!</h3>
                  <p className="text-muted text-sm max-w-sm leading-relaxed">
                    {needsActivation ? (
                      <>
                        <span className="text-brand-2 font-semibold">One-time setup:</span> FormSubmit has emailed an &quot;Activate Form&quot; link to the recipient inbox. Please confirm it in your email to receive direct messages. In the meantime, you can deliver this message directly via WhatsApp below!
                      </>
                    ) : (
                      <>
                        Your message has been sent to my Gmail successfully! I will reply to you as soon as possible.
                      </>
                    )}
                  </p>

                  {/* Continue to WhatsApp Action */}
                  <div className="mt-2 w-full max-w-sm flex flex-col items-center gap-2.5 p-4 rounded-xl bg-surface-2/60 border border-white/8">
                    <p className="text-xs text-text font-semibold">Want an instant response?</p>
                    <a
                      href={`https://wa.me/923294131041?text=${encodeURIComponent(
                        `Hello Hashim,\n\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nSubject: ${
                          submittedData.subject || "Portfolio Contact"
                        }\n\nMessage:\n${submittedData.message}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#070B18] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_28px_rgba(37,211,102,0.55)] hover:scale-[1.02] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#070B18]" />
                      <span>Continue to WhatsApp</span>
                    </a>
                    <p className="text-[11px] text-muted/70 text-center leading-relaxed">
                      Opens WhatsApp with your message pre-filled. You can review and press send to deliver directly to my WhatsApp.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmittedData(null);
                      setNeedsActivation(false);
                      setErrorMessage(null);
                    }}
                    className="mt-2 px-5 py-2.5 rounded-full bg-surface-2 border border-white/10 text-xs font-semibold text-text hover:border-brand/40 transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Honeypot Spam Protection Field - hidden from real visitors */}
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Error Notification */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-200 flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex-1 leading-relaxed">
                        <p className="font-semibold">{errorMessage}</p>
                        <p className="text-[11px] text-red-300/80 mt-0.5">Your input has been preserved. Please correct it or retry.</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-text/80 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brand-2" aria-hidden="true" />
                        <span>Your Name</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="John Doe"
                        suppressHydrationWarning
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-text/80 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-brand-2" aria-hidden="true" />
                        <span>Email Address</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        suppressHydrationWarning
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-text/80">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="Project Inquiry / Job Opportunity"
                      suppressHydrationWarning
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-text/80 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-brand-2" aria-hidden="true" />
                      <span>Message</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project, team or requirement..."
                      suppressHydrationWarning
                      className={textareaClass}
                    />
                  </div>

                  {/* Honest Note */}
                  <p className="text-[11px] text-muted/60 leading-relaxed">
                    Note: Form submission delivers directly to my Gmail. Connect via LinkedIn or WhatsApp for instant replies.
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sending}
                    suppressHydrationWarning
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand to-brand-2 text-bg font-bold text-sm shadow-[0_0_20px_rgba(76,141,255,0.35)] hover:shadow-[0_0_28px_rgba(125,211,252,0.55)] hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:scale-100 transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 mt-1"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-bg/40 border-t-bg rounded-full animate-spin" />
                        <span>Sending message…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
