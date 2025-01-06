# 🚀 AI Project Management Dashboard

A sophisticated, enterprise-grade dashboard designed to streamline the management of AI projects. Built with cutting-edge technologies and modern development practices.

---

## ✨ Key Features


- **🔐 Secure User Management**
  - Role-based access control (RBAC) for enhanced security.  
  - User profile customization and session management.  

- **💼 Project Administration** 
  - Streamlined project creation and management.  
  - Real-time status monitoring.   

- **🎯 Performance Optimized**  
  - Fast page loads with optimized bundle sizes.  
  - Responsive design for seamless use across devices.  
  - Smooth animations and lazy loading for enhanced user experience.  

---

## 🛠 Technology Stack

| **Category**         | **Technology**      |
|-----------------------|---------------------|
| Frontend Framework    | Next.js 13+         |
| UI Library            | React 18            |
| Type Safety           | TypeScript          |
| Styling               | Tailwind CSS        |
| State Management      | Zustand             |
| Animations            | Framer Motion       |

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/singupurapusaicharan/ui-assign-2.git
cd ui-assign-2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```plaintext
Directory structure:
└── ui-assign-2/                     # Root directory of the project
    ├── README.md                       # Project documentation and overview
    ├── components.json                 # Configuration for UI components (shadcn/ui)
    ├── next.config.js                  # Next.js configuration file
    ├── package.json                    # Project dependencies and scripts
    ├── postcss.config.js               # PostCSS configuration for Tailwind CSS
    ├── tailwind.config.ts              # Tailwind CSS configuration file
    ├── tsconfig.json                   # TypeScript configuration file
    ├── .eslintrc.json                  # ESLint configuration for code linting
    ├── app/                            # Next.js app directory (pages and layouts)
    │   ├── globals.css                 # Global CSS styles for the application
    │   ├── layout.tsx                  # Root layout component for the app
    │   ├── page.tsx                    # Home page (redirects to /dashboard)
    │   ├── dashboard/                  # Dashboard-related pages
    │   │   ├── layout.tsx              # Layout for the dashboard section
    │   │   ├── page.tsx                # Dashboard main page (AI Overview)
    │   │   ├── account/                # Account management section
    │   │   │   └── page.tsx            # Account settings and payment history page
    │   │   └── manage/                 # Project management section
    │   │       └── page.tsx            # Manage projects page (upload and list)
    │   └── login/                      # Login page
    │       └── page.tsx                # User login page
    ├── components/                     # Reusable React components
    │   ├── animations/                 # Animation-related components
    │   │   ├── fade-in.tsx             # Fade-in animation component
    │   │   ├── scale-in.tsx            # Scale-in animation component
    │   │   └── slide-in.tsx            # Slide-in animation component
    │   ├── dashboard/                  # Dashboard-specific components
    │   │   ├── project-table.tsx       # Table component for displaying projects
    │   │   ├── account/                # Account-related components
    │   │   │   ├── account-settings.tsx # Account settings form component
    │   │   │   └── payment-history.tsx # Payment history table component
    │   │   └── manage/                 # Project management components
    │   │       ├── project-list.tsx    # List of existing projects component
    │   │       └── project-upload.tsx  # Project upload form component
    │   ├── layout/                     # Layout-related components
    │   │   ├── logo.tsx                # Logo component with animations
    │   │   ├── sidebar.tsx             # Sidebar navigation component
    │   │   └── stars-background.tsx    # Animated stars background component
    │   └── ui/                         # Reusable UI components
    │       ├── avatar.tsx              # Avatar component for user profiles
    │       ├── badge.tsx               # Badge component for status indicators
    │       ├── button.tsx              # Custom button component
    │       ├── card.tsx                # Card component for content containers
    │       ├── input.tsx               # Input field component
    │       ├── label.tsx               # Label component for form inputs
    │       ├── logout-button.tsx       # Logout button with animations
    │       ├── table.tsx               # Table component for data display
    │       ├── textarea.tsx            # Textarea component for multi-line input
    │       ├── toast.tsx               # Toast notification component
    │       └── toaster.tsx             # Toaster component for managing toasts
    ├── hooks/                          # Custom React hooks
    │   └── use-toast.ts                # Hook for managing toast notifications
    └── lib/                            # Utility functions, types, and stores
        ├── types.ts                    # TypeScript type definitions
        ├── utils.ts                    # Utility functions (e.g., class name merging)
        ├── data/                       # Mock data for development
        │   └── mock-projects.ts        # Mock data for AI projects
        └── store/                      # Zustand state management stores
            ├── project-store.ts        # Store for managing project data
            └── user-store.ts           # Store for managing user data
```

---

## 🔧 Configuration

The application can be configured through environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_ENV=development
```

---


### **AI Dashboard Overview**

![WhatsApp Image 2025-01-06 at 09 50 02_124787fe](https://github.com/user-attachments/assets/d183657e-2f3e-4a80-bfba-02d85ab2d3f0)
Comprehensive view of the AI Dashboard with real-time analytics.

### **Project Management Interface**
![WhatsApp Image 2025-01-06 at 09 50 01_b6973a08](https://github.com/user-attachments/assets/d01316d8-8444-40a5-8022-967192df7dcd)
Efficient tools for managing AI projects and budgets.

### **Existing Projects Overview**
![WhatsApp Image 2025-01-06 at 09 50 02_c1675985](https://github.com/user-attachments/assets/c6875a1f-5619-44cb-9f7f-f5d5e94e756a)  
Detailed insights into existing projects and their status.

### **Account & Payment Management**
![WhatsApp Image 2025-01-06 at 09 50 03_4f478a90](https://github.com/user-attachments/assets/67ee3d44-ae8b-4d0b-b4f8-96c7268abfa5) 
Secure user account settings and payment tracking.

---


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/YourFeature
   ```
   
3. Commit your changes:  
   ```bash
   git commit -m 'Add some feature'
   ```
   
5. Push to the branch:  
   ```bash
   git push origin feature/YourFeature
   ```
   
6. Open a **Pull Request**.  

---

## 🎥 Demo

Check out the live demo of the project:  
👉 [View Demo](https://drive.google.com/file/d/1wMhVsEbIVeYaLc3UTbDg4DlNgmy5-D9U/view?usp=sharing)

---

## Acknowledgments

- **[Next.js](https://nextjs.org/)** - The React Framework.  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework.  
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management library.  
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library.   
