export const siteConfig = {
  name: "BEGU MISSION CONTROL",
  tagline: "High-Performance Academic & Technical Dashboard",
  description: "Mission-critical intelligence for Begu's Deep Learning research and automated task management.",
  
  hero: {
    badge: "OPERATIONAL // V1.0.0",
    title: "MISSION\nCONTROL",
    subtitle: "Real-time monitoring of academic progress, AI research, and automated systems.",
    cta: { text: "Open Dashboard", href: "#main" },
    status: {
      label: "SYSTEM STATUS",
      value: "ACTIVE",
      variant: "emerald"
    }
  },
  
  stats: [
    { label: "NPTEL PROGRESS", value: "5.56%", subtext: "Deep Learning - IIT Ropar", trend: "up" },
    { label: "ACTIVE PROJECTS", value: "04", subtext: "AI & Embedded Systems", trend: "neutral" },
    { label: "INBOX INTEL", value: "04", subtext: "New tasks today", trend: "up" },
    { label: "UPTIME", value: "99.9%", subtext: "Local Gateway", trend: "neutral" }
  ],
  
  projects: [
    { 
      title: "FACIAL RECOGNITION", 
      status: "COMPLETED", 
      desc: "Attendance system using deep learning and local storage.",
      tags: ["Python", "OpenCV", "TensorFlow"]
    },
    { 
      title: "VOICE AGENT EVAL", 
      status: "IN PROGRESS", 
      desc: "Benchmarking LLM response latency for voice interactions.",
      tags: ["Node.js", "LLM", "WebSockets"]
    },
    { 
      title: "JETSON NANO DEPLOY", 
      status: "MAINTENANCE", 
      desc: "Edge AI deployment for real-time video processing.",
      tags: ["C++", "CUDA", "Edge AI"]
    },
    { 
      title: "TASK MANAGER 2.0", 
      status: "OPERATIONAL", 
      desc: "Custom Kanban system with automated cron integration.",
      tags: ["Next.js", "TypeScript", "REST API"]
    }
  ],
  
  inboxIntel: [
    { id: "1", subject: "Collection of Marksheet", from: "Srushti Gajjar", priority: "MEDIUM" },
    { id: "2", subject: "NPTEL Exam Registration", from: "IITM Online", priority: "HIGH" },
    { id: "3", subject: "Internship Opportunity", from: "Kavya Mallempalli", priority: "MEDIUM" },
    { id: "4", subject: "Mentor Selection", from: "Nirav Bhatt", priority: "HIGH" }
  ],
  
  barca: {
    nextMatch: "Barça vs Getafe",
    date: "Feb 15, 2026",
    stadium: "Estadi Olímpic Lluís Companys"
  }
}
