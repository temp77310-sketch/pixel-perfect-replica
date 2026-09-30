import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTr } from "./i18n";
import { Eyebrow, Hotspot, InfoCard, PillButton, SlideShell, Source, Stat, softSpring, spring } from "./ui";
import gearbox from "@/assets/gearbox.png";
import drivetrain from "@/assets/drivetrain.png";
import suspension from "@/assets/suspension.png";
import steering from "@/assets/steering.png";
import interior from "@/assets/interior.jpg";
import m4rear from "@/assets/m4-rear.png";

/* ──────────────────── 7 · TRANSMISIÓN Y TRACCIÓN ──────────────────── */

const chain = [
  { id: "motor", label: "Motor", text: "El motor de 3.0 litros genera la potencia y la entrega en forma de giro al volante motor." },
  { id: "caja", label: "Caja", text: "Caja automática M Steptronic de 8 velocidades con convertidor de par. Adapta la relación de marcha para mantener el motor en su zona útil y permite cambiar con las levas." },
  { id: "transmision", label: "Transmisión", text: "El árbol de transmisión lleva el giro hacia el diferencial trasero, que reparte la fuerza entre las dos ruedas del mismo eje." },
  { id: "ruedas", label: "Ruedas", text: "Las ruedas convierten ese giro en avance. El diferencial M activo decide cuánta fuerza recibe cada rueda trasera según el agarre." },
];

const xModes = [
  { id: "4wd", label: "4WD", front: 40, text: "Modo 4WD: el sistema reparte la fuerza entre ambos ejes para máxima tracción y estabilidad, con prioridad trasera." },
  { id: "4wds", label: "4WD Sport", front: 20, text: "Modo 4WD Sport: envía más fuerza al eje trasero para un comportamiento más deportivo, manteniendo la ayuda delantera." },
  { id: "2wd", label: "2WD", front: 0, text: "Modo 2WD: toda la fuerza va al eje trasero, como un propulsión clásico. Pensado para circuito y conductores expertos." },
];

