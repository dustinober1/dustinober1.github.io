import { 
  Certification, 
  Publication, 
  ProfessionalAffiliation, 
  ClientTestimonial, 
  ProjectOutcome, 
  AuthorBio, 
  ContactInfo 
} from './types';

/**
 * E-A-T Data Configuration
 * Contains all the expertise, authoritativeness, and trustworthiness signals
 * for Dustin J. Ober's professional profile
 */

export const certifications: Certification[] = [
  {
    name: "Project Management Professional (PMP)",
    issuingOrganization: "Project Management Institute",
    organizationUrl: "https://www.pmi.org",
    dateEarned: "2023-01-15",
    category: "professional",
    description: "Globally recognized certification for project management excellence",
    verificationUrl: "https://www.credly.com/badges/pmp-certification"
  },
  {
    name: "Graduate Certificate in AI Systems Management",
    issuingOrganization: "Strayer University",
    organizationUrl: "https://www.strayer.edu",
    dateEarned: "2025-05-01",
    category: "academic",
    description: "Advanced graduate-level certification in AI systems management and implementation"
  },
  {
    name: "DeepLearning.AI TensorFlow Developer",
    issuingOrganization: "DeepLearning.AI",
    organizationUrl: "https://www.deeplearning.ai",
    dateEarned: "2023-08-20",
    category: "technical",
    description: "Professional certification in TensorFlow development and deep learning implementation",
    verificationUrl: "https://www.coursera.org/account/accomplishments/professional-cert/tensorflow-developer"
  },
  {
    name: "Databricks Accredited Generative AI",
    issuingOrganization: "Databricks",
    organizationUrl: "https://www.databricks.com",
    dateEarned: "2024-03-10",
    category: "advanced",
    description: "Advanced certification in generative AI and large language model implementation"
  },
  {
    name: "IBM Data Science Professional",
    issuingOrganization: "IBM",
    organizationUrl: "https://www.ibm.com",
    dateEarned: "2023-06-15",
    category: "professional",
    description: "Comprehensive professional certification in data science methodologies and tools"
  },
  {
    name: "Google Data Analytics Professional",
    issuingOrganization: "Google",
    organizationUrl: "https://www.google.com",
    dateEarned: "2023-04-20",
    category: "professional",
    description: "Professional certification in data analytics and business intelligence"
  },
  {
    name: "Certified Scrum Master",
    issuingOrganization: "Scrum Alliance",
    organizationUrl: "https://www.scrumalliance.org",
    dateEarned: "2022-11-30",
    category: "professional",
    description: "Certification in Agile project management and Scrum methodology"
  }
];

export const publications: Publication[] = [
  {
    title: "Sovereign AI Infrastructure: Building Secure and Independent AI Systems",
    type: "whitepaper",
    url: "/whitepapers/pdf/01-sovereign-ai-infrastructure.pdf",
    publishedDate: "2024-11-15",
    publisher: "aiober.com",
    description: "Comprehensive analysis of building secure, independent AI infrastructure for government and enterprise applications"
  },
  {
    title: "The Disconnected Pipeline: Bridging the Gap Between Data Science and Production",
    type: "whitepaper",
    url: "/whitepapers/pdf/02-the-disconnected-pipeline.pdf",
    publishedDate: "2024-10-20",
    publisher: "aiober.com",
    description: "Technical paper addressing the challenges of deploying data science models in production environments"
  },
  {
    title: "Private Knowledge Retrieval: Implementing Secure RAG Systems",
    type: "whitepaper",
    url: "/whitepapers/pdf/03-private-knowledge-retrieval.pdf",
    publishedDate: "2024-09-25",
    publisher: "aiober.com",
    description: "Guide to implementing secure Retrieval-Augmented Generation systems for sensitive data"
  },
  {
    title: "Verifiable Intelligence: Ensuring AI System Reliability and Accountability",
    type: "whitepaper",
    url: "/whitepapers/pdf/04-verifiable-intelligence.pdf",
    publishedDate: "2024-08-30",
    publisher: "aiober.com",
    description: "Framework for building accountable and verifiable AI systems in critical applications"
  }
];

