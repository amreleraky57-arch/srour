import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srour Mamdouh — Creative Designer Portfolio" },
      { name: "description", content: "Graphic Designer, Video Editor & Motion Designer crafting cinematic brand experiences." },
      { property: "og:title", content: "Srour Mamdouh — Creative Designer Portfolio" },
      { property: "og:description", content: "Cinematic brand, motion & video design portfolio." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
