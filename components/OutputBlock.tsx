"use client";

import { useState } from "react";

export default function OutputBlock({
  title,
  children,
  copyText,
  downloadableFilename,
}: {
  title: string;
  children: React.ReactNode;
  copyText: string;
  downloadableFilename?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  function download() {
    const blob = new Blob([copyText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadableFilename || "output.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="block">
      <div className="block-head">
        <div className="block-title">{title}</div>
        <div className="block-actions">
          {downloadableFilename && (
            <button onClick={download}>Download</button>
          )}
          <button onClick={copy}>{copied ? "Copied" : "Copy"}</button>
        </div>
      </div>
      <div className="block-body">{children}</div>
    </div>
  );
}
