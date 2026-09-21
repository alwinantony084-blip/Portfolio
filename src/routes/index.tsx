import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Alwin Antony Babu | Data Scientist & Full-Stack Developer Portfolio — Kochi, Kerala",
      },
      {
        name: "description",
        content:
          "Explore the portfolio of Alwin Antony Babu — a Data Scientist and Full-Stack Developer from Kochi, Kerala. View projects in Python, MERN stack, ML/AI, and more.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
