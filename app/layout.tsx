import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Video Creator AI",
  description: "Generate viral hooks, scripts, visuals, captions and hashtags",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="app-container">
          <header className="app-header">
            <div className="brand">?? Viral Video Creator AI</div>
            <div className="sub">Hindi + Hinglish ? Reels ? Shorts ? TikTok</div>
          </header>
          <main className="app-main">{children}</main>
          <footer className="app-footer">
            <span>Built for speed ? Optimized for virality ? Follow for more</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
