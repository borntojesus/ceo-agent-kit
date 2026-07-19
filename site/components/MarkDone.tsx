"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { readProgress, writeProgress } from "@/components/Checklist";

export default function MarkDone({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(!!readProgress()[slug]);
  }, [slug]);

  const toggle = () => {
    const state = readProgress();
    state[slug] = !state[slug];
    writeProgress(state);
    setDone(!!state[slug]);
  };

  return (
    <button
      className={`mark-done${done ? " is-done" : ""}`}
      onClick={toggle}
      type="button"
    >
      <Check size={16} aria-hidden />
      {done ? "Виконано" : "Позначити виконаним"}
    </button>
  );
}
