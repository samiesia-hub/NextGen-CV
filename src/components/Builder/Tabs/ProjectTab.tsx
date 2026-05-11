"use client";

import React, { useState } from 'react';
import { useCVStore } from '@/store/useCVStore';

export const ProjectTab = () => {
  const state = useCVStore();
  const [loading, setLoading] = useState(false);
  const [jsonPaste, setJsonPaste] = useState('');
  const [showPaste, setShowPaste] = useState(false);



  const handleExportJSON = () => {
    const data = JSON.stringify(state, null, 4);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv_${state.personalInfo.name.replace(/\s+/g, '_')}.json`;
    a.click();
  };

  const applyJSON = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      
      if (data.personalInfo) state.setPersonalInfo(data.personalInfo);
      if (data.sidebarSections) state.setSidebarSections(data.sidebarSections);
      if (data.mainSections) state.setMainSections(data.mainSections);
      
      alert("CV mis à jour avec succès !");
      setShowPaste(false);
      setJsonPaste('');
    } catch (err) {
      alert("Format JSON invalide. Veuillez vérifier votre texte.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      applyJSON(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-5 pt-2 pb-10">


      {/* Files & Import */}
      <section className="panel-card p-5 animate-in animate-in-delay-1">
        <div className="section-header">
          <div className="icon-chip"><i className="fas fa-file-export"></i></div>
          <h3>Fichiers & Import</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={handleExportJSON} className="action-btn">
            <i className="fas fa-download text-blue-400"></i>
            <span>Exporter JSON</span>
          </button>
          
          <label className="action-btn cursor-pointer">
            <i className="fas fa-file-import text-purple-400"></i>
            <span>Charger fichier</span>
            <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        <button 
          onClick={() => setShowPaste(!showPaste)}
          className={`w-full py-2.5 text-[11px] font-bold rounded-lg border transition-all ${
            showPaste 
              ? 'text-slate-300 border-slate-600 bg-slate-800/50' 
              : 'text-purple-400 border-purple-500/20 hover:bg-purple-500/5 hover:border-purple-500/30'
          }`}
        >
          {showPaste ? "Annuler l'import direct" : "Coller du JSON directement"}
        </button>

        {showPaste && (
          <div className="mt-4 space-y-3 animate-in">
            <textarea
              className="editor-input w-full h-40 p-3 text-[11px] font-mono rounded-lg resize-none"
              placeholder='Collez votre JSON ici... (Ex: { "personalInfo": {...} })'
              value={jsonPaste}
              onChange={(e) => setJsonPaste(e.target.value)}
            />
            <button 
              onClick={() => applyJSON(jsonPaste)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-lg font-bold text-xs transition-colors"
            >
              Appliquer le JSON
            </button>
          </div>
        )}
      </section>

      {/* Danger Zone */}
      <section className="danger-zone animate-in animate-in-delay-2">
        <h3 className="text-xs font-bold mb-3 flex items-center gap-2">
          <i className="fas fa-triangle-exclamation text-red-400/80"></i>
          Zone de danger
        </h3>
        <button 
          onClick={() => { if(confirm("Réinitialiser toutes les données? Cela supprimera tout votre travail local.")) state.resetAll() }}
          className="w-full text-[11px] font-bold hover:underline py-1"
        >
          Effacer tout et recommencer
        </button>
      </section>
    </div>
  );
};
