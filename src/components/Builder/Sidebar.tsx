"use client";

import React, { useState } from 'react';
import { StyleTab } from './Tabs/StyleTab';
import { ContentTab } from './Tabs/ContentTab';
import { ProTab } from './Tabs/ProTab';
import { ProjectTab } from './Tabs/ProjectTab';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('style');

  const tabs = [
    { id: 'style', label: 'Style', icon: 'fas fa-palette' },
    { id: 'content', label: 'Content', icon: 'fas fa-user' },
    { id: 'pro', label: 'Pro', icon: 'fas fa-briefcase' },
    { id: 'project', label: 'Projet', icon: 'fas fa-folder' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Tab Navigation */}
      <div className="tab-shell mx-4 mt-4 mb-3 flex rounded-xl p-1.5 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "tab-btn flex-1 py-2.5 px-2 text-[11px] font-semibold flex flex-col items-center gap-1.5 transition-all rounded-lg relative z-[2]",
              activeTab === tab.id 
                ? "active" 
                : ""
            )}
          >
            <i className={clsx(tab.icon, "text-[13px]")}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {activeTab === 'style' && <StyleTab />}
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'pro' && <ProTab />}
          {activeTab === 'project' && <ProjectTab />}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar p-5 flex flex-col gap-3">
        <button 
          onClick={() => window.print()}
          className="export-btn w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2.5"
        >
          <i className="fas fa-file-pdf relative z-[1]"></i>
          <span className="relative z-[1]">Export PDF</span>
        </button>
      </div>
    </div>
  );
};
