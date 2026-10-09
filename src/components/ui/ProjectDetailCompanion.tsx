'use client';

import React, { useEffect, useMemo } from 'react';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { projectsData } from '@/content/projects';
import { X, ExternalLink, CheckCircle2, ShieldCheck, AlertCircle, Code2 } from 'lucide-react';

/**
 * SANTRO M10 — Architectural Project Detail Companion Layer
 *
 * Restrained, high-readability companion content layer separating world content
 * (architectural plinths) from interface content (long descriptions, technical problem/solution,
 * verified links, and accessibility fallbacks).
 *
 * Strictly follows M10 Section 10 & 17:
 * - Lightweight presentation without routing changes
 * - Only verified links and capabilities
 * - No unverified metrics or fake URLs
 */
export function ProjectDetailCompanion() {
  const isModalOpen = useHouseStore((state) => state.isModalOpen);
  const activeProjectId = useHouseStore((state) => state.activeProjectId);
  const closeProjectModal = useHouseStore((state) => state.closeProjectModal);

  const project = useMemo(() => {
    if (!activeProjectId) return null;
    return projectsData.find((p) => p.id === activeProjectId) || null;
  }, [activeProjectId]);

  // Handle ESC key to dismiss companion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeProjectModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeProjectModal]);

  if (!isModalOpen || !project) {
    return null;
  }

  const isPrototype = project.status === 'prototype';
  const isConcept = project.status === 'concept';
  const isInProgress = project.status === 'in-progress';
  const isImplemented = project.status === 'implemented';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-8 bg-black/60 backdrop-blur-sm pointer-events-auto"
      onClick={() => closeProjectModal()}
    >
      <div
        className="relative w-full max-w-xl h-full max-h-[90vh] bg-[#0E1015] border border-white/15 rounded-lg shadow-2xl flex flex-col overflow-hidden text-neutral-200 select-text"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="companion-project-title"
        aria-modal="true"
      >
        {/* Accent Bar at top edge */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Header Row */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/10 bg-[#12141A]">
          <div className="flex flex-col gap-1.5 pr-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="text-[11px] font-mono font-semibold tracking-wider text-neutral-400 uppercase">
                {project.year} • {project.category} • {project.role}
              </span>
            </div>

            <h2
              id="companion-project-title"
              className="text-2xl md:text-3xl font-bold font-sans text-white tracking-tight"
            >
              {project.name}
            </h2>

            <p className="text-sm text-neutral-400 font-medium">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={() => closeProjectModal()}
            className="p-1.5 rounded border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close project companion"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Status & Verification Box */}
          <div className="p-3.5 rounded bg-[#161922] border border-white/10 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isImplemented && <CheckCircle2 size={14} className="text-emerald-400" />}
                {isInProgress && <ShieldCheck size={14} className="text-cyan-400" />}
                {isPrototype && <ShieldCheck size={14} className="text-amber-400" />}
                {isConcept && <AlertCircle size={14} className="text-neutral-400" />}
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  STATUS: {project.status.toUpperCase()}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                VERIFIED ARCHITECTURE
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {project.statusDetail}
            </p>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
              PROJECT OVERVIEW
            </h3>
            <p className="text-neutral-200 leading-relaxed font-sans text-[14px]">
              {project.shortDescription}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded bg-[#14161C] border border-white/5 space-y-1.5">
              <span className="text-[11px] font-mono font-semibold text-red-300 uppercase tracking-wider">
                CHALLENGE / PROBLEM
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-3.5 rounded bg-[#14161C] border border-white/5 space-y-1.5">
              <span className="text-[11px] font-mono font-semibold text-emerald-300 uppercase tracking-wider">
                ENGINEERED SOLUTION
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Capabilities */}
          {project.keyCapabilities && project.keyCapabilities.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                VERIFIED CAPABILITIES
              </h3>
              <ul className="space-y-1.5">
                {project.keyCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="text-cyan-400 font-mono mt-0.5">•</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verified Architectural Attributes */}
          {project.attributes && project.attributes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                TECHNICAL ATTRIBUTES
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {project.attributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-[#14161E] border border-white/10 flex flex-col gap-1"
                  >
                    <span className="text-[9.5px] font-mono text-neutral-400 uppercase truncate">
                      {attr.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-white truncate">
                      {attr.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
              TECHNOLOGIES & TOOLS
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#181B24] border border-white/10 text-xs font-mono text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Verified Links */}
        <div className="p-4 px-6 border-t border-white/10 bg-[#12141A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors border border-white/10"
              >
                <Code2 size={14} className="text-cyan-400" />
                <span>GITHUB REPO</span>
                <ExternalLink size={12} className="text-neutral-400" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-mono transition-colors"
              >
                <span>LIVE DEMO</span>
                <ExternalLink size={12} className="text-cyan-400" />
              </a>
            )}
          </div>

          <button
            onClick={() => closeProjectModal()}
            className="text-xs font-mono text-neutral-400 hover:text-neutral-200 uppercase tracking-wider"
          >
            DISMISS [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
