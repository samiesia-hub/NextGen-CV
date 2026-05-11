"use client";

import React, { useEffect } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Sidebar } from '@/components/Builder/Sidebar';
import { Preview } from '@/components/Builder/Preview';

export default function CVBuilderPage() {
  const { styleConfig } = useCVStore();

  // Sync CSS variables with store
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', styleConfig.primaryColor);
    root.style.setProperty('--primary-light', adjustColor(styleConfig.primaryColor, 25));
    root.style.setProperty('--primary-glow', hexToRgba(styleConfig.primaryColor, 0.35));
    root.style.setProperty('--dark', styleConfig.headerColor);
    root.style.setProperty('--header-bg', styleConfig.headerColor);
    root.style.setProperty('--sidebar-bg', styleConfig.sidebarColor);
    root.style.setProperty('--font-size', `${styleConfig.fontSize}rem`);
    root.style.setProperty('--line-height', styleConfig.lineHeight.toString());
    root.style.setProperty('--cv-padding', `${styleConfig.cvPadding}rem`);
    root.style.setProperty('--cv-gap', `${styleConfig.cvGap}rem`);
  }, [styleConfig]);

  return (
    <div className="app-shell">
      {/* Controls Sidebar */}
      <aside className="app-controls h-screen overflow-y-auto flex flex-col">
        <div className="p-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--primary)] to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-file-alt text-white text-sm"></i>
            </div>
            <div>
              <h1 className="app-title text-xl font-bold font-[var(--font-outfit)]">
                CV Platform
              </h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                Builder • Preview • Export
              </p>
            </div>
          </div>
        </div>
        <Sidebar />
      </aside>

      {/* Preview Area */}
      <main className="preview-area">
        <Preview />
      </main>
    </div>
  );
}

// Helper: lighten/darken hex color
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Helper: hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
