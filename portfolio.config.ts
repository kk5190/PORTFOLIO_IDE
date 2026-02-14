
export const PORTFOLIO_CONFIG = {
  name: "John Doe",
  title: "Senior Software Engineer",
  company: "TechNova Solutions",
  location: "San Francisco, CA (Remote)",
  email: "john.doe@example.com",
  github: "github.com/johndoe",
  linkedin: "linkedin.com/in/johndoe",
  twitter: "@johndoe",
  
  about: {
    summary: "Senior Software Engineer with 8+ years of experience building scalable web applications and distributed systems. Expert in React, TypeScript, and Node.js with a strong focus on clean architecture and developer experience.",
    philosophy: "I believe in writing code that is not just functional, but readable and maintainable. My approach balances rapid feature delivery with long-term system stability.",
  },

  skills: {
    frontend: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "FastAPI", "Go", "PostgreSQL", "Redis", "GraphQL"],
    devops: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform"],
    tools: ["VS Code", "Figma", "Postman", "Git", "Jira"]
  },

  experience: [
    {
      company: "TechNova Solutions",
      role: "Senior Software Engineer",
      period: "2021 — Present",
      achievements: [
        "Led migration of legacy monolith to microservices using Go and K8s.",
        "Improved CI/CD pipeline efficiency by 40% through automation.",
        "Mentored a team of 5 junior and mid-level developers."
      ]
    },
    {
      company: "CloudScale Systems",
      role: "Full Stack Developer",
      period: "2018 — 2021",
      achievements: [
        "Built a real-time analytics dashboard used by 500+ enterprise clients.",
        "Optimized database queries reducing load times by 60%."
      ]
    }
  ],

  projects: [
    {
      name: "DevIDE-Portfolio",
      description: "A high-fidelity VS Code themed portfolio template.",
      tech: ["React", "TypeScript", "Tailwind"],
      link: "github.com/johndoe/devide"
    },
    {
      name: "Fast-API-Starter",
      description: "Opinionated boilerplate for high-performance Python backends.",
      tech: ["Python", "FastAPI", "Pydantic"],
      link: "github.com/johndoe/fastapi-starter"
    }
  ]
};
