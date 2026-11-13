
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
  previewType:"live"|"repository"|"illustration";
  previewNote:string;
};
const raw=(repo:string,file:string)=>`https://raw.githubusercontent.com/RAJ-SUHANDANI/${repo}/main/${file}`;
export const projectStories:Record<string,ProjectStory>={
  memeismine:{
    slug:"memeismine",number:"01",tagline:"The internet is your canvas.",statement:"FIND THE FORMAT. MAKE THE JOKE. SEND IT.",scope:"Free browser-based creative platform",discipline:"Media editing and full-stack product design",
    intro:"Meme Is Mine is a free creative studio for image and video memes. It brings template discovery, hands-on editing, export and a personal workspace together so creators can move from an idea to something ready to share.",
    problem:"Finding a recognizable meme format is easy until the moment passes between searching, editing and exporting. Creators need a fast, understandable place to make a visual joke their own without navigating a professional video-editing suite.",
    solution:"Meme Is Mine connects image and video libraries to actual editors for captions, layers and export. Verified accounts are handled through Appwrite, while drafts, bookmarks and collections are stored locally on the user's device with a backup option. Browsing is open; editing and Studio features require a free verified account.",
    deepDive:[
      {number:"01",title:"Find the right reaction",description:"Explore image templates, GIFs and video reactions before choosing a format to edit."},
      {number:"02",title:"Edit the joke",description:"Change captions, arrange layers, add overlays and inspect the result in the browser-based image and video workspaces."},
      {number:"03",title:"Export without a desktop editor",description:"Download created images and supported video formats directly from the browser, with clear limits for unsupported sources or formats."},
      {number:"04",title:"Return to the studio",description:"Organize local drafts, bookmarks and collections, and export a manual backup for work kept in the current browser."}
    ],
    decisions:[
      {title:"Real editing, not a fake demo",description:"Caption changes in the home-page example are connected to the actual image editor."},
      {title:"Honest local storage",description:"Drafts and collections live on the current device, while Appwrite provides accounts and account-associated template likes."},
      {title:"Resilient remote media",description:"Video previews use lazy loading and recovery logic, while exports report unsupported sources rather than pretending success."}
    ],
    screenshots:[{src:"/project-captures/memeismine-desktop.webp",alt:"Real screenshot of the Meme Is Mine website on desktop",label:"Desktop homepage"},{src:"/project-captures/memeismine-mobile.webp",alt:"Real screenshot of the Meme Is Mine website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },
  convotools:{
    slug:"convotools",number:"02",tagline:"A better desk for the everyday file.",statement:"A WHOLE LOT OF USEFUL. ZERO TAB HOPPING.",scope:"Browser-first file utility platform",discipline:"Client-side processing and product architecture",
    intro:"ConvoTools is a browser-based workspace for getting everyday file tasks done. A searchable catalog connects PDF, image, document, spreadsheet, presentation, media, archive and developer utilities under one understandable interface.",
    problem:"File conversion and cleanup often means finding and learning separate utilities for small jobs. The difficult product problem is bringing many formats, processing engines, constraints and output flows into a consistent experience.",
    solution:"ConvoTools organizes 42 tool entries across 10 categories, including four explicitly unavailable AI lab entries. Supported jobs run locally, with additional runtime engines loaded only when needed. A file desk suggests compatible operations, while an activity workspace keeps local metadata without building a cloud file library.",
    deepDive:[
      {number:"01",title:"Begin with a file",description:"Drop supported files into the file desk and choose a compatible action based on the format."},
      {number:"02",title:"Work across formats",description:"Use dedicated PDF, image, document, spreadsheet and media tools, each with task-specific input and output controls."},
      {number:"03",title:"Keep processing local",description:"Supported tools process content in the browser. Heavy conversion engines are deferred until a relevant operation starts."},
      {number:"04",title:"Make the limits clear",description:"The interface identifies unavailable AI tools, media size limits and document reconstruction limitations rather than claiming perfect conversion."}
    ],
    decisions:[
      {title:"One registry for many tools",description:"A typed catalog organizes categories, descriptions and routes across 42 named operations."},
      {title:"Load heavy engines on demand",description:"Browser conversion dependencies are deferred to reduce work required when first opening an ordinary tool page."},
      {title:"Verify actual file output",description:"The repository includes Playwright coverage for route navigation, mobile flows, and representative PDF and spreadsheet output correctness."}
    ],
    screenshots:[{src:"/project-captures/convotools-desktop.webp",alt:"Real screenshot of the ConvoTools website on desktop",label:"Desktop homepage"},{src:"/project-captures/convotools-mobile.webp",alt:"Real screenshot of the ConvoTools website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },

  veyra:{
    slug:"veyra",number:"03",tagline:"Make the work visible.",statement:"WORK THAT MOVES. CLARITY THAT LASTS.",scope:"Productivity platform",discipline:"3D interfaces and dashboards",
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
    screenshots:[{src:"/project-captures/veyra-desktop.webp",alt:"Real screenshot of the Veyra website on desktop",label:"Desktop homepage"},{src:"/project-captures/veyra-mobile.webp",alt:"Real screenshot of the Veyra website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },
  savora:{
    slug:"savora",number:"04",tagline:"Reservations, without the guesswork.",statement:"GOOD HOSPITALITY STARTS WITH A RELIABLE SYSTEM.",scope:"Restaurant booking platform",discipline:"Full stack and database design",
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
    screenshots:[{src:"/project-captures/savora-desktop.webp",alt:"Real screenshot of the Savora website on desktop",label:"Desktop homepage"},{src:"/project-captures/savora-mobile.webp",alt:"Real screenshot of the Savora website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },
  pulsefit:{
    slug:"pulsefit",number:"05",tagline:"Consistency made visible.",statement:"TRAIN WITH DATA. IMPROVE WITH INTENTION.",scope:"Fitness tracking dashboard",discipline:"Analytics and frontend engineering",
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
    screenshots:[{src:"/project-captures/pulsefit-desktop.webp",alt:"Real screenshot of the PulseFit website on desktop",label:"Desktop homepage"},{src:"/project-captures/pulsefit-mobile.webp",alt:"Real screenshot of the PulseFit website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },
  vaultiq:{
    slug:"vaultiq",number:"06",tagline:"A clearer picture of money.",statement:"A FINANCIAL OVERVIEW THAT MAKES SENSE.",scope:"Personal finance application",discipline:"Data, dashboards and creative coding",
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
    screenshots:[{src:"/project-captures/vaultiq-desktop.webp",alt:"Real screenshot of the VaultIQ website on desktop",label:"Desktop homepage"},{src:"/project-captures/vaultiq-mobile.webp",alt:"Real screenshot of the VaultIQ website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },
  gymspot:{
    slug:"gymspot",number:"07",tagline:"Find a place to train.",statement:"DISCOVERY SHOULD FEEL EFFORTLESS.",scope:"Gym discovery platform",discipline:"Marketplace interfaces and React",
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
    screenshots:[{src:"/project-captures/gymspot-desktop.webp",alt:"Real screenshot of the GymSpot website on desktop",label:"Desktop homepage"},{src:"/project-captures/gymspot-mobile.webp",alt:"Real screenshot of the GymSpot website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },
  studynotion:{
    slug:"studynotion",number:"08",tagline:"Learning, with room to explore.",statement:"A MORE INTERACTIVE WAY TO LEARN.",scope:"Learning management frontend",discipline:"React state and 3D motion",
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
    screenshots:[{src:"/project-captures/studynotion-desktop.webp",alt:"Real screenshot of the StudyNotion website on desktop",label:"Desktop homepage"},{src:"/project-captures/studynotion-mobile.webp",alt:"Real screenshot of the StudyNotion website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."
  },
  auditai:{
    slug:"auditai",number:"09",tagline:"Better interfaces through better feedback.",statement:"TURN SCREENSHOTS INTO ACTIONABLE DESIGN INSIGHTS.",scope:"AI interface analysis platform",discipline:"UX auditing and accessibility",
    intro:"AuditAI is a live interface analysis platform. Upload a screenshot of a website to evaluate visual hierarchy, accessibility, typography and conversion signals, then explore issues and recommendations in a visual report.",
    problem:"Finding usability problems in an interface takes a careful eye and structured evaluation. Designers and developers need specific, actionable feedback rather than vague assessments.",
    solution:"AuditAI combines a guided screenshot upload with Gemini powered analysis. It returns structured ratings for layout and accessibility, identifies issues with location markers, and organizes improvement recommendations for the interface.",
    deepDive:[
      {number:"01",title:"Upload an interface",description:"Provide a screenshot of a website or choose an example layout to start an audit."},
      {number:"02",title:"Analyze key signals",description:"The app assesses user experience, visual hierarchy, typography, contrast, accessibility and conversion related choices."},
      {number:"03",title:"Locate the issues",description:"The report describes problems and plots their locations over the submitted layout using percentage based annotations."},
      {number:"04",title:"Prioritize improvements",description:"The analysis provides structured recommendations, with impact and effort classifications, to guide next design iterations."}
    ],
    decisions:[
      {title:"Screenshot first workflow",description:"Users can provide a visual capture to evaluate without requiring access to a website's source code."},
      {title:"Structured analysis",description:"The audit uses a typed JSON response schema for ratings, issue details and recommendations."},
      {title:"Actionable presentation",description:"Annotations and grouped scores make it easier to connect suggestions to parts of the original interface."}
    ],
    screenshots:[{src:"/project-captures/auditai-desktop.webp",alt:"Real screenshot of the AuditAI website on desktop",label:"Desktop homepage"},{src:"/project-captures/auditai-mobile.webp",alt:"Real screenshot of the AuditAI website on mobile",label:"Mobile homepage"}],previewType:"live",previewNote:"These are real screenshots captured from the deployed site on 13 November 2026. They show the public homepage; some features may require an account or demo access."

  }
};
