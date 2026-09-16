"use client";

import { useEffect, useState } from "react";

function formatGeneratedAt(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function DistrictPrintFooter() {
  const [generatedAt, setGeneratedAt] = useState(() =>
    formatGeneratedAt(new Date()),
  );

  useEffect(() => {
    function handleBeforePrint() {
      setGeneratedAt(formatGeneratedAt(new Date()));
    }

    window.addEventListener("beforeprint", handleBeforePrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  return (
    <div className="district-print-footer hidden">
      <span>Generated: {generatedAt}</span>
      <span className="district-print-page" />
    </div>
  );
}