export function Slide07() {
  const tr = useTr();
  const [sel, setSel] = useState("caja");
  const [front, setFront] = useState(40);
  const node = chain.find((c) => c.id === sel)!;
  const img = sel === "caja" ? gearbox : sel === "ruedas" ? suspension : drivetrain;

  return (
    <SlideShell>
      <div className="flex flex-col gap-5 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{tr("07 · Transmisión y tracción")}</Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">{tr("Cómo llega la fuerza al suelo")}</h2>
          </div>
          <div className="max-w-xs">
            <Source>
              {tr("Caja automática M Steptronic de 8 velocidades. La tracción total M xDrive está disponible según versión y puede pasar a modo 2WD (solo eje trasero).")}
</Source>
          </div>
        </div>

        {/* Cadena mecánica */}
        <div data-no-swipe className="relative rounded-3xl bg-secondary p-5">
          <div className="relative flex items-stretch justify-between gap-2 sm:gap-4">
            {chain.map((c, idx) => (
              <div key={c.id} className="flex flex-1 items-center gap-2 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setSel(c.id)}
                  className={cn(
                    "no-select flex-1 rounded-2xl px-2 py-3 text-center text-xs font-medium transition-colors sm:text-sm",
                    sel === c.id ? "bg-card shadow-soft" : "text-muted-foreground hover:bg-card/60",
                  )}
                >
                  {tr(c.label)}
                </button>
                {idx < chain.length - 1 && (
                  <div className="relative hidden h-px w-10 bg-foreground/15 sm:block">
                    <motion.span
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-m-red"
                      animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.4, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
            <div className="relative aspect-[16/10] w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={sel}
                  src={img}
                  alt={tr(node.label)}
                  loading="lazy"
                  width={1200}
                  height={900}
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                  transition={softSpring}
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <InfoCard key={node.id} title={tr(node.label)}>
                {tr(node.text)}
              </InfoCard>
            </AnimatePresence>
          </div>
        </div>

        {/* Reparto xDrive */}
        <div data-no-swipe className="rounded-3xl border border-border p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
            <h3 className="text-lg">{tr("M xDrive · modos de tracción")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tr("Elige un modo para ver cómo se reparte la fuerza (valores orientativos).")}
</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {xModes.map((m) => (
                <PillButton key={m.id} active={front === m.front} onClick={() => setFront(m.front)}>
                  {m.label}
                </PillButton>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { l: "Eje delantero", v: front, c: "bg-m-blue" },
              { l: "Eje trasero", v: 100 - front, c: "bg-m-navy" },
            ].map((a) => (
              <div key={tr(a.l)} className="rounded-2xl bg-secondary p-4">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {tr(a.l)}
                </div>
                <div className="tabular font-display mt-1 text-3xl">{a.v}%</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <motion.div className={cn("h-full", a.c)} animate={{ width: `${a.v}%` }} transition={spring} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {tr(xModes.find((m) => m.front === front)?.text ?? "")}
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

/* ──────────────── 8 · TÚ DECIDES CÓMO SE COMPORTA ──────────────── */

type Ctrl = {
  id: string;
  label: string;
  options: [string, string];
  angle: number;
  text: [string, string];
  visual: string;
};

const controls: Ctrl[] = [
  {
    id: "motor",
    label: "Motor",
    options: ["Confort", "Sport"],
    angle: -90,
    visual: drivetrain,
    text: [
      "En Confort el acelerador responde de forma más progresiva: la potencia entra suave y el coche es más fácil de conducir por ciudad.",
      "En Sport el motor responde de inmediato al acelerador y mantiene más revoluciones. La misma potencia, entregada de forma más directa.",
    ],
  },
  {
    id: "direccion",
    label: "Dirección",
    options: ["Confort", "Sport"],
    angle: -30,
    visual: steering,
    text: [
      "La dirección pide menos esfuerzo: cómoda para maniobrar y para trayectos largos.",
      "La dirección se endurece y transmite mejor lo que hacen las ruedas delanteras, con una sensación más precisa.",
    ],
  },
  {
    id: "suspension",
    label: "Suspensión",
    options: ["Confort", "Sport"],
    angle: 30,
    visual: suspension,
    text: [
      "Los amortiguadores adaptativos se ablandan y absorben mejor los baches del día a día.",
      "Los amortiguadores se endurecen: la carrocería se inclina menos en curva y el coche se apoya mejor.",
    ],
  },
  {
    id: "cambio",
    label: "Cambio",
    options: ["Confort", "Sport"],
    angle: 90,
    visual: gearbox,
    text: [
      "La caja automática de 8 velocidades cambia de marcha de forma suave y sube pronto para ir más relajado.",
      "La caja retrasa los cambios, los ejecuta de forma más seca y sostiene la marcha al frenar y entrar en curva.",
    ],
  },
  {
    id: "traccion",
    label: "Tracción",
    options: ["4WD", "2WD"],
    angle: 150,
    visual: m4rear,
    text: [
      "M xDrive reparte la fuerza entre los dos ejes cuando hace falta, lo que da más agarre al acelerar.",
      "En modo 2WD toda la fuerza va al eje trasero, como en un BMW de propulsión clásico.",
    ],
  },
];

export function Slide08() {
  const tr = useTr();
  const [state, setState] = useState<Record<string, 0 | 1>>({
    motor: 0, direccion: 0, suspension: 0, cambio: 0, traccion: 0,
  });
  const [sel, setSel] = useState<string | null>(null);
  const [summary, setSummary] = useState(false);
  const active = controls.find((c) => c.id === sel);
  const sport = Object.values(state).filter(Boolean).length;

  const toggle = (id: string) => setState((s) => ({ ...s, [id]: s[id] ? 0 : 1 }));

  return (
    <SlideShell tone="dark">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
        <div data-no-swipe>
          <Eyebrow tone="dark">{tr("08 · Ajustes de conducción")}</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">{tr("Tú decides cómo se comporta.")}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
            {tr("El M4 permite modificar diferentes ajustes del coche para adaptar su comportamiento a la forma de conducir.")}
</p>

          <div className="mt-8 flex flex-wrap gap-2">
            <PillButton tone="dark" active={summary} onClick={() => setSummary((v) => !v)}>
              {tr("Personaliza")}
</PillButton>
            {summary && (
              <PillButton
                tone="dark"
                onClick={() => setState({ motor: 0, direccion: 0, suspension: 0, cambio: 0, traccion: 0 })}
              >
                {tr("Reiniciar")}
</PillButton>
            )}
          </div>

          <div className="mt-6 min-h-[170px]">
            <AnimatePresence mode="wait">
              {summary ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={softSpring}
                  className="glass-panel-dark rounded-3xl p-6"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    {tr("Tu configuración")}
</p>
                  <div className="mt-4 space-y-2">
                    {controls.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-sm">
                        <span className="text-ink-muted">{tr(c.label)}</span>
                        <button
                          type="button"
                          onClick={() => toggle(c.id)}
                          className="no-select rounded-full border border-hairline-dark px-3 py-1 text-xs tracking-wide"
                        >
                          {tr(c.options[state[c.id] ?? 0])}
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-ink-muted">
                    {tr(sport >= 4
                      ? "Configuración muy deportiva: respuesta directa y chasis firme."
                      : sport === 0
                        ? "Configuración de uso diario: suave, cómoda y fácil de conducir."
                        : "Configuración mixta: puedes endurecer solo lo que te interesa.")}
                  </p>
                </motion.div>
              ) : active ? (
                <InfoCard key={active.id} tone="dark" title={tr(active.label)}>
                  <p>{tr(active.text[state[active.id] ?? 0])}</p>
                  <button
                    type="button"
                    onClick={() => toggle(active.id)}
                    className="no-select mt-4 inline-flex items-center gap-3 rounded-full border border-hairline-dark px-4 py-2 text-xs tracking-[0.15em] uppercase"
                  >
                    <span className={cn((state[active.id] ?? 0) === 0 && "text-ink-foreground")}>
                      {tr(active.options[0])}
                    </span>
                    <span className="text-ink-muted">←→</span>
                    <span className={cn((state[active.id] ?? 0) === 1 && "text-ink-foreground")}>
                      {tr(active.options[1])}
                    </span>
                  </button>
                </InfoCard>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-ink-muted"
                >
                  {tr("Toca uno de los cinco mandos que rodean el volante.")}
</motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cockpit */}
        <div data-no-swipe className="relative mx-auto aspect-square w-full max-w-[460px]">
          <motion.div
            className="absolute inset-[18%]"
            animate={{ rotate: sel === "direccion" ? (state["direccion"] ? 16 : -16) : 0 }}
            transition={softSpring}
          >
            <img
              src={steering}
              alt="Volante M del BMW M4"
              loading="lazy"
              width={1104}
              height={1104}
              className="h-full w-full object-contain"
              draggable={false}
            />
          </motion.div>

          <AnimatePresence>
            {active && active.id !== "direccion" && (
              <motion.img
                key={active.id}
                src={active.visual}
                alt={tr(active.label)}
                loading="lazy"
                width={1200}
                height={900}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={softSpring}
                className="absolute inset-[22%] h-[56%] w-[56%] object-contain"
                draggable={false}
              />
            )}
          </AnimatePresence>

          {controls.map((c) => {
            const rad = (c.angle * Math.PI) / 180;
            const on = state[c.id] === 1;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => { setSel(sel === c.id ? null : c.id); setSummary(false); }}
                className="no-select absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${50 + Math.cos(rad) * 46}%`,
                  top: `${50 + Math.sin(rad) * 46}%`,
                }}
              >
                <motion.span
                  animate={{ rotate: on ? 34 : -34, scale: sel === c.id ? 1.08 : 1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full border transition-colors",
                    sel === c.id ? "border-white/40 bg-white/15" : "border-hairline-dark bg-ink-elevated",
                  )}
                >
                  <span className={cn("h-4 w-[2px] -translate-y-2 rounded-full", on ? "bg-m-red" : "bg-ink-muted")} />
                </motion.span>
                <span className="mt-2 block text-center text-[10px] tracking-[0.16em] text-ink-muted uppercase">
                  {tr(c.label)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

/* ───────────────────────────── 9 · INTERIOR ───────────────────────────── */

const interiorSpots = [
  { id: "asientos", x: 74, y: 62, label: "Asientos deportivos", text: "Asientos M con laterales muy marcados que sujetan el cuerpo en curva. En opción existen los asientos de carbono, más ligeros." },
  { id: "pantallas", x: 34, y: 34, label: "Pantallas", text: "Dos pantallas unidas bajo un mismo cristal curvo: una para la instrumentación y otra para el sistema central." },
  { id: "volante", x: 22, y: 56, label: "Volante M", text: "Volante de base plana con levas de cambio y los botones rojos M1 y M2, que guardan dos configuraciones completas del coche." },
  { id: "multimedia", x: 48, y: 40, label: "Sistema multimedia", text: "Sistema operativo BMW con navegación, conectividad y control por voz, manejable desde la pantalla táctil o el mando giratorio." },
  { id: "controles", x: 56, y: 72, label: "Controles", text: "En la consola central están los mandos físicos del cambio, los modos de conducción y el volumen: se usan sin mirar." },
];

export function Slide09() {
  const tr = useTr();
  const [sel, setSel] = useState<string | null>(null);
  const spot = interiorSpots.find((s) => s.id === sel);

  return (
    <SlideShell>
      <div className="flex flex-col gap-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{tr("09 · Interior")}</Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">{tr("Un puesto de conducción")}</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            {tr("Toca cualquier zona para acercarte y ver qué es.")}
</p>
        </div>

        <div
          data-no-swipe
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-secondary"
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: spot ? 1.9 : 1 }}
            transition={softSpring}
            style={{ transformOrigin: spot ? `${spot.x}% ${spot.y}%` : "50% 50%" }}
          >
            <img
              src={interior}
              alt="Interior del BMW M4 Competition"
              loading="lazy"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>

          {interiorSpots.map((s) => (
            <motion.div key={s.id} animate={{ opacity: !spot || spot.id === s.id ? 1 : 0 }}>
              <Hotspot
                tone="dark"
                x={s.x}
                y={s.y}
                label={tr(s.label)}
                active={sel === s.id}
                onClick={() => setSel(sel === s.id ? null : s.id)}
              />
            </motion.div>
          ))}

          <AnimatePresence>
            {spot && (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={softSpring}
                className="glass-panel absolute right-5 bottom-5 left-5 rounded-2xl p-5 sm:left-auto sm:max-w-sm"
              >
                <h3 className="text-base font-medium">{tr(spot.label)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tr(spot.text)}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2 pb-8">
          {interiorSpots.map((s) => (
            <PillButton key={s.id} active={sel === s.id} onClick={() => setSel(sel === s.id ? null : s.id)}>
              {tr(s.label)}
            </PillButton>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

export { Stat };
