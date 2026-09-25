import { Coffee, Server, Code2, Boxes } from "lucide-react";

export const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

export const TECH_BADGES = [
  { label: "Java", icon: Coffee },
  { label: "Spring Boot", icon: Server },
  { label: "React", icon: Code2 },
  { label: "Docker", icon: Boxes },
];

// Experience has no backend endpoint yet, so it's seeded here and managed
// entirely in the browser (see DataContext.jsx). Skills, Projects and
// Profile now come live from the Spring Boot API instead.
export const EXPERIENCE = [
  {
    id: "exp-1",
    role: "Java Backend Engineer",
    company: "Enterprise Tech Solutions",
    period: "2023 — Present",
    points: [
      "Design and maintain Spring Boot microservices powering enterprise SIEM and MDM platforms.",
      "Improved API response times by optimizing database queries and introducing caching layers.",
      "Collaborated with cross-functional teams to ship AI-powered features into production.",
    ],
  },
  {
    id: "exp-2",
    role: "Backend Developer",
    company: "Cloud Systems Pvt. Ltd.",
    period: "2021 — 2023",
    points: [
      "Built and maintained REST APIs consumed by web and mobile clients.",
      "Migrated a monolithic application into containerized microservices using Docker.",
      "Wrote automated tests, improving overall code coverage significantly.",
    ],
  },
  {
    id: "exp-3",
    role: "Junior Software Engineer",
    company: "StartUp Labs",
    period: "2020 — 2021",
    points: [
      "Contributed to backend features using Java and MySQL.",
      "Assisted in setting up CI/CD pipelines for faster releases.",
    ],
  },
];
