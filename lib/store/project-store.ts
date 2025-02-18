import { create } from 'zustand';
import { AIProject } from '@/lib/types';
import { useUserStore } from './user-store';
import axios from 'axios';

interface ProjectStore {
  projects: AIProject[];
  addProject: (project: Omit<AIProject, 'id' | 'timestamp' | 'user'>) => void;
  deleteProject: (id: string) => void;
  updateProjectsWithUser: () => void;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  
  fetchProjects: async () => {
    try {
      const currentUser = useUserStore.getState().user;
      const response = await axios.get(`http://localhost:5000/api/projects?userId=${currentUser.id}`);
      set({ projects: response.data });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  },

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
        id: currentUser.id,
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