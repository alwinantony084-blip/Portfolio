import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../context/LanguageContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// ── JSON-LD Structured Data for AEO & GEO (Answer & Generative Engine Optimization)
const baseUrl = "https://alwinantonybabu.vercel.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseUrl}/#person`,
  name: "Alwin Antony Babu",
  givenName: "Alwin",
  familyName: "Babu",
  jobTitle: "Data Scientist & Full-Stack Developer",
  description:
    "Alwin Antony Babu is a BCA graduate and Data Scientist / Full-Stack Developer based in Kochi, Kerala, India. He specialises in Python, the MERN stack, machine learning with Scikit-learn, and building AI-powered web applications.",
  url: baseUrl,
  image: `${baseUrl}/assets/6.webp`,
  email: "mailto:alwinantony084@gmail.com",
  sameAs: [
    "https://linkedin.com/in/alwin-antony-babu-7a7786324",
    "https://github.com/alwinantony084-blip",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Rajagiri College of Management and Applied Sciences",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ernakulam",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
  },
  knowsAbout: [
    "Python",
    "JavaScript",
    "Data Science",
    "Machine Learning",
    "MERN Stack",
    "Full-Stack Development",
    "Flask",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Tableau",
    "Prompt Engineering",
    "Artificial Intelligence",
    "C++",
    "PHP",
    "MySQL",
    "HTML",
    "CSS",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Advanced Python for Data Analysis" },
    { "@type": "EducationalOccupationalCredential", name: "Cybersecurity & Ethical Hacking" },
    {
      "@type": "EducationalOccupationalCredential",
      name: "AI Builders Lab – Google for Developers",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Prompt Engineering Workshop – AI Summit 2024",
    },
  ],
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Data Scientist Intern",
      occupationLocation: {
        "@type": "City",
        name: "Ernakulam",
      },
    },
    {
      "@type": "Occupation",
      name: "Web Development Intern",
    },
    {
      "@type": "Occupation",
      name: "Front End Developer Intern",
    },
    {
      "@type": "Occupation",
      name: "AI Intern",
      occupationLocation: {
        "@type": "City",
        name: "Kothamangalam",
      },
    },
  ],
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${baseUrl}/#profilepage`,
  url: baseUrl,
  name: "Alwin Antony Babu — Official Portfolio",
  mainEntity: { "@id": `${baseUrl}/#person` },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "Alwin Antony Babu — Portfolio",
  url: baseUrl,
  description:
    "Personal portfolio of Alwin Antony Babu — Data Scientist & Full-Stack Developer from Kochi, Kerala.",
  author: { "@id": `${baseUrl}/#person` },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "google-site-verification",
        content: "qfIGe4amOr5wJBhkgLpNkacpZ9D4qNtxKio1MRoMfNc",
      },
      { title: "Alwin Antony Babu — Data Scientist & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Alwin Antony Babu — BCA graduate, aspiring Data Scientist and Full-Stack Developer building AI, ML and web applications from Kochi, Kerala.",
      },
      { name: "author", content: "Alwin Antony Babu" },
      {
        name: "keywords",
        content:
          "Alwin Antony Babu, Data Scientist, Full-Stack Developer, Python Developer, MERN Stack, Machine Learning, AI, Kochi, Kerala, Portfolio, BCA, Scikit-learn, Flask, Web Developer",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },

      // ── Open Graph ─────────────────────────────────────────────────
      {
        property: "og:title",
        content: "Alwin Antony Babu — Data Scientist & Full-Stack Developer",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Alwin Antony Babu — BCA graduate, aspiring Data Scientist and Full-Stack Developer building AI, ML and web applications from Kochi, Kerala.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: baseUrl },
      { property: "og:site_name", content: "Alwin Antony Babu — Portfolio" },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e53e4b96-c85f-43ca-bb9e-c8a44823e887",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Alwin Antony Babu — Portfolio Preview" },

      // ── Twitter Card ───────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Alwin Antony Babu — Data Scientist & Full-Stack Developer",
      },
      {
        name: "twitter:description",
        content:
          "Portfolio of Alwin Antony Babu — BCA graduate, aspiring Data Scientist and Full-Stack Developer building AI, ML and web applications from Kochi, Kerala.",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e53e4b96-c85f-43ca-bb9e-c8a44823e887",
      },
      { name: "twitter:image:alt", content: "Alwin Antony Babu — Portfolio Preview" },
    ],
    links: [
      { rel: "canonical", href: baseUrl },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([personJsonLd, profilePageJsonLd, websiteJsonLd]),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
