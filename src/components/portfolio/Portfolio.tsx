import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowRight,
  ArrowUp,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Sparkles,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Shield,
  Cpu,
  GitBranch,
  BookOpen,
} from "lucide-react";
import profileImg1 from "../../assests/2.webp";
import profileImg2 from "../../assests/6.webp";
import profileImg3 from "../../assests/7.webp";
import profileImg4 from "../../assests/8.webp";
import resumePdf from "../../assests/resume.pdf";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "./Magnetic";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../../context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// NAV keys for lookup — labels come from translations at render time
const NAV_ITEMS: { key: keyof ReturnType<typeof useLanguage>["t"]["nav"]; href: string }[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "projects", href: "#projects" },
  { key: "conferences", href: "#conferences" },
  { key: "skills", href: "#skills" },
  { key: "contact", href: "#contact" },
];

const EXPERIENCES = [
  {
    role: "Data Scientist Intern",
    company: "Soften Technologies, Ernakulam",
    period: "Aug 2025 – Present",
    points: [
      "Data cleaning & EDA in Python (Pandas, NumPy)",
      "Built ML models with Scikit-learn & feature engineering",
      "Visualizations in Matplotlib, Seaborn & Tableau",
      "Predictive analytics for real-world datasets",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Hex Softwares",
    period: "Oct – Nov 2025",
    points: [
      "Full-stack feature development",
      "Testing, debugging & performance tuning",
      "UX improvements across the product",
    ],
  },
  {
    role: "Front End Developer Intern",
    company: "OWL Ai",
    period: "Sep 2025",
    points: ["Responsive interfaces with HTML/CSS/JS", "Cross-browser optimization"],
  },
  {
    role: "AI Intern — Foundational AI Project",
    company: "AccelerateX, Kothamangalam",
    period: "Oct 2024",
    points: ["ML modeling & data processing", "Deployment basics for AI systems"],
  },
];

const PROJECTS = [
  {
    featured: true,
    title: "Online Home IoT Device Store",
    description:
      "Full e-commerce app with cart, authentication and PDF invoices. Built end-to-end with a Flask backend and templated frontend.",
    detailedDescription:
      "A complete end-to-end e-commerce solution designed for smart home devices. Features user authentication with session management, a secure shopping cart, and a automated invoice generation system that exports PDFs. The dashboard provides analytics for administrators to monitor sales, update inventory, and manage order fulfillment.",
    tags: ["Python", "Flask", "MySQL", "Bootstrap", "Jinja2"],
    features: [
      "User registration, login, and profile management with secure password hashing",
      "Dynamic shopping cart with real-time price calculation and checkout flow",
      "Automated PDF invoice generation and direct email confirmation using SMTP",
      "Robust administration dashboard for product inventory and sales telemetry",
      "Responsive UI built with Bootstrap and interactive elements using Vanilla JS",
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    github: "https://github.com/alwin-antony/home-iot-store",
    demo: "https://home-iot-store-demo.example.com",
  },
  {
    title: "Online College Election Management System",
    description:
      "Secure online voting platform with admin, voter and candidate modules. Role-based access, audit logs and encrypted ballots.",
    detailedDescription:
      "A secure digital voting system designed to facilitate campus elections. Implements role-based access control, cryptographic verification of votes, and detailed audit trails to ensure compliance and transparency. The system provides candidates with a platform to list profiles and voters with a simple, secure ballot process.",
    tags: ["PHP", "MySQL", "Auth", "Security"],
    features: [
      "Role-Based Access Control (RBAC) separating Admin, Voter, and Candidate accounts",
      "Encrypted ballot database entries ensuring total voter anonymity and secrecy",
      "Real-time election result visualization using secure aggregation queries",
      "Comprehensive system audit logs tracking logins, votes cast, and admin actions",
      "Strict voter verification mechanics to prevent duplicate votes or spoofing",
    ],
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
    github: "https://github.com/alwinantony084-blip/College-Election-System",
    NotAvailable: "https://election-system-demo.example.com",
  },
  {
    title: "Predictive Sales & Data Analytics Engine",
    description:
      "ML pipeline built with Scikit-learn for forecasting retail trends. Features interactive Tableau dashboards and data cleaning pipelines.",
    detailedDescription:
      "A machine learning pipeline designed to clean, preprocess, and analyze high-volume retail transactions to predict future sales trends. Utilizes advanced regression techniques and time-series analysis to model seasonality and promotional impacts, combined with interactive visualization dashboards.",
    tags: ["Python", "Scikit-learn", "Pandas", "Tableau"],
    features: [
      "End-to-end ETL pipeline for handling missing data, outliers, and feature encoding",
      "Predictive modeling using Random Forests, XGBoost, and ARIMA time-series models",
      "Interactive analytics dashboard built in Tableau for business intelligence tracking",
      "Feature importance evaluation demonstrating key drivers of transaction volume",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    github: "https://github.com/alwin-antony/predictive-sales-analytics",
    demo: "https://tableau.example.com/sales-dashboard",
  },
  {
    title: "Oxygen Gym Website",
    description:
      "A modern, responsive gym and fitness website featuring premium UI, trainer profiles, workout programs, testimonials, and online booking.",
    detailedDescription:
      "A fully responsive fitness website designed with HTML, CSS, and JavaScript. The project features a modern landing page, interactive workout program sections, trainer profiles, client testimonials, membership plans, detailed program pages, and a booking form. Built with a premium UI/UX focus, smooth animations, and mobile-first responsiveness.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    features: [
      "Modern responsive landing page with premium UI/UX",
      "Interactive workout programs and trainer showcase",
      "Testimonials, membership plans, and contact section",
      "Online booking form with smooth animations and mobile-friendly design",
    ],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    github: "https://github.com/alwinantony084-blip/Gym-website",
  },
  {
    title: "TaskFlow - Full-Stack Agile Scrum Board",
    description:
      "MERN stack project management app with drag-and-drop workflow, instant team sync via WebSockets, and detail analytics.",
    detailedDescription:
      "A complete project management dashboard modeled after Trello and Jira. Supports team creation, sprint planning, ticket backlogs, drag-and-drop task boards, and team comments. Integrates charts to show progress velocities and burn-down metrics.",
    tags: ["React", "NodeJS", "Express", "MongoDB", "SocketIO"],
    features: [
      "Fluid drag-and-drop UI powered by react-beautiful-dnd for instant task sorting",
      "Real-time WebSocket synchronization updating board actions across active team members",
      "Comprehensive metrics including sprint burn-down charts and velocity logs",
      "Secure JWT auth with email verification and role levels for project owners",
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    github: "https://github.com/alwin-antony/taskflow-scrum-board",
    demo: "https://taskflow-agile.example.com",
  },
];

const CONFERENCES = [
  {
    title: "AI in Autonomous Vehicles",
    description:
      "Research paper presented at ICAET-2025 covering ADAS, sensor fusion and AI-driven safety systems for self-driving platforms.",
    detailedDescription:
      "An in-depth research paper focusing on artificial intelligence architectures in self-driving cars. Investigates the integration of Advanced Driver Assistance Systems (ADAS), deep neural networks for computer vision, sensor fusion algorithms (LiDAR, Radar, Cameras), and real-time path planning in complex urban environments.",
    tags: ["Research", "ADAS", "Sensor Fusion", "AI"],
    features: [
      "Comparative analysis of camera-only (Tesla) vs. multi-sensor (Waymo) fusion models",
      "Comprehensive breakdown of object detection architectures like YOLO and SegNet in ADAS",
      "Detailed path-planning heuristics utilizing reinforcement learning and A* algorithms",
      "Evaluation of safety critical fail-safe mechanisms under dense weather conditions",
      "Presented and published in the proceedings of ICAET-2025 conference",
    ],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
];

const SKILLS = [
  "Python",
  "JavaScript",
  "C++",
  "PHP",
  "Flask",
  "HTML",
  "CSS",
  "Bootstrap",
  "MySQL",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "Tableau",
  "Prompt Engineering",
];

const CERTS = [
  "Generative AI Workshop",
  "Prompt Engineering Workshop",
  "Cybersecurity & Ethical Hacking",
  "Advanced Python for Data Analysis",
  "Robotics Workshop",
  "MERN Stack with AI",
  "CCNA",
];

const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Rajagiri College of Management and Applied Sciences, Ernakulam",
    period: "2022 – 2025",
  },
  {
    degree: "Higher Secondary",
    school: "Cardinal Higher Secondary School",
    period: "2020 – 2022",
  },
];

function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-brand"
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative">
        {/* Background outline text */}
        <span
          className="text-6xl sm:text-8xl font-black tracking-[0.2em] text-transparent select-none"
          style={{
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.25)",
          }}
        >
          ALWIN ANTONY
        </span>
        {/* Foreground filled text */}
        <motion.span
          className="absolute inset-0 text-6xl sm:text-8xl font-black tracking-[0.2em] text-white select-none pointer-events-none"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          ALWIN ANTONY BABU
        </motion.span>
      </div>
    </motion.div>
  );
}

