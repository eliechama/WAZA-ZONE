import React, { createContext, useContext, useState } from 'react';
import { Project, Character, WorldBible, StoryPlan, Panel } from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_CHARACTERS,
  INITIAL_WORLD_BIBLE,
  INITIAL_STORY_PLAN,
  INITIAL_PANELS
} from '../lib/mockData';

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (p: Project) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  characters: Character[];
  addCharacter: (c: Character) => void;
  worldBible: WorldBible | null;
  setWorldBible: (wb: WorldBible) => void;
  storyPlan: StoryPlan | null;
  setStoryPlan: (sp: StoryPlan) => void;
  panels: Panel[];
  setPanels: (p: Panel[]) => void;
  createProject: (p: Partial<Project>) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project | null>(INITIAL_PROJECTS[0]);
  const [activeView, setActiveView] = useState<string>('cockpit');
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);
  const [worldBible, setWorldBible] = useState<WorldBible | null>(INITIAL_WORLD_BIBLE);
  const [storyPlan, setStoryPlan] = useState<StoryPlan | null>(INITIAL_STORY_PLAN);
  const [panels, setPanels] = useState<Panel[]>(INITIAL_PANELS);

  const addCharacter = (c: Character) => {
    setCharacters(prev => [c, ...prev]);
  };

  const createProject = (newP: Partial<Project>) => {
    const created: Project = {
      id: `proj-${Date.now()}`,
      title: newP.title || 'New Series',
      format: newP.format || 'MANGA',
      description: newP.description || 'Custom series generated in WAZA-ZONE',
      coverImage: newP.coverImage || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      status: 'IN_PROGRESS',
      episodesCount: 1,
      charactersCount: 1,
      lastModified: new Date().toISOString()
    };

    setProjects(prev => [created, ...prev]);
    setActiveProject(created);
    setActiveView('cast');
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setActiveProject,
        activeView,
        setActiveView,
        characters,
        addCharacter,
        worldBible,
        setWorldBible,
        storyPlan,
        setStoryPlan,
        panels,
        setPanels,
        createProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
};
