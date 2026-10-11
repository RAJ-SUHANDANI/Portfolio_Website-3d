export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  approach: string;
  stack: string[];
  github: string;
  live?: string;
  features: string[];
  color: string;
};

export const profile = {
  name: "Raj Manish Suhandani",
  github: "https://github.com/RAJ-SUHANDANI",
  linkedin: "https://www.linkedin.com/in/raj-suhandani-a4a393321",
  email: "rajsuhandani11@gmail.com",
  location: "Bhavnagar, Gujarat, India"
};

export const projects: Project[] = [
  {
    slug: "veyra",
    name: "Veyra",
    category: "PRODUCTIVITY / INTERACTIVE 3D",
    summary: "Veyra is an interactive workspace for planning projects, tracking tasks and monitoring progress. It brings dashboards, client portals and a 3D Pulse visualization into one experience.",
    approach: "Explore project boards, workspace switching, analytics and client portals through a local demo. A Three.js Pulse display visualizes project signals calculated on the device, so visitors can try the experience without signing in or adding an API key.",
    stack: ["Next.js", "TypeScript", "React", "Three.js", "Recharts"],
    github: "https://github.com/RAJ-SUHANDANI/Veyra",
    live: "https://veyra-saas-ai.vercel.app",
    features: ["Workspace switching and task boards", "Interactive 3D Pulse visualization", "Dashboards and workload analytics", "Client portals and a local demo"],
    color: "#BEDAFF"
  },
  {
    slug: "savora",
    name: "Savora",
    category: "RESTAURANT / FULL STACK",
    summary: "Savora is a restaurant website with a seasonal menu, online reservations, customer accounts and a dedicated staff workspace.",
    approach: "Visitors can browse dishes, create reservations and explore customer and staff flows in demo mode. PostgreSQL prevents overlapping table reservations using a database exclusion constraint rather than relying only on interface validation.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    github: "https://github.com/RAJ-SUHANDANI/Savora",
    live: "https://savora-booking-engine.vercel.app",
    features: ["Guided reservation flow", "Database enforced booking protection", "Customer accounts and staff dashboard", "Menus and floor plan management"],
    color: "#E9BF97"
  },
  {
    slug: "pulsefit",
    name: "PulseFit",
    category: "FITNESS / DATA VISUALIZATION",
    summary: "PulseFit brings workout records, fitness goals, progress charts and habit tracking into one responsive training dashboard.",
    approach: "The platform combines workout logging, performance graphs, habits, streaks and goal setting. Recharts visualizes the data while GSAP and Motion support transitions between the dashboard views.",
    stack: ["Next.js", "Supabase", "GSAP", "Recharts"],
    github: "https://github.com/RAJ-SUHANDANI/PulseFit",
    live: "https://pulsefit-fitness.vercel.app",
    features: ["Workout logging and progress tracking", "Performance charts", "Habits, streaks and goals", "Responsive dashboard"],
    color: "#B8F2C3"
  },
  {
    slug: "vaultiq",
    name: "VaultIQ",
    category: "FINANCE / DASHBOARDS",
    summary: "VaultIQ is a personal finance application for tracking transactions, managing budgets, saving toward goals and exploring spending trends.",
    approach: "Transactions, spending categories, budgets and savings goals each have dedicated dashboard views. Supabase supports account access and persisted data. Recharts and subtle Three.js effects add visual clarity.",
    stack: ["Next.js", "TypeScript", "Supabase", "Three.js"],
    github: "https://github.com/RAJ-SUHANDANI/VaultIQ",
    live: "https://vaultiq-eight.vercel.app",
    features: ["Transaction and budget management", "Savings goals", "Supabase authentication", "Interactive charts and 3D visuals"],
    color: "#C6BEFF"
  },
  {
    slug: "gymspot",
    name: "GymSpot",
    category: "FITNESS / MARKETPLACE",
    summary: "GymSpot connects people looking for a gym with facilities they can discover, explore and compare.",
    approach: "The member experience makes facility discovery straightforward. Gym owners have tools for managing their listings, and a separate administration interface supports platform operations.",
    stack: ["React", "TypeScript", "Supabase", "Vite"],
    github: "https://github.com/RAJ-SUHANDANI/GymSpot",
    live: "https://gymspot-omega.vercel.app",
    features: ["Gym discovery and search", "Facility information", "Owner dashboard", "Administration tools"],
    color: "#FFD1B5"
  },
  {
    slug: "studynotion",
    name: "StudyNotion",
    category: "EDUCATION / CREATIVE FRONTEND",
    summary: "StudyNotion is an enhanced learning interface with a course catalog, enrollment flows, responsive layouts and interactive visual effects.",
    approach: "Built on an existing open source learning platform, the interface uses React Router and Redux Toolkit to organize navigation, shopping and enrollment state. Three.js and GSAP add motion without replacing core learning tasks.",
    stack: ["React", "Redux Toolkit", "Three.js", "GSAP"],
    github: "https://github.com/RAJ-SUHANDANI/StudyNotion",
    live: "https://studynotion-psi-three.vercel.app",
    features: ["Course catalog and filtering", "Cart and enrollment flows", "Redux Toolkit state management", "Three.js and GSAP animations"],
    color: "#D4E0FF"
  },
  {
    slug: "auditai",
    name: "AuditAI",
    category: "AI / DEVELOPER TOOLS",
    summary: "AuditAI is a development project exploring how AI assisted code review can be presented in a clear interface.",
    approach: "The repository currently contains a default Next.js README and does not document a public deployment. Visit GitHub to inspect the source and follow the project's progress.",
    stack: ["Next.js", "TypeScript", "Supabase", "Gemini API"],
    github: "https://github.com/RAJ-SUHANDANI/AuditAI",
    features: ["Next.js application structure", "Developer interface exploration", "React and TypeScript", "Source repository available"],
    color: "#F3D59A"
  }
];

export const experience = [
  {
    title: "Social Media Manager Intern",
    company: "Ocavior",
    date: "2026 to present (start month to confirm)",
    description: "Plan social media content and write copy for LinkedIn, Instagram and Facebook. Contribute to campaign ideas, visual storytelling and brand communication.",
    skills: ["Social media management", "Content planning", "Copywriting", "Brand communication"]
  },
  {
    title: "React.js Development Intern",
    company: "InfoLabz IT Services Pvt. Ltd.",
    date: "3 to 17 July 2026, Ahmedabad",
    description: "Completed a two week internship covering JavaScript ES6, React and API integration. Developed an application that uses API data.",
    skills: ["React.js", "JavaScript", "ES6", "API integration"]
  }
];

export const skillGroups = [
  {
    label: "FRONTEND & PRODUCT",
    text: "The details you notice, and the architecture behind them.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Responsive design", "Redux Toolkit"]
  },
  {
    label: "FULL STACK & DATA",
    text: "From intuitive interfaces to reliable underlying systems.",
    skills: ["Node.js", "PostgreSQL", "Prisma", "Supabase", "REST APIs", "Authentication", "Recharts"]
  },
  {
    label: "CREATIVE TECHNOLOGY",
    text: "Motion and dimensionality made meaningful.",
    skills: ["Three.js", "React Three Fiber", "GSAP", "Framer Motion", "3D interaction", "Digital storytelling"]
  },
  {
    label: "CONTENT & COLLABORATION",
    text: "Good ideas need clear communication as well as code.",
    skills: ["Social strategy", "Copywriting", "Content planning", "Brand communication", "Git", "GitHub", "Communication"]
  }
];
