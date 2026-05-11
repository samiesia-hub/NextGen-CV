"use client";

import React from 'react';
import { useCVStore } from '@/store/useCVStore';

export const ContentTab = () => {
  const { personalInfo, updatePersonalInfo, sidebarSections, setSidebarSections } = useCVStore();

  const handleUpdateSectionTitle = (idx: number, val: string) => {
    const newSections = sidebarSections.map((s, i) =>
      i === idx ? { ...s, title: val } : s
    );
    setSidebarSections(newSections);
  };

  const handleUpdateSidebarItem = (sIdx: number, iIdx: number, field: string | null, val: string) => {
    const newSections = sidebarSections.map((s, si) => {
      if (si !== sIdx) return s;
      const newItems = s.items.map((item: any, ii: number) => {
        if (ii !== iIdx) return item;
        if (field) return { ...item, [field]: val };
        return val;
      });
      return { ...s, items: newItems };
    });
    setSidebarSections(newSections);
  };

  const handleDeleteSection = (idx: number) => {
    if (confirm("Supprimer cette section?")) {
      const newSections = sidebarSections.filter((_, i) => i !== idx);
      setSidebarSections(newSections);
    }
  };

  const moveSection = (idx: number, dir: number) => {
    if ((idx === 0 && dir === -1) || (idx === sidebarSections.length - 1 && dir === 1)) return;
    const newSections = [...sidebarSections];
    [newSections[idx], newSections[idx + dir]] = [newSections[idx + dir], newSections[idx]];
    setSidebarSections(newSections);
  };

  return (
    <div className="space-y-5 pt-2">
      {/* Personal Info */}
      <section className="panel-card p-5 animate-in">
        <div className="section-header">
          <div className="icon-chip"><i className="fas fa-user"></i></div>
          <h3>Informations Personnelles</h3>
        </div>
        <div className="space-y-3">
          <Input label="Nom complet" value={personalInfo.name} onChange={(v: string) => updatePersonalInfo({ name: v })} />
          <Input label="Email" value={personalInfo.email} onChange={(v: string) => updatePersonalInfo({ email: v })} />
          <Input label="Téléphone" value={personalInfo.phone} onChange={(v: string) => updatePersonalInfo({ phone: v })} />
          <Input label="Localisation" value={personalInfo.location} onChange={(v: string) => updatePersonalInfo({ location: v })} />
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profil / Résumé</label>
            <textarea
              value={personalInfo.profile}
              onChange={(e) => updatePersonalInfo({ profile: e.target.value })}
              rows={4}
              className="editor-input w-full p-2.5 text-xs rounded-lg resize-none"
            />
          </div>
        </div>
      </section>

      {/* Sidebar Sections */}
      <div className="space-y-4">
        <div className="section-header">
          <div className="icon-chip"><i className="fas fa-layer-group"></i></div>
          <h3>Sections Sidebar</h3>
        </div>

        {sidebarSections.map((section, sIdx) => (
          <div key={sIdx} className="sidebar-section-card space-y-3 animate-in" style={{ animationDelay: `${sIdx * 0.05}s` }}>
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <button onClick={() => moveSection(sIdx, -1)} className="move-btn">
                  <i className="fas fa-chevron-up"></i>
                </button>
                <button onClick={() => moveSection(sIdx, 1)} className="move-btn">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <input
                value={section.title}
                placeholder="Titre de section"
                onChange={(e) => handleUpdateSectionTitle(sIdx, e.target.value)}
                className="text-[11px] font-bold uppercase text-center text-slate-300 focus:outline-none focus:text-[var(--primary-light)] bg-transparent tracking-wider transition-colors"
              />
              <button onClick={() => handleDeleteSection(sIdx)} className="move-btn text-red-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20">
                <i className="fas fa-trash-alt text-[9px]"></i>
              </button>
            </div>

            {/* Section Items */}
            <div className="space-y-2">
              {section.items.map((item: any, iIdx: number) => (
                <div key={iIdx} className="flex gap-2 items-center">
                  {section.type === 'link' ? (
                    <div className="flex-1 grid grid-cols-2 gap-1.5">
                      <input
                        className="editor-input text-[10px] p-2 rounded-lg"
                        value={item.text}
                        onChange={(e) => handleUpdateSidebarItem(sIdx, iIdx, 'text', e.target.value)}
                        placeholder="Texte"
                      />
                      <input
                        className="editor-input text-[10px] p-2 rounded-lg"
                        value={item.href}
                        onChange={(e) => handleUpdateSidebarItem(sIdx, iIdx, 'href', e.target.value)}
                        placeholder="URL"
                      />
                    </div>
                  ) : section.type === 'language' ? (
                    <div className="flex-1 flex items-stretch gap-1.5">
                      <input
                        className="editor-input text-[10px] p-2 rounded-lg flex-1 min-w-12"
                        value={item.name}
                        onChange={(e) => handleUpdateSidebarItem(sIdx, iIdx, 'name', e.target.value)}
                        placeholder="Langue"
                      />
                      <input
                        type="number"
                        min="1" max="5"
                        className="editor-input text-[10px] p-2 rounded-lg w-12 text-center no-spinner max-w-12"
                        value={item.dots}
                        onChange={(e) => handleUpdateSidebarItem(sIdx, iIdx, 'dots', e.target.value)}
                      />
                    </div>
                  ) : (
                    <input
                      className="editor-input text-[10px] p-2 rounded-lg flex-1"
                      value={item}
                      onChange={(e) => handleUpdateSidebarItem(sIdx, iIdx, null, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setSidebarSections([...sidebarSections, { title: 'Nouvelle Section', type: 'quality', items: [] }])}
          className="add-section-btn"
        >
          <i className="fas fa-plus"></i>
          Ajouter section sidebar
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="editor-input w-full p-2.5 text-xs rounded-lg"
    />
  </div>
);
