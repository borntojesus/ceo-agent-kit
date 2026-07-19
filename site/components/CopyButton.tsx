"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      className={`copy-btn${copied ? " copied" : ""}`}
      onClick={copy}
      type="button"
    >
      {copied ? (
        <Check size={15} aria-hidden />
      ) : (
        <Copy size={15} aria-hidden />
      )}
      {copied ? "Скопійовано" : "Копіювати промпт"}
    </button>
  );
}
