export type Experience = {
  id: number;
  company: string;
  period: string;
  overview: string;
  highlights: string[];
  externalSource?: string;
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Flash",
    period: "NOV/2022 - PRESENT",
    externalSource:
      "https://www.linkedin.com/company/meuflash/posts/?feedView=all",
    overview:
      "I work on an HRMS platform built with a microfrontend architecture, contributing across both frontend and backend layers of the product.",
    highlights: [
      "Development of microfrontends using React and TypeScript.",
      "Development of microservices using Node.js and NestJS.",
      "Backend-for-Frontend layer using TRPC and GraphQL.",
      "Event-driven communication between microservices using Kafka.",
      "Cloud infrastructure and deployment.",
    ],
  },
  {
    id: 2,
    company: "Independent Contractor",
    period: "NOV/2021 - NOV/2022",
    overview:
      "I worked on web applications in the Real Estate and Cosmetics industries, contributing not only to implementation but also to product and business decisions.",
    highlights: [
      "Frontend development using React and TypeScript.",
      "Hybrid mobile and web app development using Ionic Framework.",
      "AWS integrations, including authentication with Cognito.",
      "Third-party API integrations across different products.",
      "Contribution to architecture and product decisions aligned with business and investor goals.",
    ],
  },
  {
    id: 3,
    company: "Stefanini Brasil",
    period: "MAI/2021 - NOV/2021",
    externalSource:
      "https://www.linkedin.com/company/stefanini-brasil/posts/?feedView=all",
    overview:
      "I contributed to the development and maintenance of an internal sales platform in a cross-functional Agile team, delivering features connected to real business needs.",
    highlights: [
      "Frontend development using React, TypeScript, and Redux.",
      "Backend development using .NET Core with REST and GraphQL APIs.",
      "Test-driven development with Jest, React Testing Library, and XUnit.",
      "End-to-end testing using Cypress.",
    ],
  },
  {
    id: 4,
    company: "Benner",
    period: "AGO/2020 - MAI/2021",
    externalSource:
      "https://www.linkedin.com/company/universobenner/posts/?feedView=all",
    overview:
      "I worked on an internal logistics platform, building features and improving system functionality across both frontend and backend layers.",
    highlights: [
      "Backend development using .NET Core and PostgreSQL.",
      "Frontend development using Vue.js and internal UI tools.",
    ],
  },
  {
    id: 5,
    company: "Custom IT Sistemas",
    period: "MAI/2019 - AGO/2020",
    externalSource: "https://www.linkedin.com/company/custom-it-sistemas/",
    overview:
      "I developed and maintained custom web applications for multiple clients, covering feature delivery, bug fixing, maintenance, and day-to-day support.",
    highlights: [
      "Backend development using .NET Framework and .NET Core.",
      "Frontend development using jQuery and Vue.js.",
      "Database management with MySQL and SQL Server.",
      "Full lifecycle development including setup, maintenance, and support.",
    ],
  },
  {
    id: 6,
    company: "WORKDB DATA BUSINESS",
    period: "APR/2018 - JUL/2018",
    externalSource: "https://www.linkedin.com/company/workdbdatabusiness/",
    overview:
      "Discovering and developing chatbot solutions to support web platforms.",
    highlights: [
      "Chatbot development using Python and Django.",
      "Integration with public AI APIs.",
    ],
  },
];