export const professionalAffiliations: ProfessionalAffiliation[] = [
  {
    organizationName: "Project Management Institute",
    organizationUrl: "https://www.pmi.org",
    role: "Professional Member",
    startDate: "2023-01-15",
    type: "professional",
    description: "Active member of the world's leading professional association for project management"
  },
  {
    organizationName: "Scrum Alliance",
    organizationUrl: "https://www.scrumalliance.org",
    role: "Certified Scrum Master",
    startDate: "2022-11-30",
    type: "professional",
    description: "Certified member of the global Scrum and Agile community"
  },
  {
    organizationName: "Liberty University",
    organizationUrl: "https://www.liberty.edu",
    role: "Alumni",
    startDate: "2020-01-01",
    endDate: "2022-05-15",
    type: "education",
    description: "Master of Education in Instructional Design & Technology"
  },
  {
    organizationName: "Strayer University",
    organizationUrl: "https://www.strayer.edu",
    role: "Graduate Student",
    startDate: "2024-01-01",
    endDate: "2025-05-01",
    type: "education",
    description: "Graduate Certificate in AI Systems Management"
  }
];

export const clientTestimonials: ClientTestimonial[] = [
  {
    quote: "Dustin's ability to bridge the gap between complex AI implementation and instructional strategy is unmatched. He doesn't just build models; he builds solutions that people can actually use and learn from.",
    clientTitle: "Senior Project Manager",
    clientCompany: "Leidos",
    projectContext: "AI-powered training system implementation",
    dateGiven: "2024-06-15",
    isVerified: true
  },
  {
    quote: "A rare talent who masters both ISD and Data Science. Dustin's automated workflows saved our team hundreds of hours while significantly improving the accuracy of our mission-critical training metrics.",
    clientTitle: "Intelligence Technical Lead",
    clientCompany: "Federal Partner",
    projectContext: "Training metrics automation and analysis system",
    dateGiven: "2024-08-20",
    isVerified: true
  }
];

export const projectOutcomes: ProjectOutcome[] = [
  {
    projectName: "Chain Reaction Training Analytics",
    description: "Developed comprehensive training analytics platform for defense contractor",
    role: "Lead Developer & Technical ISD",
    completionDate: "2024-07-30",
    successMetrics: [
      {
        metric: "Training Efficiency",
        value: "40% improvement",
        improvement: "Reduced training time while maintaining quality"
      },
      {
        metric: "Data Processing Speed",
        value: "300% faster",
        improvement: "Automated manual processes saving hundreds of hours"
      },
      {
        metric: "Accuracy Improvement",
        value: "25% increase",
        improvement: "Enhanced training metrics accuracy through AI implementation"
      }
    ],
    clientType: "government",
    technologies: ["Python", "Machine Learning", "Data Analytics", "Training Systems"],
    teamSize: 5
  },
  {
    projectName: "AI-Powered Instructional Design System",
    description: "Built intelligent system for automated curriculum development and optimization",
    role: "Technical Lead & AI Architect",
    completionDate: "2024-05-15",
    successMetrics: [
      {
        metric: "Curriculum Development Time",
        value: "60% reduction",
        improvement: "Automated content generation and optimization"
      },
      {
        metric: "Learning Outcome Prediction",
        value: "85% accuracy",
        improvement: "AI-driven prediction of training effectiveness"
      }
    ],
    clientType: "government",
    technologies: ["NLP", "LLMs", "Python", "Educational Technology"],
    teamSize: 3
  }
];

export const authorBio: AuthorBio = {
  name: "Dustin J. Ober",
  title: "AI Developer & Technical Instructional Systems Designer",
  detailedBackground: "Technical Instructional Systems Designer and Full Stack Developer specialized in leveraging Data Science and LLMs to optimize training outcomes for defense and intelligence missions. With over 8 years of experience bridging educational strategy and AI implementation, Dustin combines deep technical expertise in machine learning with proven instructional design methodologies. His unique background spans military service, advanced education in instructional technology, and hands-on experience developing AI-powered training solutions for government and enterprise clients.",
  yearsOfExperience: 8,
  specializations: [
    "AI/ML Implementation",
    "Instructional Systems Design",
    "Natural Language Processing",
    "Large Language Models",
    "Training Analytics",
    "Educational Technology",
    "Data Science",
    "Project Management"
  ],
  currentRole: "Technical Instructional Systems Designer",
  currentCompany: "Leidos",
  location: "Chantilly, VA",
  languages: ["English"]
};

export const contactInfo: ContactInfo = {
  email: "dustin@aiober.com",
  phone: "540-793-0177",
  location: "Chantilly, VA",
  linkedinUrl: "https://www.linkedin.com/in/dober1",
  personalWebsite: "https://aiober.com",
  languages: ["English"],
  availability: "Available for consulting and full-time opportunities"
};

// Combined E-A-T data export
export const eatData = {
  certifications,
  publications,
  affiliations: professionalAffiliations,
  testimonials: clientTestimonials,
  projectOutcomes,
  authorBio,
  contactInfo
};