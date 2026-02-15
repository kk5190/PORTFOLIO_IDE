export const PORTFOLIO_CONFIG = {
  name: "Krishna Kumar Singh", // [cite: 1]
  title: "Senior Software Engineer", // [cite: 206]
  company: "Acquia", // [cite: 214]
  location: "Varanasi, Uttar Pradesh, India", // [cite: 207]
  email: "krishna.k.singh@outlook.com", // [cite: 3]
  github: "github.com/kk5190",
  linkedin: "linkedin.com/in/krishnaksingh", // [cite: 193]
  twitter: "",
  
  about: {
    summary: "Senior Software Engineer with 10 years of experience building scalable web applications. Expert in modernizing legacy systems, currently specializing in Angular for micro-frontend architecture while expanding my expertise into applied Machine Learning.",
    philosophy: "I believe in writing code that is not just functional, but architecturally sound. My approach balances rapid feature delivery with long-term system stability, ensuring high-quality, production-ready enterprise components.",
  },

  skills: {
    frontend: ["Angular", "ReactJS", "HTML", "CSS", "JS with ES6", "Bootstrap", "Twig"], // [cite: 17, 18]
    backend: ["PHP", "Drupal 9", "MySQL", "SQL", "Python", "Machine Learning Algorithms"], // [cite: 17, 196]
    devops: ["Git", "Composer", "DDEV"], // [cite: 17, 18]
    tools: ["VS Code", "Drush", "Jira", "NPM", "Putty"] // [cite: 17, 18]
  },

  experience: [
    {
      company: "Acquia", // [cite: 20]
      role: "Senior Software Engineer", // [cite: 216]
      period: "08/2021 — Present", // [cite: 21]
      achievements: [
        "Currently architecting and developing Angular applications for micro-frontend environments.",
        "Developed an Acquia Personalization Drupal module for integration with the Acquia Personalization Service[cite: 221].",
        "Built a PHP client library which implements HMAC authentication for third parties to use Acquia Personalization content indexing services[cite: 41]."
      ]
    },
    {
      company: "Promantus India Pvt Ltd", // [cite: 22]
      role: "Senior Software Engineer", // [cite: 22]
      period: "05/2019 — 07/2021", // [cite: 24]
      achievements: [
        "Played a pivotal role in the architecture and development of a Drupal Site Building project as a Senior Software Engineer[cite: 51].",
        "Integrated multiple third-party REST and SOAP APIs into both the Drupal frontend and backend[cite: 52].",
        "Developed pages and components using React.js to support the partially decoupled Drupal architecture[cite: 55].",
        "Mentored new developers to refine their Drupal skills and facilitated knowledge transfer[cite: 54]."
      ]
    },
    {
      company: "Group 10 Technologies", // [cite: 25]
      role: "Software Engineer", // [cite: 25]
      period: "05/2016 — 04/2019", // [cite: 26]
      achievements: [
        "Built the theme and several custom modules to construct a learning management system on a Drupal development team[cite: 63].",
        "Upgraded and modernized outdated code bases to current development standards[cite: 240].",
        "Provided production and customer support, and maintained existing Drupal 6 and 7 projects[cite: 241]."
      ]
    }
  ],

  projects: [
    {
      name: "AI Powered Tourism Analytics",
      description: "A machine learning project leveraging data analysis to predict tourism trends.",
      tech: ["Python", "Scikit-learn", "Machine Learning Algorithms"], // [cite: 196, 211]
      link: "github.com/kk5190/ai-powered-tourism-analytics"
    },
    {
      name: "Acquia Personalization Module", // [cite: 35]
      description: "Developed a Drupal 9 module to incorporate Acquia Personalization services[cite: 39].",
      tech: ["Drupal 9", "PHP", "HMAC Auth"], // [cite: 35, 41]
      link: "drupal.org/project/acquia_perz" // [cite: 148]
    },
    {
      name: "Acquia VWO",
      description: "Open-source Drupal module for Visual Website Optimizer (VWO) integration.",
      tech: ["Drupal", "PHP"],
      link: "drupal.org/project/acquia_vwo"
    }
  ]
};