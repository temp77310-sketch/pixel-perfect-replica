import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, InfoCard, PillButton, SlideShell, Source, Stat, softSpring, spring, useDragRotate } from "./ui";
import { generations } from "./data";
import hero from "@/assets/m4-hero.png";
import serie4 from "@/assets/serie4-side.png";
import m4side from "@/assets/m4-side.png";

/* ───────────────────────────── 1 · PORTADA ───────────────────────────── */

export function Slide01() {
  const { rot, handlers } = useDragRotate(12);

  return (
    <SlideShell tone="dark">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <Eyebrow tone="dark">Presentación</Eyebrow>
          <h1 className="mt-6 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            BMW M4
            <br />
            <span className="text-ink-muted">Competition</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            Hola, me llamo Moon y hoy voy a presentaros el BMW M4 Competition. Voy a hablar sobre su
            historia, diseño, motor, prestaciones, tecnología y algunas de sus características
            principales.
          </p>
        </div>

        <div
          data-no-swipe
          {...handlers}
          className="no-select relative cursor-grab active:cursor-grabbing"
          style={{ perspective: 1400 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={hero}
              alt="BMW M4 Competition vista tres cuartos"
              width={1600}
              height={900}
              animate={{ rotateY: rot.y, rotateX: rot.x }}
              transition={spring}
              className="car-shadow w-full"
              style={{ transformStyle: "preserve-3d" }}
              draggable={false}
            />
          </motion.div>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-ink-muted/70">
            Arrastra para inspeccionar
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

/* ─────────────────────── 2 · ¿QUÉ ES EL BMW M4? ─────────────────────── */

const morphNotes = [
  { at: 25, title: "Carrocería", text: "El M4 ensancha los pasos de rueda para alojar una vía más ancha." },
  { at: 50, title: "Paragolpes", text: "Entradas de aire mucho mayores para refrigerar motor y frenos." },
  { at: 75, title: "Ruedas y frenos", text: "Llantas M específicas y frenos de mayor tamaño con pinzas pintadas." },
  { at: 95, title: "Escapes", text: "Cuatro salidas de escape, la firma visual más clara del M4." },
];

export function Slide02() {
  const [pos, setPos] = useState(18);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const note = [...morphNotes].reverse().find((n) => pos >= n.at);

  return (
    <SlideShell>
      <div className="flex flex-col gap-8">
        <div className="max-w-2xl">
          <Eyebrow>02 · Qué es</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">De Serie 4 a M4</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            El BMW M4 es la versión deportiva del BMW Serie 4. La M viene de BMW Motorsport, la parte
            de BMW encargada de crear sus coches más deportivos y potentes.
          </p>
        </div>

        <div
          ref={ref}
          data-no-swipe
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            update(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && update(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          className="no-select relative aspect-[16/8] w-full cursor-ew-resize overflow-hidden rounded-3xl bg-secondary"
        >
          <img
            src={serie4}
            alt="BMW Serie 4 Coupé de perfil"
            loading="lazy"
            width={1408}
            height={800}
            className="absolute inset-0 h-full w-full object-contain p-6"
            draggable={false}
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            <div className="absolute inset-0 bg-accent" />
            <img
              src={m4side}
              alt="BMW M4 Competition de perfil"
              loading="lazy"
              width={1408}
              height={800}
              className="absolute inset-0 h-full w-full object-contain p-6"
              draggable={false}
            />
          </div>

          <div className="absolute inset-y-0 w-px bg-foreground/25" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-lift">
              <span className="text-xs tracking-widest text-muted-foreground">‹ ›</span>
            </div>
          </div>

          <span className="absolute top-5 left-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Serie 4
          </span>
          <span className="absolute top-5 right-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
            M4 Competition
          </span>
        </div>

        <div className="min-h-[92px]">
          <AnimatePresence mode="wait">
            {note && (
              <InfoCard key={note.title} title={note.title} className="max-w-xl">
                {note.text}
              </InfoCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
}

/* ────────────────────────────── 3 · HISTORIA ────────────────────────────── */

export function Slide03() {
  const [i, setI] = useState(5);
  const g = generations[i];

  return (
    <SlideShell tone="dark">
      <div className="flex flex-col gap-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow tone="dark">03 · Historia</Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">Seis generaciones</h2>
          </div>
          <p className="max-w-xs text-sm text-ink-muted">
            De la homologación de carreras del E30 al M4 actual. Selecciona una generación.
          </p>
        </div>

        {/* Escenario 3D */}
        <div className="relative" style={{ perspective: 1500 }}>
          <div className="relative flex h-[190px] items-end justify-center sm:h-[240px]">
            {generations.map((gen, idx) => {
              const d = idx - i;
              const sel = d === 0;
              return (
                <motion.button
                  key={gen.code}
                  data-no-swipe
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={gen.name}
                  className="no-select absolute origin-bottom"
                  animate={{
                    x: d * 132,
                    z: sel ? 140 : -Math.abs(d) * 110,
                    scale: sel ? 1 : 0.58,
                    opacity: sel ? 1 : Math.max(0.16, 0.5 - Math.abs(d) * 0.1),
                    rotateY: sel ? 0 : d * -14,
                    filter: sel ? "blur(0px)" : "blur(1.5px)",
                  }}
                  transition={softSpring}
                  style={{ transformStyle: "preserve-3d", width: 460 }}
                >
                  <img
                    src={gen.image}
                    alt={gen.name}
                    loading="lazy"
                    width={1408}
                    height={800}
                    className="car-shadow w-full"
                    draggable={false}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Línea temporal */}
        <div data-no-swipe className="relative">
          <div className="absolute top-[7px] right-0 left-0 h-px bg-hairline-dark" />
          <div className="relative flex justify-between">
            {generations.map((gen, idx) => (
              <button
                key={gen.code}
                type="button"
                onClick={() => setI(idx)}
                className="no-select group flex flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "h-[15px] w-[15px] rounded-full border transition-colors",
                    idx === i ? "border-transparent bg-m-red" : "border-white/30 bg-ink group-hover:bg-white/20",
                  )}
                />
                <span
                  className={cn(
                    "tabular text-xs transition-colors",
                    idx === i ? "text-ink-foreground" : "text-ink-muted",
                  )}
                >
                  {gen.year}
                </span>
                <span
                  className={cn(
                    "text-[10px] tracking-[0.18em] transition-colors",
                    idx === i ? "text-ink-muted" : "text-ink-muted/50",
                  )}
                >
                  {gen.code}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Información */}
        <AnimatePresence mode="wait">
          <motion.div
            key={g.code}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={softSpring}
            className="grid gap-5 md:grid-cols-3"
          >
            <div className="glass-panel-dark rounded-3xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Especial</p>
              <p className="mt-2 text-sm leading-relaxed">{g.special}</p>
            </div>
            <div className="glass-panel-dark rounded-3xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Producción</p>
              <p className="mt-2 text-sm leading-relaxed">{g.production}</p>
            </div>
            <div className="glass-panel-dark rounded-3xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Importancia</p>
              <p className="mt-2 text-sm leading-relaxed">{g.importance}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {g.specs.map((s) => (
            <Stat key={s.label} tone="dark" value={s.value} label={s.label} />
          ))}
          <div className="ml-auto max-w-sm">
            <Source tone="dark">
              Cifras históricas aproximadas ampliamente citadas; cuando no existe dato oficial se indica.
            </Source>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export { PillButton };
