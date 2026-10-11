
export type ProjectShot = {src:string;alt:string;label:string};
export type ProjectStory = {
  slug:string;
  number:string;
  tagline:string;
  statement:string;
  scope:string;
  discipline:string;
  intro:string;
  problem:string;
  solution:string;
  deepDive:{number:string;title:string;description:string}[];
  decisions:{title:string;description:string}[];
  screenshots:ProjectShot[];
  previewType:"repository"|"illustration";
  previewNote:string;
};
const raw=(repo:string,file:string)=>`https://raw.githubusercontent.com/RAJ-SUHANDANI/${repo}/main/${file}`;
export const projectStories:Record<string,ProjectStory>={
  veyra:{
    slug:"veyra",number:"01",tagline:"Make the work visible.",statement:"WORK THAT MOVES. CLARITY THAT LASTS.",scope:"Productivity platform",discipline:"3D interfaces and dashboards",
    intro:"Veyra brings multiple aspects of project delivery into one interface, from task boards and workload views to client portals. The experience combines familiar management tools with a visual language built around spatial feedback.",
    problem:"Project information is often scattered between task lists, status reports and messages. Veyra explores a workspace in which the important signals sit alongside the work itself.",
    solution:"A unified dashboard brings task management, analytics, project context and client facing views together. An interactive Pulse visualization uses calculated workspace signals to make project health more tangible. The documented demo runs locally on the device without requiring an AI service.",
    deepDive:[
      {number:"01",title:"Workspace switching",description:"Switch between distinct workspaces with the interface, task boards and charts responding to the current context."},
      {number:"02",title:"Visual project health",description:"The Three.js Pulse orb gives the project overview an interactive center and reflects computed health indicators."},
      {number:"03",title:"Dashboards and charts",description:"Recharts supports analytics and productivity views alongside project tasks and team information."},
      {number:"04",title:"Client portal",description:"A responsive, read only view presents relevant project information to clients without exposing the main workspace."}
    ],
    decisions:[
      {title:"Purposeful 3D",description:"The Pulse visualization is tied to project data rather than functioning as a decorative animation."},
      {title:"Local demo mode",description:"Visitors can explore the application without a backend account or API key."},
      {title:"Structured state",description:"Workspace selection and dashboards share context so the interface stays consistent."}
    ],
    screenshots:[
      {src:raw("Veyra","screenshots/01-home-hero.png"),alt:"Veyra landing page screenshot from the project repository",label:"The introduction"},
      {src:raw("Veyra","screenshots/03-dashboard-overview.png"),alt:"Veyra workspace dashboard screenshot",label:"The workspace"},
      {src:raw("Veyra","screenshots/05-pulse.png"),alt:"Veyra 3D Pulse feature screenshot",label:"The Pulse"}
    ],previewType:"repository",previewNote:"Interface screenshots sourced from the Veyra GitHub repository."
  },
  savora:{
    slug:"savora",number:"02",tagline:"Reservations, without the guesswork.",statement:"GOOD HOSPITALITY STARTS WITH A RELIABLE SYSTEM.",scope:"Restaurant booking platform",discipline:"Full stack and database design",
    intro:"Savora is a restaurant website with an online menu, guided bookings, customer accounts and staff tools. Its defining feature lives in the database: reservation conflicts are prevented where the data is stored.",
    problem:"Booking systems should not allow the same table to be reserved by different parties for overlapping time slots. Checking availability only in the browser leaves room for conflicting requests.",
    solution:"Savora uses PostgreSQL exclusion constraints to enforce a rule against overlapping reservations. A guided booking flow introduces the experience to customers while the staff dashboard helps manage the floor plan and sittings. The live demo runs with seeded data.",
    deepDive:[
      {number:"01",title:"Discover the menu",description:"A seasonal menu leads into individual dish details and supports a complete restaurant browsing experience."},
      {number:"02",title:"Reserve a table",description:"Customers move through a guided booking sequence that brings together availability, selection and confirmation."},
      {number:"03",title:"Protect each reservation",description:"PostgreSQL checks conflicting time ranges at the database level, safeguarding bookings even under concurrent requests."},
      {number:"04",title:"Run service",description:"Staff views show reservations and table information for the restaurant's sittings."}
    ],
    decisions:[
      {title:"Database first integrity",description:"Enforce booking conflicts through a PostgreSQL constraint rather than trusting a frontend check."},
      {title:"Demo without setup",description:"The documentation describes a seeded demo with PostgreSQL running inside the process."},
      {title:"Distinct account roles",description:"Customer and staff flows are separated so each type of user sees relevant actions."}
    ],
    screenshots:[
      {src:raw("Savora","docs/screenshots/01-home-desktop.jpg"),alt:"Savora restaurant homepage screenshot from GitHub",label:"The restaurant"},
      {src:raw("Savora","docs/screenshots/03-menu-desktop.jpg"),alt:"Savora menu desktop screenshot",label:"The menu"},
      {src:raw("Savora","docs/screenshots/05-reserve-desktop.jpg"),alt:"Savora reservation workflow screenshot",label:"The reservation"}
    ],previewType:"repository",previewNote:"Interface screenshots sourced from the Savora GitHub repository."
  },
  pulsefit:{
    slug:"pulsefit",number:"03",tagline:"Consistency made visible.",statement:"TRAIN WITH DATA. IMPROVE WITH INTENTION.",scope:"Fitness tracking dashboard",discipline:"Analytics and frontend engineering",
    intro:"PulseFit puts daily training activity, longer term fitness goals and progress analytics into one personal dashboard. The interface is designed around recording effort and understanding results.",
    problem:"Training history is only useful when it is easy to capture and review. Fragmented notes and disconnected goals make it harder to see what is working.",
    solution:"Workout logging, progress charts, goals, habit streaks and achievement features are organized into a responsive experience. Recharts makes trends easier to read and the interface uses motion to guide attention.",
    deepDive:[
      {number:"01",title:"Log a workout",description:"Record sets, repetitions, weight and workout duration through a dedicated training interface."},
      {number:"02",title:"See progress",description:"Bar, line and pie charts present performance trends and fitness metrics."},
      {number:"03",title:"Build habits",description:"Goal setting and streak tracking connect individual sessions to consistent routines."},
      {number:"04",title:"Use it anywhere",description:"Responsive dashboard layouts adapt to phones, tablets and larger displays."}
    ],
    decisions:[
      {title:"Readable analytics",description:"Use Recharts to make performance data interpretable rather than relying on raw numbers."},
      {title:"One connected dashboard",description:"Workouts, recovery, goals and achievements belong together in the product navigation."},
      {title:"Controlled animation",description:"GSAP and Motion enhance state transitions without replacing the underlying data views."}
    ],
    screenshots:[],previewType:"illustration",previewNote:"The laptop contains an illustrative interface based on documented features. Visit the live app to see the actual UI."
  },
  vaultiq:{
    slug:"vaultiq",number:"04",tagline:"A clearer picture of money.",statement:"A FINANCIAL OVERVIEW THAT MAKES SENSE.",scope:"Personal finance application",discipline:"Data, dashboards and creative coding",
    intro:"VaultIQ combines expense tracking, transaction history, budgets, goals and analytics in an organized personal finance workspace. It gives common money management tasks a coherent interface.",
    problem:"A list of individual transactions is not enough to understand spending. People also need context around categories, budgets and future goals.",
    solution:"VaultIQ brings transaction management, spending breakdowns, budgets and savings goals together. Supabase powers account and data workflows. Charts and restrained 3D accents help present the financial information.",
    deepDive:[
      {number:"01",title:"Understand transactions",description:"Review and manage spending records with transaction and category views."},
      {number:"02",title:"Control a budget",description:"Track limits against spending through budget and progress interfaces."},
      {number:"03",title:"Plan savings",description:"Create goals and follow progress toward personal targets."},
      {number:"04",title:"Read the trends",description:"Recharts visualizes spending over time and breakdowns across categories."}
    ],
    decisions:[
      {title:"Authenticated data",description:"Supabase provides the account layer and persisted data for the application."},
      {title:"Useful visualization",description:"Financial charts make trends legible and the additional 3D elements stay secondary."},
      {title:"Responsive structure",description:"Dashboard cards and analytics remain accessible across screen sizes."}
    ],
    screenshots:[],previewType:"illustration",previewNote:"The laptop contains an illustrative interface based on documented features. Visit the live app to see the actual UI."
  },
  gymspot:{
    slug:"gymspot",number:"05",tagline:"Find a place to train.",statement:"DISCOVERY SHOULD FEEL EFFORTLESS.",scope:"Gym discovery platform",discipline:"Marketplace interfaces and React",
    intro:"GymSpot connects people who want to train with facilities they can browse and compare. Separate experiences support members, gym owners and administrators.",
    problem:"Choosing a gym can mean switching between disconnected listings and searching for details that should be easy to compare.",
    solution:"An approachable React discovery flow presents gym information, while dedicated owner and admin tools support the people managing the listings and overall platform.",
    deepDive:[
      {number:"01",title:"Explore gyms",description:"Discover nearby facilities and review the details needed to make an informed choice."},
      {number:"02",title:"Compare facilities",description:"A member focused layout supports evaluating gyms without navigating through unrelated screens."},
      {number:"03",title:"Manage listings",description:"Owners have a dedicated interface for managing facility information."},
      {number:"04",title:"Operate the platform",description:"Administrative tools provide a separate space for managing users and activity."}
    ],
    decisions:[
      {title:"Audience specific screens",description:"Members, gym owners and administrators each get workflows relevant to their responsibilities."},
      {title:"React application structure",description:"React, TypeScript, Vite and Supabase form the documented application stack."},
      {title:"Responsive discovery",description:"The experience is designed for smaller screens as well as desktops."}
    ],
    screenshots:[],previewType:"illustration",previewNote:"The laptop contains an illustrative interface based on documented features. Visit the live app to see the actual UI."
  },
  studynotion:{
    slug:"studynotion",number:"06",tagline:"Learning, with room to explore.",statement:"A MORE INTERACTIVE WAY TO LEARN.",scope:"Learning management frontend",discipline:"React state and 3D motion",
    intro:"StudyNotion enhances an existing open source learning platform with an updated responsive interface, course discovery, enrollment flows and more expressive interactions.",
    problem:"Course catalogs can feel overwhelming when browsing, adding courses and enrolling do not flow together. The interface needs to be easy to understand even as features grow.",
    solution:"React Router organizes navigation and Redux Toolkit keeps shared catalog and enrollment state predictable. Three.js and GSAP add measured depth and movement to the experience.",
    deepDive:[
      {number:"01",title:"Find a course",description:"Browse the catalog by category and explore course details and learning paths."},
      {number:"02",title:"Build a cart",description:"Course selection and enrollment flows share state through Redux Toolkit."},
      {number:"03",title:"Add spatial detail",description:"Three.js brings depth to the visual presentation of the learning experience."},
      {number:"04",title:"Animate with purpose",description:"GSAP supports motion across cards, sections and transitions."}
    ],
    decisions:[
      {title:"Build on open source",description:"The project is documented as an enhancement of an existing learning management platform."},
      {title:"Predictable shared state",description:"Redux Toolkit keeps enrollment and cart behavior coordinated across the interface."},
      {title:"Motion that supports learning",description:"Interactive effects enhance the product while leaving the learning tasks easy to use."}
    ],
    screenshots:[
      {src:raw("StudyNotion","images/mainpage.png"),alt:"StudyNotion main application screenshot from the repository",label:"The learning interface"},
      {src:raw("StudyNotion","images/architecture.png"),alt:"StudyNotion architecture diagram from the repository",label:"The structure"}
    ],previewType:"repository",previewNote:"Interface screenshot and architecture diagram sourced from the StudyNotion GitHub repository."
  },
  auditai:{
    slug:"auditai",number:"07",tagline:"Exploring smarter developer tools.",statement:"MAKE CODE REVIEW EASIER TO UNDERSTAND.",scope:"Developer tool experiment",discipline:"Next.js and AI exploration",
    intro:"AuditAI is a code review interface experiment in the GitHub portfolio. Its intended focus is to bring software analysis into a clearer developer experience.",
    problem:"Code analysis can produce information that is difficult to prioritize without clear categories, context and an organized presentation.",
    solution:"The repository explores a Next.js and TypeScript starting point for a code review workflow. Its current README is a default framework starter, so further feature details and a live deployment cannot yet be independently verified.",
    deepDive:[
      {number:"01",title:"Developer experience",description:"The project explores the presentation of code review information in a developer focused interface."},
      {number:"02",title:"Modern application stack",description:"The portfolio documents an intended Next.js and TypeScript based implementation."},
      {number:"03",title:"AI integration direction",description:"The project scope includes Gemini related tooling, but exact working capabilities are not documented in its README."},
      {number:"04",title:"Open source access",description:"The GitHub repository is available to inspect the actual implementation and its progress."}
    ],
    decisions:[
      {title:"Show verified progress",description:"The case study distinguishes intended features from confirmed functionality."},
      {title:"Source first",description:"A GitHub action replaces the unavailable live demo so no nonworking deployment is advertised."},
      {title:"Room to evolve",description:"The project page can expand as implementation and documentation become available."}
    ],
    screenshots:[],previewType:"illustration",previewNote:"This is an illustrative developer interface. No live AuditAI deployment is documented."
  }
};
