import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTr } from "./i18n";
import { Eyebrow, Hotspot, InfoCard, PillButton, SlideShell, Source, Stat, softSpring, spring, useDragRotate } from "./ui";
import hero from "@/assets/m4-hero.png";
import engineImg from "@/assets/engine.png";
import m4side from "@/assets/m4-side.png";

/* ────────────────────────────── 4 · DISEÑO ────────────────────────────── */

const designSpots = [
  { id: "parrilla", x: 21, y: 54, label: "Parrilla", text: "Uno de los elementos más reconocibles del diseño del M4: la parrilla vertical de gran tamaño, que además mejora la entrada de aire al motor." },
  { id: "faros", x: 34, y: 47, label: "Faros", text: "Faros LED estrechos que estilizan el frontal y refuerzan la sensación de anchura del coche." },
  { id: "carroceria", x: 63, y: 44, label: "Carrocería", text: "Aletas ensanchadas respecto al Serie 4 para alojar una vía más ancha y neumáticos de mayor tamaño." },
  { id: "aire", x: 22, y: 75, label: "Entradas de aire", text: "Grandes aberturas laterales que llevan aire a los radiadores y a la refrigeración de los frenos." },
  { id: "ruedas", x: 62, y: 64, label: "Ruedas y frenos", text: "Llantas M específicas y frenos de gran diámetro, con pinzas pintadas visibles a través de los radios." },
  { id: "escapes", x: 92, y: 66, label: "Cuatro escapes", text: "Las cuatro salidas de escape son la firma visual clásica de un BMW M." },
];

