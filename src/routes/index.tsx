import { createFileRoute } from "@tanstack/react-router";
import BirthdayApp from "../components/BirthdayApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy 21st Birthday Keerthana Shree ❤️" },
      { name: "description", content: "A special birthday surprise made with love for Keerthana Shree" },
      { property: "og:title", content: "Happy 21st Birthday Keerthana Shree ❤️" },
      { property: "og:description", content: "Something special awaits you..." },
    ],
  }),
  component: Index,
});

function Index() {
  return <BirthdayApp />;
}
