# 🚀 AI Project Management Dashboard

A sophisticated, enterprise-grade dashboard designed to streamline the management of AI projects. Built with cutting-edge technologies and modern development practices.

---

## ✨ Key Features


- **🔐 Secure User Management**
  - Role-based access control for enhanced security.  
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
| Database              | MySQL               |

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/singupurapusaicharan/AI-Project-Management-Dashboard.git
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
singupurapusaicharan-ai-project-management-dashboard/
├── README.md                           # Project overview and instructions
├── components.json                     # Likely lists reusable components
├── dash_conn.session.sql               # SQL session data for database connection (possibly Postgres or MySQL)
├── next-env.d.ts                       # TypeScript environment settings for Next.js
├── next.config.js                      # Next.js configuration file
├── package.json                        # Project metadata and dependencies
├── postcss.config.js                   # PostCSS configuration (used with Tailwind)
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript compiler configuration
├── .eslintrc.json                      # ESLint configuration for code linting
├── app/                                # Application routing and layout (Next.js app directory)
│   ├── globals.css                     # Global CSS styles
│   ├── layout.tsx                      # Root layout component for all pages
│   ├── page.tsx                        # Root page (likely the home page)
│   ├── dashboard/                      # Dashboard-related pages and layout
│   │   ├── layout.tsx                  # Layout wrapper for dashboard routes
│   │   ├── page.tsx                    # Main dashboard landing page
│   │   ├── account/                    # User account management
│   │   │   └── page.tsx                # Account settings page
│   │   └── manage/                     # Project management area
│   │       └── page.tsx                # Project management main page
│   ├── login/                          # Login page
│   │   └── page.tsx
│   └── signup/                         # Signup page
│       └── page.tsx
├── components/                         # Reusable UI and feature components
│   ├── animations/                     # Animation wrappers (e.g., fade, scale, slide)
│   │   ├── fade-in.tsx
│   │   ├── scale-in.tsx
│   │   └── slide-in.tsx
│   ├── dashboard/                      # Dashboard-specific components
│   │   ├── project-table.tsx           # Table displaying list of projects
│   │   ├── account/                    # Account-related UI
│   │   │   ├── account-settings.tsx
│   │   │   └── payment-history.tsx
│   │   ├── insights/                   # Dashboard insights like logs, metrics
│   │   │   ├── activity-logs.tsx
│   │   │   ├── performance-metrics.tsx
│   │   │   └── usage-statistics.tsx
│   │   ├── manage/                     # Project management UI
│   │   │   ├── project-list.tsx
│   │   │   └── project-upload.tsx
│   │   └── project-table/              # Sub-components of project table
│   │       ├── index.tsx
│   │       ├── project-row.tsx
│   │       └── status-buttons.tsx
│   ├── layout/                         # Layout-related components
│   │   ├── logo.tsx
│   │   ├── sidebar.tsx
│   │   └── stars-background.tsx
│   └── ui/                             # Generic reusable UI components (buttons, forms, etc.)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── logout-button.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-toast.ts                    # Custom hook to trigger toast notifications
├── lib/                                # Helper functions and shared utilities
│   ├── types.ts                        # TypeScript type definitions
│   ├── utils.ts                        # Utility functions
│   ├── data/                           # Mock or seed data
│   │   └── mock-projects.ts
│   └── store/                          # App-wide state management (possibly with Zustand or Redux)
│       ├── project-store.ts
│       └── user-store.ts
└── server/                             # Backend server-side code (Node.js/Express)
    ├── server.js                       # Main server file
    ├── config/
    │   └── db.js                       # Database configuration (likely MongoDB)
    └── routes/                         # Express route definitions
        ├── auth.js                     # Authentication routes (login/signup)
        └── projects.js                 # Routes for handling project data



```

---

## 🔧 Configuration

The application can be configured through environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_ENV=development
DB_HOST=your_hostname
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_databse_name
PORT=5000
```

---

### **Authentication**

![{861D2EB5-F201-4CEB-A2B7-86E4E82C08AF}](https://github.com/user-attachments/assets/35080784-c2d8-444b-a551-c7d608172a95)
Authentication before entering into the website.

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
👉 [View Demo](https://drive.google.com/file/d/1KCQu0O7c8ZDlj6dVhZvhs4WdEKuWzNQl/view?usp=sharing)

---

## Acknowledgments

- **[Next.js](https://nextjs.org/)** - The React Framework.  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework.  
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management library.  
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library.   
