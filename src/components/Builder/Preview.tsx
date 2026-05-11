"use client";

import React from 'react';
import { useCVStore } from '@/store/useCVStore';
import { motion } from 'framer-motion';

export const Preview = () => {
  const { personalInfo, sidebarSections, mainSections, styleConfig } = useCVStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cv-paper"
      style={{ fontFamily: styleConfig.fontFamily }}
    >
      {/* Sidebar Part */}
      <div className="cv-sidebar">
        <div className="cv-header-block">
          <div className="cv-name">
            {personalInfo.name}
          </div>
          <div className="cv-arc">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d={`M0,0 Q50,${styleConfig.arcSize} 100,0`} fill="var(--dark)" />
            </svg>
          </div>
        </div>

        <div className="cv-sidebar-content">
          <h3 className="section-title-sidebar">INFORMATION PERSONNEL</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ContactItem icon="fas fa-envelope" text={personalInfo.email} />
            <ContactItem icon="fas fa-phone" text={personalInfo.phone} />
            <ContactItem icon="fas fa-location-dot" text={personalInfo.location} />
          </div>

          {/* Dynamic Sidebar Sections */}
          {sidebarSections.map((section, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
              {section.title && <h3 className="section-title-sidebar">{section.title}</h3>}
              <div className="sidebar-section-items">
                {section.type === 'link' && section.items.map((item: any, i) => (
                  <ContactItem key={i} icon={item.icon} text={item.text} href={item.href} />
                ))}
                {section.type === 'language' && section.items.map((lang: any, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="cv-text">{lang.name}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[...Array(5)].map((_, dotIdx) => (
                        <div key={dotIdx} style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: dotIdx < lang.dots ? 'var(--primary)' : '#ddd',
                          border: '1px solid rgba(0,0,0,0.05)'
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
                {section.type === 'quality' && (
                  <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem' }}>
                    {section.items.map((q: any, i) => <li key={i} className="cv-text" style={{ marginBottom: '0.5rem' }}>{q}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="cv-footer-block" style={{ height: `${styleConfig.arcSize + 40}px`, backgroundColor: 'transparent' }}>
          <div className="cv-arc-up" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}>
            <svg viewBox={`0 0 100 ${styleConfig.arcSize + 40}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
              <path
                d={`M0,0 Q50,${styleConfig.arcSize} 100,0 L100,${styleConfig.arcSize + 40} L0,${styleConfig.arcSize + 40} Z`}
                fill="var(--dark)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Part */}
      <div className="cv-main">
        <div className="section">
          <h2 className="section-title-main">Profil</h2>
          <div className="cv-text" style={{ marginBottom: `${styleConfig.cvGap}rem` }}>
            {personalInfo.profile}
          </div>
        </div>

        {mainSections.map((section) => (
          <div key={section.id} className="section">
            <h2 className="section-title-main">{section.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${styleConfig.cvGap}rem` }}>
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="experience-header">
                    <span>{item.title}</span>
                    {item.period && <span style={{ color: '#666', fontWeight: 500 }}>{item.period}</span>}
                  </div>
                  {item.subtitle && <div style={{ color: 'var(--primary)', fontWeight: 400, fontSize: '0.7rem', marginBottom: '0.4rem' }}>{item.subtitle}</div>}
                  {item.description && <div className="cv-text" style={{ whiteSpace: 'pre-line', marginBottom: '0.5rem' }}>{item.description}</div>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                      {item.bullets.map((b, i) => <li key={i} className="cv-text" style={{ marginBottom: '0.3rem' }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ContactItem = ({ icon, text, href }: { icon: string, text: string, href?: string }) => {
  if (!text) return null;
  const content = (
    <div className="contact-item">
      <div className="icon-box">
        <i className={icon}></i>
      </div>
      <span className="cv-text" style={{ overflowWrap: 'anywhere' }}>{text}</span>
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a>;
  return content;
};
