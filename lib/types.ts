export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AIProject {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  status: 'approved' | 'rejected' | 'pending';
  budget: number;
  userId: string;
  user: User;
}

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: string;
}