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
cd ui-assignment-2
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
└── singupurapusaicharan-ai-project-management-dashboard/  # Root directory of the project
    ├── README.md                                        # Project documentation and overview
    ├── components.json                                  # Configuration for UI components
    ├── next-env.d.ts                                    # TypeScript environment configurations for Next.js
    ├── next.config.js                                   # Next.js configuration file
    ├── package.json                                     # Project dependencies and scripts
    ├── postcss.config.js                                # PostCSS configuration for Tailwind CSS
    ├── tailwind.config.ts                               # Tailwind CSS configuration file
    ├── tsconfig.json                                    # TypeScript configuration file
    ├── .eslintrc.json                                   # ESLint configuration for code linting

    ├── app/                                            # Main application directory for Next.js
    │   ├── globals.css                                 # Global styles for the app
    │   ├── layout.tsx                                  # Root layout component for the app
    │   ├── page.tsx                                    # Home page (redirects to /dashboard)
    │   ├── dashboard/                                  # Dashboard pages and sections
    │   │   ├── layout.tsx                              # Layout for the dashboard
    │   │   ├── page.tsx                                # Dashboard main page (AI overview)
    │   │   ├── account/                                # Account management section
    │   │   │   └── page.tsx                            # Account settings and payment history page
    │   │   ├── insights/                               # Insights and analytics section
    │   │   │   └── [id]/                               # Dynamic route for specific insights
    │   │   │       └── page.tsx                        # Individual insight details page
    │   │   └── manage/                                 # Project management section
    │   │       └── page.tsx                            # Manage projects page (upload and list)
    │   ├── login/                                     # Login page
    │   │   └── page.tsx                               # User login page
    │   └── signup/                                    # Signup page
    │       └── page.tsx                               # User signup page

    ├── components/                                    # Reusable React components
    │   ├── animations/                               # Animation-related components
    │   │   ├── fade-in.tsx                          # Fade-in animation component
    │   │   ├── scale-in.tsx                         # Scale-in animation component
    │   │   └── slide-in.tsx                         # Slide-in animation component
    │   ├── dashboard/                               # Dashboard-specific components
    │   │   ├── project-table.tsx                    # Table component for displaying projects
    │   │   ├── account/                             # Account-related components
    │   │   │   ├── account-settings.tsx             # User account settings form
    │   │   │   └── payment-history.tsx              # Payment history table
    │   │   ├── insights/                            # Insights components
    │   │   │   ├── activity-logs.tsx                # Logs user activities
    │   │   │   ├── performance-metrics.tsx          # Displays performance metrics
    │   │   │   └── usage-statistics.tsx             # Shows project usage statistics
    │   │   ├── manage/                              # Project management components
    │   │   │   ├── project-list.tsx                 # List of existing projects
    │   │   │   └── project-upload.tsx               # Upload new projects form
    │   │   └── project-table/                       # Components for project tables
    │   │       ├── index.tsx                        # Main project table component
    │   │       ├── project-row.tsx                  # Individual project row
    │   │       └── status-buttons.tsx               # Buttons for project status updates
    │   ├── layout/                                 # Layout and UI structure components
    │   │   ├── logo.tsx                            # Logo component with animations
    │   │   ├── sidebar.tsx                         # Sidebar navigation component
    │   │   └── stars-background.tsx                # Animated background component
    │   └── ui/                                     # Reusable UI elements
    │       ├── accordion.tsx                       # Expandable accordion component
    │       ├── alert-dialog.tsx                    # Dialog box for alerts
    │       ├── alert.tsx                           # Simple alert component
    │       ├── aspect-ratio.tsx                    # Maintains aspect ratio for elements
    │       ├── avatar.tsx                          # User profile avatar
    │       ├── badge.tsx                           # Status indicator badge
    │       ├── breadcrumb.tsx                      # Breadcrumb navigation component
    │       ├── button.tsx                          # Custom button component
    │       ├── calendar.tsx                        # Calendar component for scheduling
    │       ├── card.tsx                            # Card component for content boxes
    │       ├── carousel.tsx                        # Image carousel component
    │       ├── chart.tsx                           # Chart component for data visualization
    │       ├── checkbox.tsx                        # Checkbox UI component
    │       ├── collapsible.tsx                     # Expand/collapse UI component
    │       ├── command.tsx                         # Command bar for user actions
    │       ├── context-menu.tsx                    # Context menu for right-click options
    │       ├── dialog.tsx                          # Dialog box component
    │       ├── drawer.tsx                          # Side drawer for UI elements
    │       ├── dropdown-menu.tsx                   # Dropdown menu component
    │       ├── form.tsx                            # Form component for user inputs
    │       ├── hover-card.tsx                      # Hover effect card component
    │       ├── input-otp.tsx                       # OTP input component
    │       ├── input.tsx                           # Input field component
    │       ├── label.tsx                           # Label for form fields
    │       ├── logout-button.tsx                   # Logout button
    │       ├── menubar.tsx                         # Menubar for navigation
    │       ├── navigation-menu.tsx                 # Navigation menu component
    │       ├── pagination.tsx                      # Pagination controls
    │       ├── popover.tsx                         # Popover UI component
    │       ├── progress.tsx                        # Progress bar component
    │       ├── radio-group.tsx                     # Radio button group
    │       ├── resizable.tsx                       # Resizable UI component
    │       ├── scroll-area.tsx                     # Scrollable content area
    │       ├── select.tsx                          # Select dropdown component
    │       ├── separator.tsx                       # UI separator line
    │       ├── sheet.tsx                           # Sheet-style UI component
    │       ├── skeleton.tsx                        # Skeleton loader for UI elements
    │       ├── slider.tsx                          # Slider component for input range
    │       ├── switch.tsx                          # Toggle switch
    │       ├── table.tsx                           # Table for displaying data
    │       ├── tabs.tsx                            # Tab navigation component
    │       ├── textarea.tsx                        # Multi-line input field
    │       ├── toast.tsx                           # Toast notifications
    │       ├── toaster.tsx                         # Toaster manager
    │       ├── toggle-group.tsx                    # Toggle button group
    │       ├── toggle.tsx                          # Toggle button
    │       └── tooltip.tsx                         # Tooltip component

    ├── hooks/                                     # Custom React hooks
    │   └── use-toast.ts                           # Hook for managing toast notifications

    ├── lib/                                       # Utility functions and state management
    │   ├── types.ts                               # Type definitions
    │   ├── utils.ts                               # Helper functions
    │   ├── data/                                  # Mock data for development
    │   │   └── mock-projects.ts                   # Mock project data
    │   └── store/                                 # State management using Zustand
    │       ├── project-store.ts                   # Store for managing project data
    │       └── user-store.ts                      # Store for managing user data

    ├── server/                                    # Backend server
    │   ├── server.js                              # Main server file
    │   ├── config/                                # Server configuration
    │   │   └── db.js                              # Database connection
    │   └── routes/                                # API routes
    │       ├── auth.js                            # Authentication routes
    │       └── projects.js                        # Project-related routes

    └── supabase/                                  # Supabase configuration for database
        └── migrations/                            # Database migrations
            └── 20250127143952_gentle_silence.sql  # SQL migration file


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
