
export const PORTFOLIO_CONFIG = {
  name: "Krishna Kumar Singh",
  title: "Senior Software Engineer",
  company: "Acquia",
  location: "Varanasi, Uttar Pradesh, India",
  email: "krishna.k.singh@outlook.com",
  github: "github.com/kk5190",
  linkedin: "linkedin.com/in/krishnaksingh",
  twitter: "",
  
  about: {
    summary: "Senior Software Engineer with 10 years of experience building scalable web applications. Expert in modernizing legacy systems, currently specializing in Angular for micro-frontend architecture while expanding my expertise into applied Machine Learning.",
    philosophy: "I believe in writing code that is not just functional, but architecturally sound. My approach balances rapid feature delivery with long-term system stability, ensuring high-quality, production-ready enterprise components.",
  },

  skills: {
    frontend: ["Angular", "ReactJS", "HTML", "CSS", "JS with ES6", "Bootstrap", "Twig"],
    backend: ["PHP", "Drupal 9", "MySQL", "SQL", "Python", "Machine Learning Algorithms"],
    devops: ["Git", "Composer", "DDEV"],
    tools: ["VS Code", "Drush", "Jira", "NPM", "Putty"]
  },

  experience: [
    {
      company: "Acquia",
      role: "Senior Software Engineer",
      period: "08/2021 — Present",
      achievements: [
        "Currently architecting and developing Angular applications for micro-frontend environments.",
        "Developed an Acquia Personalization Drupal module for integration with the Acquia Personalization Service.",
        "Built a PHP client library which implements HMAC authentication for third parties to use Acquia Personalization content indexing services."
      ]
    },
    {
      company: "Promantus India Pvt Ltd",
      role: "Senior Software Engineer",
      period: "05/2019 — 07/2021",
      achievements: [
        "Played a pivotal role in the architecture and development of a Drupal Site Building project as a Senior Software Engineer.",
        "Integrated multiple third-party REST and SOAP APIs into both the Drupal frontend and backend.",
        "Developed pages and components using React.js to support the partially decoupled Drupal architecture.",
        "Mentored new developers to refine their Drupal skills and facilitated knowledge transfer."
      ]
    },
    {
      company: "Group 10 Technologies",
      role: "Software Engineer",
      period: "05/2016 — 04/2019",
      achievements: [
        "Built the theme and several custom modules to construct a learning management system on a Drupal development team.",
        "Upgraded and modernized outdated code bases to current development standards.",
        "Provided production and customer support, and maintained existing Drupal 6 and 7 projects."
      ]
    }
  ],

  projects: [
    {
      name: "AI Powered Tourism Analytics",
      description: "A machine learning project leveraging data analysis to predict tourism trends.",
      tech: ["Python", "Scikit-learn", "Machine Learning Algorithms"],
      link: "github.com/kk5190/ai-powered-tourism-analytics"
    },
    {
      name: "Acquia Personalization Module",
      description: "Developed a Drupal 9 module to incorporate Acquia Personalization services.",
      tech: ["Drupal 9", "PHP", "HMAC Auth"],
      link: "drupal.org/project/acquia_perz"
    },
    {
      name: "Acquia VWO",
      description: "Open-source Drupal module for Visual Website Optimizer (VWO) integration.",
      tech: ["Drupal", "PHP"],
      link: "drupal.org/project/acquia_vwo"
    }
  ]
};
