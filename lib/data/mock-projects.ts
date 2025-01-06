import type { AIProject } from "@/lib/types";

export const mockProjects: AIProject[] = [
  {
    id: "1",
    name: "AI Image Generator",
    description: "A sophisticated AI model that generates high-quality images from text descriptions.",
    timestamp: "09:08 AM",
    status: "approved",
    budget: 15000,
    userId: "1",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png"
    }
  },
  {
    id: "2",
    name: "Natural Language Processor",
    description: "Advanced NLP model for text analysis and sentiment detection.",
    timestamp: "02:28 PM",
    status: "pending",
    budget: 8500,
    userId: "1",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png"
    }
  },
  {
    id: "3",
    name: "Speech Recognition Engine",
    description: "Real-time speech-to-text conversion system with multi-language support.",
    timestamp: "08:09 PM",
    status: "rejected",
    budget: 12000,
    userId: "1",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png"
    }
  }
];