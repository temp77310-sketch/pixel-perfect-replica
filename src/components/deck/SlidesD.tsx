import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, PillButton, SlideShell, Source, softSpring, spring, useDragRotate } from "./ui";
import { sources, versions } from "./data";
import hero from "@/assets/m4-hero.png";

/* ──────────────────────────── 10 · VERSIONES ──────────────────────────── */

export function Slide10() {
  const [id, setId] = useState(versions[0].id);
  const v = versions.find((x) => x.id === id)!;

  const rows: { label: string; value: string }[] = [
    { label: "Potencia", value: v.power },
    { label: "Tracción", value: v.drive },
    { label: "0–100 km/h", value: v.accel },
    { label: "Peso", value: v.weight },
  ];

  return (
    <SlideShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>10 · Versiones</Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">Tres formas del mismo coche</h2>
          </div>
          <div data-no-swipe className="flex flex-wrap gap-2">
            {versions.map((x) => (
              <PillButton key={x.id} active={x.id === id} onClick={() => setId(x.id)}>
                {x.name}
              </PillButton>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-secondary">
            <AnimatePresence mode="wait">
              <motion.img
                key={v.id}
                src={v.image}
                alt={v.name}
                loading="lazy"
                width={1408}
                height={800}
                initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(10px)" }}
                transition={softSpring}
                className="absolute inset-0 h-full w-full object-contain p-6"
                draggable={false}
              />
            </AnimatePresence>
            <span className="absolute bottom-5 left-6 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {v.name}
            </span>
          </div>

          <div>
            <div className="divide-y divide-border border-y border-border">
              {rows.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-6 py-4">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {r.label}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={v.id + r.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="tabular text-right text-sm font-medium"
                    >
                      {r.value}
                    </motion.span>
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{v.focus}</p>
            <div className="mt-5">
              <Source>
                Las tres comparten el mismo motor de 3.0 L biturbo con distinta puesta a punto. Los
                pesos dependen de la homologación y del equipamiento elegido.
              </Source>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ─────────────────── 11 · VENTAJAS Y DESVENTAJAS ─────────────────── */

const pros = [
  { id: "tec", label: "Tecnología", text: "Amortiguación adaptativa, diferencial M activo, modos de conducción configurables y dos memorias M1/M2 en el volante." },
  { id: "dis", label: "Diseño", text: "Carrocería ensanchada, proporciones de coupé y detalles propios de BMW M como los cuatro escapes." },
  { id: "pre", label: "Prestaciones", text: "Hasta 530 CV y 3,5 s de 0 a 100 km/h en la versión Competition xDrive." },
  { id: "com", label: "Comportamiento deportivo", text: "Chasis muy equilibrado y reglable: puede ser cómodo en carretera y muy preciso en circuito." },
];

const cons = [
  { id: "pvp", label: "Precio elevado", text: "Es un deportivo de gama alta y su precio está muy por encima del de un Serie 4 normal. El equipamiento opcional lo encarece aún más." },
  { id: "con", label: "Consumo", text: "Un motor de 3.0 L biturbo con estas prestaciones consume bastante, sobre todo si se aprovecha su potencia." },
  { id: "man", label: "Costes de mantenimiento", text: "Neumáticos anchos, frenos de gran tamaño y revisiones de un coche M: todo cuesta más que en un coche normal." },
];

export function Slide11() {
  const [sel, setSel] = useState<string | null>(null);

  const column = (
    title: string,
    items: typeof pros,
    accent: "up" | "down",
  ) => (
    <div className="rounded-3xl border border-border p-6">
      <div className="flex items-center gap-3">
        <span
          className={cn("h-[3px] w-8 rounded-full", accent === "up" ? "bg-m-blue" : "bg-m-red")}
        />
        <h3 className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {title}
        </h3>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((it) => {
          const open = sel === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => setSel(open ? null : it.id)}
              className={cn(
                "no-select block w-full rounded-2xl px-4 py-3 text-left transition-colors",
                open ? "bg-secondary" : "hover:bg-secondary/60",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-medium">{it.label}</span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={spring}
                  className="text-muted-foreground"
                >
                  +
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 block">{it.text}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <SlideShell>
      <div className="flex flex-col gap-8">
        <div className="max-w-2xl">
          <Eyebrow>11 · Balance</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">Lo bueno y lo que hay que asumir</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Toca cada punto para ver la explicación.
          </p>
        </div>
        <div data-no-swipe className="grid gap-5 md:grid-cols-2">
          {column("Ventajas", pros, "up")}
          {column("Desventajas", cons, "down")}
        </div>
      </div>
    </SlideShell>
  );
}

/* ──────────────────────────── 12 · CONCLUSIÓN ──────────────────────────── */

export function Slide12() {
  const { rot, handlers } = useDragRotate(10);
  const [showSources, setShowSources] = useState(false);

  return (
    <SlideShell tone="dark">
      <div className="flex flex-col items-center gap-10 text-center">
        <div
          data-no-swipe
          {...handlers}
          className="no-select w-full max-w-3xl cursor-grab active:cursor-grabbing"
          style={{ perspective: 1400 }}
        >
          <motion.img
            src={hero}
            alt="BMW M4 Competition"
            loading="lazy"
            width={1600}
            height={900}
            animate={{ rotateY: rot.y || [-3, 3, -3], rotateX: rot.x, y: [0, -8, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="car-shadow w-full"
            style={{ transformStyle: "preserve-3d" }}
            draggable={false}
          />
        </div>

        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          <p>
            En conclusión, el BMW M4 combina potencia y deportividad, pero también se puede utilizar
            en el día a día.
          </p>
          <p>Lo que más destaca es su motor, aceleración, tecnología y diseño.</p>
          <p className="text-ink-foreground">Gracias por escucharme.</p>
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl">BMW M4 Competition</h2>
          <p className="tabular mt-2 text-xs tracking-[0.3em] text-ink-muted">12 / 12</p>
        </div>

        <div data-no-swipe className="w-full max-w-2xl">
          <PillButton tone="dark" onClick={() => setShowSources((v) => !v)}>
            {showSources ? "Ocultar fuentes" : "Fuentes"}
          </PillButton>
          <AnimatePresence>
            {showSources && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5 space-y-2 overflow-hidden text-left"
              >
                {sources.map((s) => (
                  <li key={s}>
                    <Source tone="dark">{s}</Source>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
}
