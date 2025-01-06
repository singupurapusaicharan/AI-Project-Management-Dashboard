import { create } from 'zustand';
import { AIProject } from '@/lib/types';
import { useUserStore } from './user-store';
import { mockProjects } from '@/lib/data/mock-projects';

interface ProjectStore {
  projects: AIProject[];
  addProject: (project: Omit<AIProject, 'id' | 'timestamp' | 'user'>) => void;
  deleteProject: (id: string) => void;
  updateProjectsWithUser: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: mockProjects,
  
  addProject: (projectData) => set((state) => {
    const currentUser = useUserStore.getState().user;
    const newProject = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      user: {
        id: "1",
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar
      }
    };
    return { projects: [...state.projects, newProject] };
  }),

  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((project) => project.id !== id)
  })),

  updateProjectsWithUser: () => set((state) => {
    const currentUser = useUserStore.getState().user;
    return {
      projects: state.projects.map(project => ({
        ...project,
        user: {
          ...project.user,
          name: currentUser.name,
          email: currentUser.email,
          avatar: currentUser.avatar
        }
      }))
    };
  })
}));