import timetrixImg from "../assets/Timetrix_photo.jpg";
import snacoImg from "../assets/SNACO_photo.jpg";
import urlShortenerImg from "../assets/URL_shortner.png";
import ecommerceImg from "../assets/ecommerce_photo.jpg";

export const projects = [
  {
    id: "timetrix",
    title: "TimeTrix",
    description: "Intelligent Academic Scheduling Platform designed to optimize and automate the generation of timetables using advanced algorithms.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Genetic Algorithms"],
    image: timetrixImg,
    features: [
      "Automated timetable generation",
      "Conflict resolution for classes and professors",
      "User-friendly dashboard",
      "Export schedules to various formats"
    ],
    link: "https://github.com/Alokkumarshah/TimeTrix"
  },
  {
    id: "snaco",
    title: "SNACO",
    description: "Smart Campus Navigation System providing real-time routing and interactive maps for students and staff on campus.",
    techStack: ["React", "Node.js", "MongoDB", "Mapbox"],
    image: snacoImg,
    features: [
      "Real-time location tracking",
      "Custom routing between campus buildings",
      "Interactive 3D maps using Mapbox",
      "Mobile-friendly interface"
    ],
    link: "https://github.com/AkshayyVishnu/SNAC0"
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "A fast and secure URL shortener service with user authentication and analytics tracking for shortened links.",
    techStack: ["Node.js", "Express.js", "MongoDB", "JWT"],
    image: urlShortenerImg,
    features: [
      "Custom alias generation",
      "Click analytics and tracking",
      "User authentication with JWT",
      "Fast redirection"
    ],
    link: "https://github.com/SohamMahaj/UrlShortner"
  },
  {
    id: "shopverse",
    title: "ShopVerse",
    description: "A comprehensive e-commerce application featuring product management, a shopping cart, and secure payment processing.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Redis", "Cloudinary", "Stripe"],
    image: ecommerceImg,
    features: [
      "Full product catalog with search and filtering",
      "Shopping cart and order history",
      "Stripe payment integration",
      "Admin dashboard for product and order management"
    ],
    link: "https://github.com/SohamMahaj/Shopverse"
  }
];