export function Slide04() {
  const tr = useTr();
  const [sel, setSel] = useState<string | null>(null);
  const { rot, handlers } = useDragRotate(10);
  const spot = designSpots.find((s) => s.id === sel);

  return (
    <SlideShell>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)] lg:items-center">
        <div>
          <div className="lg:hidden">
            <Eyebrow>{tr("04 · Diseño")}</Eyebrow>
            <h2 className="mt-4 mb-6 text-4xl">{tr("Un coche inspeccionable")}</h2>
          </div>
          <div
            data-no-swipe
            {...handlers}
            className="no-select relative aspect-[16/10] w-full cursor-grab overflow-hidden rounded-3xl bg-secondary active:cursor-grabbing"
            style={{ perspective: 1400 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: spot ? 1.85 : 1,
                rotateY: spot ? 0 : rot.y,
                rotateX: spot ? 0 : rot.x,
              }}
              transition={softSpring}
              style={{
                transformOrigin: spot ? `${spot.x}% ${spot.y}%` : "50% 50%",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={hero}
                alt="BMW M4 Competition, vista de diseño"
                loading="lazy"
                width={1600}
                height={900}
                className="h-full w-full object-contain p-4"
                draggable={false}
              />
            </motion.div>

            {designSpots.map((s) => (
              <motion.div
                key={s.id}
                animate={{ opacity: !spot || spot.id === s.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-auto"
              >
                <Hotspot
                  x={s.x}
                  y={s.y}
                  label={tr(s.label)}
                  active={sel === s.id}
                  onClick={() => setSel(sel === s.id ? null : s.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div data-no-swipe>
          <div className="hidden lg:block">
            <Eyebrow>{tr("04 · Diseño")}</Eyebrow>
            <h2 className="mt-4 text-4xl">{tr("Un coche inspeccionable")}</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {tr("Toca cualquier punto para acercarte a esa zona. Arrastra sobre el coche para girarlo ligeramente.")}
</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {designSpots.map((s) => (
              <PillButton key={s.id} active={sel === s.id} onClick={() => setSel(s.id)}>
                {tr(s.label)}
              </PillButton>
            ))}
            {spot && (
              <PillButton onClick={() => setSel(null)}>{tr("← Ver coche entero")}</PillButton>
            )}
          </div>
          <div className="mt-5 min-h-[150px]">
            <AnimatePresence mode="wait">
              {spot && (
                <InfoCard key={spot.id} title={tr(spot.label)}>
                  {tr(spot.text)}
                </InfoCard>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ────────────────────────────── 5 · MOTOR ────────────────────────────── */

const engineParts = [
  { id: "motor", x: 50, y: 52, label: "Motor", text: "Bloque de 3.0 litros con seis cilindros en línea, la configuración clásica de BMW. Es compacto, equilibrado y sube de vueltas con suavidad." },
  { id: "turbo", x: 27, y: 66, label: "Turbo", text: "Dos turbocompresores aprovechan los gases de escape para meter más aire en los cilindros. Más aire significa más combustible quemado y más potencia." },
  { id: "intercooler", x: 72, y: 38, label: "Intercooler", text: "El aire se calienta al comprimirse en el turbo. El intercooler lo enfría antes de entrar al motor, de modo que entra más oxígeno en el mismo espacio." },
  { id: "refrigeracion", x: 74, y: 72, label: "Refrigeración", text: "Varios radiadores mantienen la temperatura del motor, del aceite y de la transmisión, algo imprescindible cuando se usa el coche con exigencia." },
];

export function Slide05() {
  const tr = useTr();
  const [sel, setSel] = useState<string | null>(null);
  const part = engineParts.find((p) => p.id === sel);

  return (
    <SlideShell tone="dark">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <div data-no-swipe>
          <Eyebrow tone="dark">{tr("05 · Motor")}</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">S58 biturbo</h2>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <Stat tone="dark" value="3.0 L" label={tr("Cilindrada")} />
            <Stat tone="dark" value="6" label={tr("Cilindros en línea")} />
            <Stat tone="dark" value="Biturbo" label={tr("Sobrealimentación")} />
            <Stat tone="dark" value="530 CV" label={tr("Potencia máxima")} />
            <Stat tone="dark" value="650 Nm" label={tr("Par máximo")} />
          </div>

          <div className="mt-6">
            <Source tone="dark">
              {tr("530 CV corresponden al M4 Competition xDrive; el M4 Competition de tracción trasera declara 510 CV. El par máximo es de 650 Nm en ambos.")}
</Source>
          </div>

          <div className="mt-6 min-h-[130px]">
            <AnimatePresence mode="wait">
              {part && (
                <InfoCard key={part.id} tone="dark" title={tr(part.label)}>
                  {tr(part.text)}
                </InfoCard>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div data-no-swipe className="relative aspect-[4/3] w-full rounded-3xl bg-ink-elevated/60">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: part ? 1.35 : 1 }}
            transition={softSpring}
            style={{ transformOrigin: part ? `${part.x}% ${part.y}%` : "50% 50%" }}
          >
            <img
              src={engineImg}
              alt="Motor de seis cilindros en línea con doble turbo"
              loading="lazy"
              width={1400}
              height={1050}
              className="h-full w-full object-contain p-5"
              draggable={false}
            />
          </motion.div>
          {engineParts.map((p) => (
            <Hotspot
              key={p.id}
              tone="dark"
              x={p.x}
              y={p.y}
              label={tr(p.label)}
              active={sel === p.id}
              onClick={() => setSel(sel === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

/* ─────────────────────────── 6 · PRESTACIONES ─────────────────────────── */

const DURATION = 3.5;

export function Slide06() {
  const tr = useTr();
  const [speed, setSpeed] = useState(0);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const start = () => {
    if (running) return;
    setRunning(true);
    setSpeed(0);
    const t0 = performance.now();
    const step = (t: number) => {
      const s = Math.min(DURATION, (t - t0) / 1000);
      setElapsed(s);
      // curva de aceleración: rápida al principio, más plana al final
      setSpeed(Math.min(100, 100 * Math.pow(s / DURATION, 0.78)));
      if (s < DURATION) {
        raf.current = requestAnimationFrame(step);
      } else {
        setSpeed(100);
        setRunning(false);
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  const done = !running && speed >= 100;
  const progress = speed / 100;

  return (
    <SlideShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{tr("06 · Prestaciones")}</Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">0 – 100 km/h</h2>
          </div>
          <div data-no-swipe>
            <PillButton onClick={start} active={running}>
              {tr(running ? "Acelerando…" : done ? "Repetir" : "START")}
            </PillButton>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-8 sm:px-12">
          <motion.img
            src={m4side}
            alt="BMW M4 Competition acelerando"
            loading="lazy"
            width={1408}
            height={800}
            className="mx-auto w-full max-w-lg"
            animate={{
              x: running ? [0, 8, 0] : 0,
              filter: `blur(${running ? progress * 2.2 : 0}px)`,
            }}
            transition={{ duration: 0.4, repeat: running ? Infinity : 0 }}
            draggable={false}
          />

          <div className="mt-4 flex items-end justify-center gap-3">
            <motion.span
              className="tabular font-display text-6xl leading-none font-medium"
              animate={{ filter: `blur(${running ? 1.4 : 0}px)` }}
            >
              {Math.round(speed)}
            </motion.span>
            <span className="pb-3 text-sm tracking-[0.2em] text-muted-foreground">KM/H</span>
          </div>

          <div className="mx-auto mt-5 h-[3px] w-full max-w-2xl overflow-hidden rounded-full bg-foreground/10">
            <motion.div className="m-stripe h-full" style={{ width: `${progress * 100}%` }} />
          </div>

          <div className="mt-4 flex justify-between text-[11px] tracking-widest text-muted-foreground">
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <span key={v} className={cn("tabular", speed >= v && "text-foreground")}>
                {v}
              </span>
            ))}
          </div>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={spring}
                className="mt-5 text-center"
              >
                <span className="tabular font-display text-4xl font-medium">3,5 s</span>
                <p className="mt-1 text-sm text-muted-foreground">{tr("de 0 a 100 km/h")}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {running && (
            <p className="tabular mt-4 text-center text-xs text-muted-foreground">
              {elapsed.toFixed(2)} s
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-8">
          <Stat value="3,5 s" label="0–100 km/h · Competition xDrive" />
          <Stat value="≈ 290 km/h" label={tr("Velocidad máxima según versión y equipamiento")} />
          <div className="max-w-sm">
            <Source>
              {tr("La velocidad está limitada electrónicamente a 250 km/h; sube hasta unos 290 km/h con el M Driver's Package. El M4 Competition de tracción trasera declara 3,9 s.")}
</Source>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
