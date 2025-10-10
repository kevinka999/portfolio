export type Experience = {
  id: number;
  title: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
};

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Flash",
    role: "Software Engineer",
    period: "Nov 2022 – Present",
    description:
      "Developed and maintained a modular HR platform using Micro-Frontend architecture. Responsible for the recruitment and offboarding module, working with both frontend and backend services at scale.",
    tags: [
      "React",
      "TypeScript",
      "TRPC",
      "GraphQL",
      "Node.js",
      "NestJS",
      "MongoDB",
      "Kafka",
      "AWS",
      "Microservices",
    ],
  },
  {
    id: 2,
    title: "Contractor",
    role: "Software Engineer",
    period: "Nov 2021 – Nov 2022",
    description:
      "Worked on MVPs for Real Estate and Cosmetics web applications. Built hybrid apps using React and Ionic, integrating AWS services and third-party APIs.",
    tags: [
      "React",
      "TypeScript",
      "Ionic",
      "AWS",
      "GraphQL",
      "REST",
      "API Integration",
    ],
  },
  {
    id: 3,
    title: "Stefanini Brasil",
    role: "Software Engineer",
    period: "May 2021 – Nov 2021",
    description:
      "Contributed to internal Dell sales platform using React and .NET Core. Focused on frontend testing, clean architecture, and feature delivery in an Agile team.",
    tags: [
      "React",
      "TypeScript",
      "Redux",
      ".NET Core",
      "GraphQL",
      "REST",
      "Jest",
      "Cypress",
      "XUnit",
      "Agile",
    ],
  },
  {
    id: 4,
    title: "Benner",
    role: "Software Engineer",
    period: "Aug 2020 – May 2021",
    description:
      "Developed features for a logistics platform with Vue.js and .NET Core. Focused on internal tools and CRUD interfaces using PostgreSQL.",
    tags: ["Vue.js", ".NET Core", "PostgreSQL", "Frontend", "Backend"],
  },
  {
    id: 5,
    title: "Custom IT Sistemas",
    role: "Software Engineer",
    period: "May 2019 – Aug 2020",
    description:
      "Built and maintained custom web apps for clients using .NET and jQuery. Involved in setup, development, and ongoing support.",
    tags: [
      ".NET Framework",
      ".NET Core",
      "jQuery",
      "Vue.js",
      "MySQL",
      "SQL Server",
    ],
  },
  {
    id: 6,
    title: "WorkDB Data Business",
    role: "Software Engineer",
    period: "Apr 2018 – Jul 2018",
    description:
      "Developed chatbot features by integrating public AI APIs into Django-based platforms.",
    tags: ["Python", "Django", "AI APIs", "Chatbot"],
  },
];
