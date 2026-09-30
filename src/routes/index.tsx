import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Deck } from "@/components/deck/Deck";
import { LanguagePicker } from "@/components/deck/LanguagePicker";
import { LangContext, type Lang } from "@/components/deck/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BMW M4 Competition · Presentación interactiva" },
      {
        name: "description",
        content:
          "Presentación interactiva en español sobre el BMW M4 Competition: historia, diseño, motor, prestaciones, transmisión, interior y versiones.",
      },
      { property: "og:title", content: "BMW M4 Competition · Presentación interactiva" },
      {
        property: "og:description",
        content:
          "Doce páginas interactivas sobre el BMW M4 Competition: historia del M3 al M4, motor S58 biturbo, 0–100 en 3,5 s y ajustes de conducción.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [lang, setLang] = useState<Lang | null>(null);
  if (!lang) return <LanguagePicker onPick={setLang} />;
  return (
    <LangContext.Provider value={lang}>
      <Deck />
    </LangContext.Provider>
  );
}
