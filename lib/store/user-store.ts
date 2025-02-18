import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UserStore {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    avatar: ""
  },
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),
  clearUser: () => set(() => ({
    user: {
      id: "",
      name: "",
      email: "",
      avatar: ""
    }
  }))
}));