function CursorBlob() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0 hidden h-[500px] w-[500px] rounded-full opacity-40 blur-[120px] md:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, oklch(0.7 0.22 260 / 0.55), oklch(0.65 0.26 300 / 0.35), transparent 70%)",
      }}
    />
  );
}

function Navbar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border/60 bg-background/60 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-lg">
            AA
          </span>
          <span className="hidden sm:inline text-sm text-muted-foreground">
            Alwin<span className="text-foreground"> Antony</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((n) => {
            const isActive =
              activeSection === n.key || (n.key === "home" && activeSection === "home");
            return (
              <a
                key={n.href}
                href={n.href}
                className={`group relative text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.nav[n.key]}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Magnetic>
            <a
              href={resumePdf}
              download="Alwin_Antony_Babu_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden overflow-hidden rounded-full bg-gradient-brand px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 md:inline-flex md:items-center md:gap-2"
            >
              <Download className="h-4 w-4" />
              {t.downloadCv}
            </a>
          </Magnetic>
          <button
            className="md:hidden rounded-md border border-border p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((n) => {
                const isActive = activeSection === n.key;
                return (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground ${
                      isActive ? "bg-secondary text-foreground" : ""
                    }`}
                  >
                    {t.nav[n.key]}
                  </a>
                );
              })}
              <Magnetic>
                <a
                  href={resumePdf}
                  download="Alwin_Antony_Babu_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2 text-sm font-medium text-white"
                >
                  <Download className="h-4 w-4" />
                  {t.downloadCv}
                </a>
              </Magnetic>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function GradientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(
    () => {
      if (isReduced) return;

      gsap.to(orb1Ref.current, {
        x: "+=30",
        y: "+=50",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        x: "-=40",
        y: "-=30",
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb1Ref.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(orb2Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(gridRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [isReduced] },
  );

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        ref={orb1Ref}
        className="absolute -left-24 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.25 265 / 0.7), transparent 70%)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute -right-20 top-40 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.28 305 / 0.6), transparent 70%)",
        }}
      />
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 30%, black, transparent 70%)",
        }}
      />
    </div>
  );
}

function CoverFlowCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + 5) % 5);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % 5);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getOffset = (idx: number) => {
    let diff = idx - activeIndex;
    while (diff < -2) diff += 5;
    while (diff > 2) diff -= 5;
    return diff;
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + 5) % 5);
    } else if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % 5);
    }
  };

  const slides = [profileImg1, profileImg2, profileImg3, profileImg4, profileImg3];

  return (
    <div
      className="relative flex items-center justify-center h-[420px] sm:h-[520px] w-full max-w-[640px] mx-auto overflow-visible perspective-1000 preserve-3d select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="relative flex items-center justify-center w-full h-full preserve-3d cursor-grab active:cursor-grabbing"
      >
        {slides.map((imgSrc, idx) => {
          const offset = getOffset(idx);
          const isCenter = offset === 0;

          // Responsive spacing & rotation values
          const xVal = isMobile ? offset * 75 : offset * 160;
          const zVal = isMobile ? Math.abs(offset) * -90 : Math.abs(offset) * -180;
          const rotYVal = offset * -35;
          const scaleVal = isMobile ? 1 - Math.abs(offset) * 0.15 : 1 - Math.abs(offset) * 0.18;

          return (
            <motion.div
              key={idx}
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                x: xVal,
                z: zVal,
                rotateY: rotYVal,
                scale: scaleVal,
                opacity: Math.abs(offset) === 0 ? 1 : Math.abs(offset) === 1 ? 0.65 : 0.3,
                zIndex: 10 - Math.abs(offset),
                // Subtle float animation on active center card
                y: isCenter ? [0, -8, 0] : 0,
              }}
              transition={{
                x: { type: "spring", stiffness: 180, damping: 20 },
                z: { type: "spring", stiffness: 180, damping: 20 },
                rotateY: { type: "spring", stiffness: 180, damping: 20 },
                scale: { type: "spring", stiffness: 180, damping: 20 },
                opacity: { duration: 0.3 },
                y: isCenter
                  ? {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }
                  : { duration: 0.3 },
              }}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              className="absolute w-[200px] h-[265px] sm:w-[300px] sm:h-[400px] rounded-[22px] overflow-hidden border border-white/20 shadow-2xl reflect-below cursor-pointer bg-card/80"
            >
              {/* Premium Glow effect behind center active image */}
              {isCenter && (
                <div className="absolute inset-[-10px] rounded-[22px] bg-gradient-to-r from-blue-500/35 to-purple-600/35 blur-xl z-[-1] animate-pulse" />
              )}

              {/* Radial Lighting overlay */}
              <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%] pointer-events-none z-10" />

              <img
                src={imgSrc}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Hero({ start }: { start: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const { t } = useLanguage();

  useGSAP(() => {
    if (!start) return;

    if (isReduced) {
      gsap.to(".hero-fade-in", {
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-char-1", {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
    })
      .to(
        ".hero-char-2",
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
        },
        "-=0.6",
      )
      .to(
        ".hero-subheading",
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.5",
      )
      .to(
        ".hero-cta-btn",
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.45)",
          stagger: 0.15,
        },
        "-=0.8",
      )
      .to(
        ".hero-social-btn",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.8",
      )
      .to(
        ".hero-image-container",
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.2",
      );
  }, [start, isReduced]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-screen items-center pt-32 overflow-hidden"
    >
      <GradientOrbs />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* LEFT SIDE */}
          <div className="hero-fade-in" style={{ opacity: isReduced ? 0 : 1 }}>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur hero-subheading"
              style={{
                opacity: isReduced ? 1 : 0,
                transform: isReduced ? "none" : "translateY(20px)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t.heroBadge}
            </div>

            <h1 className="max-w-none text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block overflow-hidden mb-2 py-1">
                <span
                  className="hero-char-1 inline-block"
                  style={{
                    opacity: isReduced ? 1 : 0,
                    transform: isReduced ? "none" : "translateY(120%)",
                  }}
                >
                  {t.heroGreeting}
                </span>
              </span>
              <span className="block overflow-hidden leading-none py-1">
                {["ALWIN ANTONY", "BABU"].map((line, li) => (
                  <span
                    key={li}
                    className="block overflow-hidden leading-none py-1 whitespace-nowrap"
                  >
                    {line.split(" ").map((word, wi, words) => (
                      <span key={wi} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, ci) => (
                          <span
                            key={ci}
                            className="hero-char-2 inline-block text-gradient-brand"
                            style={{
                              opacity: isReduced ? 1 : 0,
                              transform: isReduced ? "none" : "translateY(120%)",
                            }}
                          >
                            {char}
                          </span>
                        ))}
                        {wi < words.length - 1 && "\u00A0"}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>

            <p
              className="mt-6 max-w-2xl text-lg text-muted-foreground hero-subheading"
              style={{
                opacity: isReduced ? 1 : 0,
                transform: isReduced ? "none" : "translateY(20px)",
              }}
            >
              {t.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="#projects"
                  className="hero-cta-btn group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white transition-transform duration-300"
                  style={{
                    opacity: isReduced ? 1 : 0,
                    transform: isReduced ? "none" : "translateY(20px)",
                  }}
                >
                  {t.viewProjects}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="#contact"
                  className="hero-cta-btn inline-flex items-center rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium transition-transform duration-300"
                  style={{
                    opacity: isReduced ? 1 : 0,
                    transform: isReduced ? "none" : "translateY(20px)",
                  }}
                >
                  {t.getInTouch}
                </a>
              </Magnetic>
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="https://linkedin.com/in/alwin-antony-babu-7a7786324"
                target="_blank"
                rel="noreferrer"
                className="hero-social-btn flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-primary hover:text-primary"
                style={{
                  opacity: isReduced ? 1 : 0,
                  transform: isReduced ? "none" : "translateY(20px)",
                }}
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="mailto:alwinantony084@gmail.com"
                className="hero-social-btn flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-primary hover:text-primary"
                style={{
                  opacity: isReduced ? 1 : 0,
                  transform: isReduced ? "none" : "translateY(20px)",
                }}
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center lg:justify-center">
            <div
              className="hero-image-container relative"
              style={{
                opacity: isReduced ? 1 : 0,
                transform: isReduced ? "none" : "scale(1)",
              }}
            >
              {/* Soft background glow to frame the CoverFlow beautifully */}
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-brand blur-3xl opacity-30 animate-pulse pointer-events-none" />

              <CoverFlowCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(
    () => {
      if (isReduced) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
        return;
      }

      gsap.fromTo(
        textRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      const eyebrowEl = containerRef.current?.querySelector(".eyebrow-text");
      if (eyebrowEl) {
        gsap.fromTo(
          eyebrowEl,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: containerRef, dependencies: [isReduced, eyebrow, title] },
  );

  return (
    <div ref={containerRef} className="mb-12">
      <p
        className="eyebrow-text mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary"
        style={{ opacity: isReduced ? 1 : 0 }}
      >
        {eyebrow}
      </p>
      <h2
        ref={textRef}
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        style={{ clipPath: isReduced ? "none" : "inset(100% 0 0 0)" }}
      >
        {title}
      </h2>
    </div>
  );
}

function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const { t } = useLanguage();

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".card-glass");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      const countNum = containerRef.current?.querySelector(".count-number");
      if (countNum) {
        gsap.fromTo(
          countNum,
          { innerText: "0" },
          {
            innerText: "4",
            duration: 1.5,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: countNum,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t.sections.about.eyebrow} title={t.sections.about.title} />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-glass col-span-2 rounded-2xl p-8" style={{ opacity: 0 }}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Enthusiastic Bachelor of Computer Applications (BCA) student with a strong foundation
              in computer science, programming and information technology. Passionate about
              continuous learning, AI and robotics, with strong problem-solving and logical thinking
              skills.
            </p>
          </div>
          <div
            className="card-glass flex flex-col justify-between gap-4 rounded-2xl p-8 hover:border-primary/45 transition-colors duration-300"
            style={{ opacity: 0 }}
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <p className="text-4xl font-bold text-gradient-brand">
                <span className="count-number">0</span>+
              </p>
              <p className="text-sm text-muted-foreground">Internships across AI, Data & Web</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ e }: { e: (typeof EXPERIENCES)[number] }) {
  return (
    <div className="card-glass rounded-2xl p-6 hover:border-primary/45 transition-colors duration-300">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" />
        <span className="text-xs text-muted-foreground">{e.period}</span>
      </div>
      <h3 className="text-lg font-semibold">{e.role}</h3>
      <p className="mb-4 text-sm text-primary">{e.company}</p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {e.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const { t } = useLanguage();

  useGSAP(
    () => {
      const listItems = containerRef.current?.querySelectorAll(".exp-item");
      const line = containerRef.current?.querySelector(".experience-line");

      if (isReduced) {
        if (line) gsap.set(line, { scaleY: 1 });
        if (listItems) gsap.set(listItems, { opacity: 1, x: 0 });
        return;
      }

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
      }

      listItems?.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        const card = item.querySelector(".experience-card-wrap");
        const dot = item.querySelector(".experience-dot");

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: isLeft ? -80 : 80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      });
    },
    { scope: containerRef, dependencies: [isReduced] },
  );

  return (
    <section ref={containerRef} id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t.sections.experience.eyebrow}
          title={t.sections.experience.title}
        />
        <div className="relative">
          {/* Vertical line */}
          <div
            className="experience-line absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2"
            style={{ transform: isReduced ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top" }}
          />

          <ul className="space-y-10 md:space-y-14 overflow-hidden">
            {EXPERIENCES.map((e, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={e.role} className="exp-item relative md:grid md:grid-cols-2 md:gap-x-10">
                  <span
                    className="experience-dot absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-brand shadow-[0_0_0_4px_var(--background)] md:left-1/2 z-10"
                    style={{ opacity: isReduced ? 1 : 0 }}
                  />

                  {isLeft ? (
                    <>
                      <div
                        className="experience-card-wrap ml-10 md:ml-0 md:mr-10"
                        style={{ opacity: isReduced ? 1 : 0 }}
                      >
                        <ExperienceCard e={e} />
                      </div>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <div
                        className="experience-card-wrap ml-10 md:ml-10"
                        style={{ opacity: isReduced ? 1 : 0 }}
                      >
                        <ExperienceCard e={e} />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  p: (typeof PROJECTS)[number];
  i: number;
  onOpenDetails: () => void;
}

function ProjectCard({ p, i, onOpenDetails }: ProjectCardProps) {
  const isReduced = useReducedMotion();
  const { t } = useLanguage();

  const getProjectIcon = (tags: string[]) => {
    if (tags.includes("Research") || tags.includes("AI")) return Sparkles;
    if (tags.includes("Security") || tags.includes("Auth")) return Shield;
    if (tags.includes("Scikit-learn")) return Cpu;
    if (tags.includes("Algorithms")) return GitBranch;
    return Code2;
  };

  const IconComponent = getProjectIcon(p.tags);

  return (
    <motion.article
      layoutId={isReduced ? undefined : `card-bg-${p.title}`}
      onClick={onOpenDetails}
      whileHover={isReduced ? undefined : { y: -8 }}
      whileTap={isReduced ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-[#0c0c1d]/60 backdrop-blur-2xl shadow-xl shadow-black/30 card-glow-hover p-6 h-[390px] w-full cursor-pointer"
    >
      {/* 1px Gradient Border */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none p-[1px] opacity-15"
        style={{
          background: "var(--gradient-brand)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Large decorative index background watermark */}
      <span className="absolute right-6 top-4 z-0 text-6xl font-extrabold text-white/[0.03] select-none group-hover:text-primary/[0.08] transition-colors duration-500 font-mono">
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between relative z-10">
        <div>
          {/* Brand-colored Icon container */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-primary shadow-lg shadow-primary/5 group-hover:scale-105 group-hover:border-primary/40 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 mb-5">
            <IconComponent className="h-5 w-5" />
          </div>

          {/* Title */}
          <motion.h3
            layoutId={isReduced ? undefined : `card-title-${p.title}`}
            className="text-lg font-bold leading-snug tracking-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-2.5"
          >
            {p.title}
          </motion.h3>

          {/* Short Description */}
          <p className="mb-4 text-xs leading-relaxed text-white/60 line-clamp-2 min-h-[2rem]">
            {p.description}
          </p>

          {/* Features Preview */}
          {p.features && p.features.length > 0 && (
            <ul className="mb-4 space-y-1.5">
              {p.features.slice(0, 2).map((feat, idx) => (
                <li key={idx} className="flex gap-2 text-[10px] text-white/50 leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-gradient-brand" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tags + Action Button */}
        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-white/80 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="rounded-full bg-white/5 border border-white/5 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-white/40">
                +{p.tags.length - 3}
              </span>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full pt-3 border-t border-white/5 flex justify-center">
            <div className="w-full py-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all duration-300 text-[10px] text-center uppercase tracking-wider">
              {t.viewMore}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Projects({
  setSelectedProject,
}: {
  setSelectedProject: (p: (typeof PROJECTS)[number] | null) => void;
}) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative">
          <SectionHeading eyebrow={t.sections.projects.eyebrow} title={t.sections.projects.title} />
          <div className="absolute right-0 top-0 sm:top-1.5">
            <div className="card-glass bg-black/20 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-widest text-foreground/90 uppercase inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand animate-pulse" />
              <span>
                {t.totalProjects}: {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
              >
                <ProjectCard p={p} i={i} onOpenDetails={() => setSelectedProject(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {PROJECTS.length > 3 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-primary/45 hover:text-primary hover:glow-brand shadow-lg cursor-pointer"
            >
              {showAll ? t.viewLess : t.viewMore}
              <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t.sections.skills.eyebrow} title={t.sections.skills.title} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              whileHover={{ y: -4 }}
              className="card-glass rounded-xl px-4 py-3 text-center text-sm font-medium transition-colors hover:border-primary/60"
            >
              {s}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap text-lg font-semibold text-muted-foreground/60"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span key={i} className="flex items-center gap-8">
                {s}
                <span className="text-primary">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const { t } = useLanguage();
  return (
    <section id="certs" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t.sections.certs.eyebrow} title={t.sections.certs.title} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-glass flex items-start gap-3 rounded-xl p-5 transition-colors hover:border-primary/60"
            >
              <Award className="mt-0.5 h-5 w-5 flex-none text-primary" />
              <span className="text-sm font-medium">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const { t } = useLanguage();
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t.sections.education.eyebrow} title={t.sections.education.title} />
        <div className="relative space-y-6 border-l border-border pl-8">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[37px] top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-brand">
                <GraduationCap className="h-2.5 w-2.5 text-white" />
              </span>
              <div className="card-glass rounded-xl p-5">
                <p className="text-xs text-muted-foreground">{e.period}</p>
                <h3 className="mt-1 font-semibold">{e.degree}</h3>
                <p className="text-sm text-muted-foreground">{e.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [state, setState] = useState<"idle" | "sent">("idle");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setState("sent");
        setTimeout(() => setState("idle"), 3000);
      }}
      className="card-glass space-y-4 rounded-2xl p-6"
    >
      {["Name", "Email"].map((label) => (
        <div key={label} className="group relative">
          <input
            required
            type={label === "Email" ? "email" : "text"}
            placeholder={label}
            className="peer w-full rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-secondary"
          />
          <span className="pointer-events-none absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-brand transition-transform peer-focus:scale-x-100" />
        </div>
      ))}
      <div className="group relative">
        <textarea
          required
          rows={4}
          placeholder="Your message"
          className="peer w-full resize-none rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-secondary"
        />
        <span className="pointer-events-none absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-brand transition-transform peer-focus:scale-x-100" />
      </div>
      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] hover:glow-brand"
      >
        {state === "sent" ? "Message sent ✓" : "Send Message"}
        {state !== "sent" && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </button>
    </form>
  );
}

function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t.sections.contact.eyebrow} title={t.sections.contact.title} />
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="max-w-md text-muted-foreground">
              Open to internships, research collaborations and freelance projects in science and
              full-stack development. Reach out and let's talk.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  className="hover:text-foreground text-muted-foreground"
                  href="mailto:alwinantony084@gmail.com"
                >
                  alwinantony084@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">(+91) 8075922928</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Ernakulam, Kerala, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-primary" />
                <a
                  className="text-muted-foreground hover:text-foreground"
                  href="https://linkedin.com/in/alwin-antony-babu-7a7786324"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/alwin-antony-babu-7a7786324
                </a>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} Alwin Antony Babu.
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: Linkedin, href: "https://linkedin.com/in/alwin-antony-babu-7a7786324" },
            { icon: Mail, href: "mailto:alwinantony084@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:scale-110 hover:border-primary/60 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#home"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/60 hover:text-foreground"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

interface ProjectDetailsModalProps {
  p: (typeof PROJECTS)[number] | (typeof CONFERENCES)[number];
  onClose: () => void;
}

function ProjectDetailsModal({ p, onClose }: ProjectDetailsModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const getModalIcon = (tags: string[]) => {
    if (tags.includes("Research") || tags.includes("ADAS")) return BookOpen;
    if (tags.includes("AI")) return Sparkles;
    if (tags.includes("Security") || tags.includes("Auth")) return Shield;
    if (tags.includes("Scikit-learn")) return Cpu;
    if (tags.includes("Algorithms")) return GitBranch;
    return Code2;
  };

  const IconComponent = getModalIcon(p.tags);
  const githubUrl = "github" in p ? (p as { github?: string }).github : undefined;
  const demoUrl = "demo" in p ? (p as { demo?: string }).demo : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[32px] border border-white/10 bg-[#0c0c1d]/95 backdrop-blur-2xl text-foreground flex flex-col shadow-2xl p-6 sm:p-10 scrollbar-thin"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/10 hover:border-white text-white hover:bg-black/80 hover:scale-105 transition-all duration-300 cursor-pointer"
          aria-label="Close details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Section with Icon and Title */}
        <div className="flex items-center gap-4 mb-6 pr-8">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-primary shadow-lg shadow-primary/5">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {p.title}
            </h2>
          </div>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Detailed Description */}
        <div className="mb-6">
          <p className="text-sm leading-relaxed text-white/70">{p.detailedDescription}</p>
        </div>

        {/* Key Features List */}
        {p.features && p.features.length > 0 && (
          <div className="mb-8 border-t border-white/5 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
              Key Highlights
            </h4>
            <ul className="space-y-3">
              {p.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-xs text-white/50 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-brand shadow-sm" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        {(githubUrl || demoUrl) && (
          <div className="flex flex-wrap gap-3 border-t border-white/5 pt-6 mt-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand hover:glow-brand text-white font-semibold py-3 text-xs text-center shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Github className="h-4 w-4" />
                {t.viewCode}
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 text-xs text-center shadow-md transition-colors cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" />
                {t.liveDemo}
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Conferences({
  setSelectedProject,
}: {
  setSelectedProject: (p: (typeof CONFERENCES)[number] | null) => void;
}) {
  const { t } = useLanguage();
  const isReduced = useReducedMotion();

  return (
    <section id="conferences" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t.sections.conferences.eyebrow}
          title={t.sections.conferences.title}
        />

        <div className="grid gap-6 lg:grid-cols-1">
          {CONFERENCES.map((c, i) => (
            <motion.article
              key={c.title}
              layoutId={isReduced ? undefined : `conf-card-bg-${c.title}`}
              onClick={() => setSelectedProject(c)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={isReduced ? undefined : { y: -6 }}
              whileTap={isReduced ? undefined : { scale: 0.99 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row gap-6 overflow-hidden rounded-[32px] bg-[#0c0c1d]/60 backdrop-blur-2xl shadow-xl shadow-black/30 card-glow-hover p-6 md:p-8 cursor-pointer"
            >
              {/* 1px Gradient Border */}
              <div
                className="absolute inset-0 rounded-[32px] pointer-events-none p-[1px] opacity-15"
                style={{
                  background: "var(--gradient-brand)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                }}
              />

              {/* Left Column: Publication metadata */}
              <div className="relative flex flex-col justify-start items-start md:w-[180px] flex-shrink-0 pb-6 md:pb-0 md:pr-6 border-b md:border-b-0 md:border-r border-white/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-primary shadow-lg shadow-primary/5 group-hover:scale-105 group-hover:border-primary/40 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 mb-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary/95">
                  ICAET-2025
                </div>
                <span className="text-[10px] font-medium text-white/40 mt-3.5 uppercase tracking-wider font-mono">
                  Research Paper
                </span>
                <span className="text-[10px] text-white/30 mt-1">Published & Presented</span>
              </div>

              {/* Right Column: Content */}
              <div className="flex flex-1 flex-col justify-between pt-2 md:pt-0">
                <div>
                  {/* Title */}
                  <motion.h3
                    layoutId={isReduced ? undefined : `conf-title-${c.title}`}
                    className="text-xl font-bold leading-snug tracking-tight text-white group-hover:text-primary transition-colors duration-300 mb-3"
                  >
                    {c.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-white/60 line-clamp-3">
                    {c.detailedDescription}
                  </p>

                  {/* Key highlights */}
                  <ul className="mb-4 space-y-1.5">
                    {c.features.slice(0, 3).map((f, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-white/50 leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags + Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4 mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-300">
                    {t.viewMore}
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[number] | (typeof CONFERENCES)[number] | null
  >(null);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.href.replace("#", "")));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <motion.div
        style={{ width: progress }}
        className="fixed left-0 top-0 z-50 h-0.5 bg-gradient-brand"
      />
      <CursorBlob />
      <Navbar activeSection={activeSection} />
      <main className="relative z-10">
        <Hero start={!loading} />
        <About />
        <Experience />
        <Projects setSelectedProject={setSelectedProject} />
        <Conferences setSelectedProject={setSelectedProject} />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal p={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
