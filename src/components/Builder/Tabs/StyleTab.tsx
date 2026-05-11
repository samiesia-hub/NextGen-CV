"use client";

import React from 'react';
import { useCVStore } from '@/store/useCVStore';

export const StyleTab = () => {
  const { styleConfig, updateStyle } = useCVStore();

  return (
    <div className="space-y-5 pt-2">
      {/* Colors */}
      <section className="panel-card p-5 animate-in">
        <div className="section-header">
          <div className="icon-chip"><i className="fas fa-droplet"></i></div>
          <h3>Couleurs</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker label="Primaire" value={styleConfig.primaryColor} onChange={(v: string) => updateStyle('primaryColor', v)} />
          <ColorPicker label="Header" value={styleConfig.headerColor} onChange={(v: string) => updateStyle('headerColor', v)} />
          <ColorPicker label="Sidebar" value={styleConfig.sidebarColor} onChange={(v: string) => updateStyle('sidebarColor', v)} />
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Courbure Arc</label>
            <input 
              type="range" 
              min="0" max="100" 
              value={styleConfig.arcSize} 
              onChange={(e) => updateStyle('arcSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="panel-card p-5 animate-in animate-in-delay-1">
        <div className="section-header">
          <div className="icon-chip"><i className="fas fa-font"></i></div>
          <h3>Typographie</h3>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Police de caractères</label>
            <select 
              value={styleConfig.fontFamily} 
              onChange={(e) => updateStyle('fontFamily', e.target.value)}
              className="editor-input w-full p-2.5 rounded-lg text-sm"
            >
              <option value="'Inter', sans-serif">Inter (Moderne)</option>
              <option value="'Outfit', sans-serif">Outfit (Premium)</option>
              <option value="Arial, sans-serif">Arial (Standard)</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
            </select>
          </div>
          <RangeSlider label="Taille du texte" min={0.7} max={1.5} step={0.05} value={styleConfig.fontSize} onChange={(v: number) => updateStyle('fontSize', v)} />
          <RangeSlider label="Espacement lignes" min={1} max={2.5} step={0.1} value={styleConfig.lineHeight} onChange={(v: number) => updateStyle('lineHeight', v)} />
        </div>
      </section>

      {/* Layout */}
      <section className="panel-card p-5 animate-in animate-in-delay-2">
        <div className="section-header">
          <div className="icon-chip"><i className="fas fa-table-columns"></i></div>
          <h3>Mise en page</h3>
        </div>
        <div className="space-y-5">
          <RangeSlider label="Marges (Padding)" min={0.5} max={4} step={0.1} value={styleConfig.cvPadding} onChange={(v: number) => updateStyle('cvPadding', v)} />
          <RangeSlider label="Espacement blocs" min={0.5} max={4} step={0.1} value={styleConfig.cvGap} onChange={(v: number) => updateStyle('cvGap', v)} />
        </div>
      </section>
    </div>
  );
};

const ColorPicker = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</label>
    <div className="flex items-center gap-2.5 p-2 rounded-lg border border-[var(--panel-input-border)] bg-[var(--panel-input-bg)] transition-all hover:border-[rgba(100,160,200,0.25)]">
      <div className="relative">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-8 h-8 cursor-pointer bg-transparent rounded-md" />
      </div>
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{value}</span>
    </div>
  </div>
);

const RangeSlider = ({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</label>
      <span className="text-[11px] font-bold text-[var(--primary-light)] tabular-nums bg-[rgba(26,107,138,0.1)] px-2 py-0.5 rounded-md">{value}</span>
    </div>
    <input 
      type="range" 
      min={min} max={max} step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full"
    />
  </div>
);
