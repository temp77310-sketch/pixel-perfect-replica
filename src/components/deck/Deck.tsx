import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLang, useTr } from "./i18n";
import { Slide01, Slide02, Slide03 } from "./SlidesA";
import { Slide04, Slide05, Slide06 } from "./SlidesB";
import { Slide07, Slide08, Slide09 } from "./SlidesC";
import { Slide10, Slide11, Slide12 } from "./SlidesD";

const slides = [
  { id: 1, title: "Introducción", tone: "dark", C: Slide01 },
  { id: 2, title: "Qué es el M4", tone: "light", C: Slide02 },
  { id: 3, title: "Historia", tone: "dark", C: Slide03 },
  { id: 4, title: "Diseño", tone: "light", C: Slide04 },
  { id: 5, title: "Motor", tone: "dark", C: Slide05 },
  { id: 6, title: "Prestaciones", tone: "light", C: Slide06 },
  { id: 7, title: "Transmisión", tone: "light", C: Slide07 },
  { id: 8, title: "Ajustes", tone: "dark", C: Slide08 },
  { id: 9, title: "Interior", tone: "light", C: Slide09 },
  { id: 10, title: "Versiones", tone: "light", C: Slide10 },
  { id: 11, title: "Balance", tone: "light", C: Slide11 },
  { id: 12, title: "Conclusión", tone: "dark", C: Slide12 },
] as const;

export function Deck() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const start = useRef<{ x: number; y: number } | null>(null);
  const locked = useRef(false);
  const [isFs, setIsFs] = useState(false);
  const tr = useTr();
  const lang = useLang();

  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  // Pantalla completa automática: se intenta al entrar y, si el navegador
  // lo bloquea, en el primer toque/clic/tecla.
  useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    const tryFs = () => {
      if (!document.fullscreenElement)
        void document.documentElement.requestFullscreen?.().catch(() => {});
      window.removeEventListener("pointerup", tryFs);
      window.removeEventListener("keydown", tryFs);
    };
    void document.documentElement.requestFullscreen?.().catch(() => {});
    window.addEventListener("pointerup", tryFs);
    window.addEventListener("keydown", tryFs);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("pointerup", tryFs);
      window.removeEventListener("keydown", tryFs);
    };
  }, []);

  const go = useCallback((next: number) => {
    setState(([cur]) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, next));
      if (clamped === cur) return [cur, 0];
      return [clamped, clamped > cur ? 1 : -1];
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        setState(([c]) => (c < slides.length - 1 ? [c + 1, 1] : [c, 0]));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setState(([c]) => (c > 0 ? [c - 1, -1] : [c, 0]));
      } else if (e.key === "Home") setState([0, -1]);
      else if (e.key === "End") setState([slides.length - 1, 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Rueda / trackpad horizontal y vertical, con bloqueo entre gestos
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-no-swipe]")) return;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 25 || locked.current) return;
      locked.current = true;
      setState(([c]) => {
        const n = d > 0 ? c + 1 : c - 1;
        return n >= 0 && n < slides.length ? [n, d > 0 ? 1 : -1] : [c, 0];
      });
      window.setTimeout(() => (locked.current = false), 700);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("[data-no-swipe]")) return;
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
  };

  const current = slides[index]!;
  const tone = current.tone;
  const Current = current.C;

  return (
    <div
      className={cn(
        "fixed inset-0 overflow-hidden transition-colors duration-500",
        tone === "dark" ? "bg-ink" : "bg-background",
      )}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: dir * 48, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: dir * -48, filter: "blur(10px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full overflow-y-auto"
        >
          <Current />
        </motion.div>
      </AnimatePresence>

      {/* Progreso */}
      <div
        data-no-swipe
        className="pointer-events-none absolute top-0 right-0 left-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10"
      >
        <span
          className={cn(
            "text-[11px] tracking-[0.22em] uppercase",
            tone === "dark" ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {tr(current.title)}
        </span>
        <div className="pointer-events-auto flex items-center gap-4">
          <span
            className={cn(
              "tabular text-[11px] tracking-[0.22em]",
              tone === "dark" ? "text-ink-muted" : "text-muted-foreground",
            )}
          >
            {String(index + 1).padStart(2, "0")} / 12
          </span>
          <button
            type="button"
            onClick={toggleFs}
            aria-label={tr(isFs ? "Salir de pantalla completa" : "Pantalla completa")}
            className={cn(
              "no-select flex h-9 w-9 items-center justify-center rounded-full border",
              tone === "dark"
                ? "border-hairline-dark bg-white/5 text-ink-foreground"
                : "border-border bg-card text-foreground shadow-soft",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={isFs ? "M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" : "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Puntos */}
      <div
        data-no-swipe
        className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={lang === "eu" ? `${tr(s.title)}: joan` : `Ir a ${s.title}`}
            onClick={() => go(i)}
            className="no-select p-1.5"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? tone === "dark" ? "w-6 bg-ink-foreground" : "w-6 bg-foreground"
                  : tone === "dark" ? "w-1.5 bg-white/25" : "w-1.5 bg-foreground/20",
              )}
            />
          </button>
        ))}
      </div>

      {/* Flechas */}
      <div data-no-swipe className="absolute right-6 bottom-6 z-40 flex gap-2 sm:right-10">
        <NavArrow tone={tone} dir="prev" disabled={index === 0} onClick={() => go(index - 1)} />
        <NavArrow
          tone={tone}
          dir="next"
          disabled={index === slides.length - 1}
          onClick={() => go(index + 1)}
        />
      </div>
    </div>
  );
}

function NavArrow({
  tone,
  dir,
  disabled,
  onClick,
}: {
  tone: "light" | "dark";
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const tr = useTr();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.9 }}
      aria-label={tr(dir === "prev" ? "Anterior" : "Siguiente")}
      className={cn(
        "no-select flex h-10 w-10 items-center justify-center rounded-full border transition-opacity",
        tone === "dark"
          ? "border-hairline-dark bg-white/5 text-ink-foreground"
          : "border-border bg-card text-foreground shadow-soft",
        disabled && "opacity-30",
      )}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
