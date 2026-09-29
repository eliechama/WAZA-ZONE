import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Badge } from '../components/common/Badge';
import { Download, Globe2, Lock, Eye, BookOpen, FileText, CheckCircle2, Loader2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const ExportPublish: React.FC = () => {
  const { activeProject, panels } = useProject();
  const [exportFormat, setExportFormat] = useState<'PDF' | 'CBZ' | 'PNG_ZIP' | 'WEBTOON_STRIP'>('PDF');
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [publicationMode, setPublicationMode] = useState<'PUBLIC' | 'UNLISTED' | 'PRIVATE'>('PUBLIC');

  // Reader mode state
  const [readerMode, setReaderMode] = useState<'PAGINATED' | 'WEBTOON_SCROLL'>('PAGINATED');
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const handleRunExport = () => {
    setExporting(true);
    setExportSuccess(null);

    setTimeout(() => {
      setExporting(false);
      setExportSuccess(`${activeProject?.title}_Episode_1.${exportFormat.toLowerCase()}`);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="lime">PUBLICATION & EXPORT OS</Badge>
            <span className="text-xs font-mono text-slate-400">• High-Res Vector Bundler</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Export & Public Reader Studio</h1>
          <p className="text-sm text-slate-400 mt-1">Package high-resolution print PDF, CBZ comic archives, or publish to the WAZA public reader.</p>
        </div>

        <button
          onClick={handleRunExport}
          disabled={exporting}
          className="px-5 py-3 rounded-xl bg-[#D8FF65] text-[#090A0F] font-extrabold text-sm hover:bg-[#cbf54f] shadow-lg shadow-[#D8FF65]/20 transition-all flex items-center justify-center gap-2"
        >
          {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          <span>{exporting ? 'Packaging Series Asset...' : `Export ${exportFormat}`}</span>
        </button>
      </div>

      {exportSuccess && (
        <div className="p-4 rounded-2xl bg-[#D8FF65]/10 border border-[#D8FF65]/40 text-xs font-mono text-[#D8FF65] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#D8FF65]" />
            <span>EXPORTS READY: {exportSuccess} (300 DPI High-Res Print Quality)</span>
          </div>
          <button className="underline font-bold">Download File</button>
        </div>
      )}

      {/* Export Options & Reader Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Export Controls */}
        <div className="space-y-6">
          <div className="bg-[#11131A] p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-[#D8FF65] font-bold uppercase tracking-wider">EXPORT FORMATS</div>

            <div className="space-y-2">
              {[
                { id: 'PDF', label: 'PDF Book Format', desc: 'Standard 300 DPI vector pages' },
                { id: 'CBZ', label: 'CBZ Archive', desc: 'ComicBook Zip for tablet e-readers' },
                { id: 'PNG_ZIP', label: 'PNG Image Bundle', desc: 'Raw lossless panel files' },
                { id: 'WEBTOON_STRIP', label: 'Webtoon Vertical Strip', desc: 'Seamless long vertical image' }
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => setExportFormat(fmt.id as any)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    exportFormat === fmt.id
                      ? 'border-[#D8FF65] bg-[#D8FF65]/10 text-white'
                      : 'border-slate-800 bg-[#090A0F] text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{fmt.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{fmt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#11131A] p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-[#68E7FF] font-bold uppercase tracking-wider">PUBLICATION VISIBILITY</div>

            <div className="space-y-2">
              {[
                { id: 'PUBLIC', label: 'Public (Global Gallery)', icon: Globe2 },
                { id: 'UNLISTED', label: 'Unlisted (Shared via Link)', icon: Eye },
                { id: 'PRIVATE', label: 'Private (Workspace Only)', icon: Lock }
              ].map((m) => {
                const Icon = m.icon;
                const isSel = publicationMode === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setPublicationMode(m.id as any)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSel
                        ? 'border-[#68E7FF] bg-[#68E7FF]/10 text-white'
                        : 'border-slate-800 bg-[#090A0F] text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Icon className="w-4 h-4 text-[#68E7FF]" />
                      <span>{m.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Reader Box */}
        <div className="lg:col-span-2 space-y-4 bg-[#11131A] p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D8FF65]" />
              <h3 className="text-lg font-bold text-white">Interactive Series Reader</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setReaderMode('PAGINATED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  readerMode === 'PAGINATED' ? 'bg-[#D8FF65] text-[#090A0F] font-bold' : 'bg-[#090A0F] text-slate-400'
                }`}
              >
                Paginated
              </button>
              <button
                onClick={() => setReaderMode('WEBTOON_SCROLL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  readerMode === 'WEBTOON_SCROLL' ? 'bg-[#D8FF65] text-[#090A0F] font-bold' : 'bg-[#090A0F] text-slate-400'
                }`}
              >
                Webtoon Scroll
              </button>
            </div>
          </div>

          {/* Reader Canvas */}
          {readerMode === 'PAGINATED' ? (
            <div className="space-y-4">
              <div className="relative bg-[#090A0F] rounded-2xl border border-slate-800 p-4 h-[420px] flex items-center justify-center overflow-hidden">
                {panels[currentPanelIndex]?.imageUrl && (
                  <img
                    src={panels[currentPanelIndex].imageUrl}
                    alt={`Panel ${currentPanelIndex + 1}`}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
                  />
                )}
              </div>

              <div className="flex items-center justify-between px-4">
                <button
                  onClick={() => setCurrentPanelIndex(Math.max(0, currentPanelIndex - 1))}
                  disabled={currentPanelIndex === 0}
                  className="px-4 py-2 rounded-xl bg-[#090A0F] border border-slate-800 text-xs font-mono text-white disabled:opacity-30 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Panel</span>
                </button>

                <span className="text-xs font-mono text-slate-400">
                  Panel {currentPanelIndex + 1} of {panels.length}
                </span>

                <button
                  onClick={() => setCurrentPanelIndex(Math.min(panels.length - 1, currentPanelIndex + 1))}
                  disabled={currentPanelIndex === panels.length - 1}
                  className="px-4 py-2 rounded-xl bg-[#090A0F] border border-slate-800 text-xs font-mono text-white disabled:opacity-30 flex items-center gap-2"
                >
                  <span>Next Panel</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="max-h-[500px] overflow-y-auto space-y-4 p-4 bg-[#090A0F] rounded-2xl border border-slate-800 custom-scrollbar">
              {panels.map((p) => (
                <div key={p.id} className="max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                  {p.imageUrl && <img src={p.imageUrl} alt={`Panel ${p.sequence}`} className="w-full h-auto" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
