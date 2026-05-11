"use client";

import React from 'react';
import { useCVStore, MainSection } from '@/store/useCVStore';

export const ProTab = () => {
  const { mainSections, setMainSections } = useCVStore();

  const handleUpdateTitle = (sIdx: number, val: string) => {
    const newSections = [...mainSections];
    newSections[sIdx] = { ...newSections[sIdx], title: val };
    setMainSections(newSections);
  };

  const addItem = (sIdx: number) => {
    const newSections = [...mainSections];
    newSections[sIdx] = {
      ...newSections[sIdx],
      items: [...newSections[sIdx].items, {
        id: Date.now(),
        title: "Nouveau poste / Formation",
        period: "2024",
        subtitle: "Nom de l'entreprise / École",
        description: "",
        bullets: []
      }]
    };
    setMainSections(newSections);
  };

  const updateItem = (sIdx: number, iIdx: number, field: string, val: string) => {
    const newSections = [...mainSections];
    const newItems = [...newSections[sIdx].items];
    newItems[iIdx] = { ...newItems[iIdx], [field]: val };
    newSections[sIdx] = { ...newSections[sIdx], items: newItems };
    setMainSections(newSections);
  };

  const deleteItem = (sIdx: number, iIdx: number) => {
    const newSections = [...mainSections];
    const newItems = newSections[sIdx].items.filter((_, i) => i !== iIdx);
    newSections[sIdx] = { ...newSections[sIdx], items: newItems };
    setMainSections(newSections);
  };

  return (
    <div className="space-y-6 pt-2">
      {mainSections.map((section, sIdx) => (
        <div key={section.id} className="space-y-4 animate-in" style={{ animationDelay: `${sIdx * 0.08}s` }}>
          {/* Section Title */}
          <div className="flex justify-between items-center border-b border-[var(--panel-border)] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="icon-chip">
                <i className="fas fa-bookmark text-[10px]"></i>
              </div>
              <input
                value={section.title}
                onChange={(e) => handleUpdateTitle(sIdx, e.target.value)}
                className="text-sm font-bold text-slate-200 focus:outline-none focus:text-[var(--primary-light)] bg-transparent transition-colors"
              />
            </div>
            <button 
              onClick={() => addItem(sIdx)} 
              className="text-[10px] font-bold text-[var(--primary-light)] hover:text-white px-2.5 py-1.5 rounded-md hover:bg-[var(--panel-hover)] transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-plus text-[8px]"></i>
              Ajouter
            </button>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {section.items.map((item, iIdx) => (
              <div key={item.id} className="item-card group" style={{ animationDelay: `${(sIdx * 3 + iIdx) * 0.05}s` }}>
                <button
                  onClick={() => deleteItem(sIdx, iIdx)}
                  className="delete-float-btn"
                >
                  <i className="fas fa-times"></i>
                </button>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Titre</label>
                    <input 
                      value={item.title} 
                      onChange={(e) => updateItem(sIdx, iIdx, 'title', e.target.value)} 
                      className="editor-input w-full p-2 text-xs rounded-lg" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Période</label>
                    <input 
                      value={item.period} 
                      onChange={(e) => updateItem(sIdx, iIdx, 'period', e.target.value)} 
                      className="editor-input w-full p-2 text-xs rounded-lg" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Sous-titre / Lieu</label>
                    <input 
                      value={item.subtitle} 
                      onChange={(e) => updateItem(sIdx, iIdx, 'subtitle', e.target.value)} 
                      className="editor-input w-full p-2 text-xs rounded-lg" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(sIdx, iIdx, 'description', e.target.value)}
                      rows={3}
                      className="editor-input w-full p-2 text-xs rounded-lg resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => setMainSections([...mainSections, { id: Date.now(), title: 'Nouvelle Section', items: [] }])}
        className="add-section-btn flex-col gap-1.5 py-5"
      >
        <i className="fas fa-plus-circle text-lg"></i>
        <span>Ajouter une nouvelle section principale</span>
      </button>
    </div>
  );
};
