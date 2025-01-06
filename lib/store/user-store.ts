import { create } from 'zustand';

interface User {
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
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png"
  },
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),
  clearUser: () => set(() => ({
    user: {
      name: "",
      email: "",
      avatar: ""
    }
  }))
}));