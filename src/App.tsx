import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { AppLayout } from './components/layout/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { ProjectCockpit } from './pages/ProjectCockpit';
import { CastDNA } from './pages/CastDNA';
import { WorldBible } from './pages/WorldBible';
import { StoryArchitect } from './pages/StoryArchitect';
import { StoryboardView } from './pages/StoryboardView';
import { PanelEngine } from './pages/PanelEngine';
import { LocalizationView } from './pages/LocalizationView';
import { ExportPublish } from './pages/ExportPublish';
import { BillingPage } from './pages/BillingPage';
import { AdminConsole } from './pages/AdminConsole';
import { PublicReaderShowcase } from './pages/PublicReaderShowcase';

function MainAppContent() {
  const { activeView, setActiveView } = useProject();
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return (
      <LandingPage
        onEnterApp={() => setShowLanding(false)}
        onOpenReader={() => {
          setShowLanding(false);
          setActiveView('reader');
        }}
      />
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'projects':
      case 'cockpit':
        return <ProjectCockpit />;
      case 'cast':
        return <CastDNA />;
      case 'world':
        return <WorldBible />;
      case 'story':
        return <StoryArchitect />;
      case 'storyboard':
        return <StoryboardView />;
      case 'panel':
      case 'panels':
        return <PanelEngine />;
      case 'localization':
        return <LocalizationView />;
      case 'export':
        return <ExportPublish />;
      case 'reader':
        return <PublicReaderShowcase />;
      case 'billing':
        return <BillingPage />;
      case 'admin':
        return <AdminConsole />;
      default:
        return <ProjectCockpit />;
    }
  };

  return (
    <AppLayout onNavigateToLanding={() => setShowLanding(true)}>
      {renderActiveView()}
    </AppLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <MainAppContent />
      </ProjectProvider>
    </AuthProvider>
  );
}
