import React from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  FolderKanban,
  Users,
  Globe2,
  FileText,
  Camera,
  LayoutGrid,
  Languages,
  Download,
  BookOpen,
  CreditCard,
  UserCheck,
  Activity,
  Settings,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useProject();

  const flowNavItems = [
    { id: 'projects', label: '1. Projects & Cockpit', icon: FolderKanban },
    { id: 'cast', label: '2. Cast & Character DNA', icon: Users },
    { id: 'world', label: '3. World Bible & Canon', icon: Globe2 },
    { id: 'story', label: '4. Story Architect', icon: FileText },
    { id: 'storyboard', label: '5. Storyboard & Camera', icon: Camera },
    { id: 'panel', label: '6. Panel Engine & Layout', icon: LayoutGrid },
    { id: 'localization', label: '7. Localization', icon: Languages },
    { id: 'export', label: '8. Export & Publications', icon: Download },
    { id: 'reader', label: '9. Public Reader & Showcase', icon: BookOpen },
  ];

  const infraNavItems = [
    { id: 'billing', label: 'Credit Ledger', icon: CreditCard, badge: '4.8k CR' },
    { id: 'team', label: 'Team & RLS Roles', icon: UserCheck },
    { id: 'telemetry', label: 'Telemetry & Logs', icon: Activity, live: true },
    { id: 'admin', label: 'Platform SRE Console', icon: ShieldCheck, badge: 'ADMIN' },
    { id: 'settings', label: 'Settings & AI Gateway', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#090A0F] border-r border-[#1E2230] flex flex-col justify-between h-[calc(100vh-3.5rem)] sticky top-14 select-none shrink-0 text-xs">
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* Creative Engine Flow */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              Creative Engine Flow
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D8FF65]"></span>
          </div>

          <nav className="space-y-1">
            {flowNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const isReaderActive = isActive && item.id === 'reader';
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-sans text-[13px] font-medium transition-all text-left cursor-pointer ${
                    isReaderActive
                      ? 'bg-[#9D78FF] text-white font-bold rounded-lg shadow-lg shadow-[#9D78FF]/30'
                      : isActive
                      ? 'bg-[#11131A] text-[#D8FF65] border-l-2 border-[#D8FF65] shadow-lg shadow-[#D8FF65]/5 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#11131A]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isReaderActive ? 'text-white' : isActive ? 'text-[#D8FF65]' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Studio Infrastructure */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              Studio Infrastructure
            </span>
            <Cpu className="w-3 h-3 text-slate-600" />
          </div>

          <nav className="space-y-1">
            {infraNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-sans text-[12px] font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#11131A] text-[#68E7FF] border-l-2 border-[#68E7FF]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#11131A]/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#68E7FF]' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        item.badge === 'ADMIN'
                          ? 'bg-[#9D78FF]/20 text-[#9D78FF] border border-[#9D78FF]/40'
                          : 'bg-[#1E2230] text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.live && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-[#1E2230] bg-[#090A0F] font-mono text-[10px] text-slate-500 space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>ENGINE CORE</span>
          </span>
          <span className="text-[#D8FF65]">ONLINE</span>
        </div>
        <div className="text-slate-600">Docker: waza-core:v1.2.0 • RLS: 22/22</div>
      </div>
    </aside>
  );
};
