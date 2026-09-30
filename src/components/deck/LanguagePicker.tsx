import { motion } from "motion/react";
import hero from "@/assets/m4-hero.png";
import type { Lang } from "./i18n";

const spring = { type: "spring" as const, stiffness: 320, damping: 22 };

export function LanguagePicker({ onPick }: { onPick: (l: Lang) => void }) {
  const pick = (l: Lang) => {
    void document.documentElement.requestFullscreen?.().catch(() => {});
    onPick(l);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Coche entrando lentamente */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-[4%] flex justify-center" style={{ perspective: 1600 }}>
        <motion.img
          src={hero}
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          initial={{ x: "40%", opacity: 0, rotateY: -28, scale: 0.92 }}
          animate={{ x: "0%", opacity: 0.5, rotateY: [-28, 0, -4, 0], scale: 1 }}
          transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
          className="car-shadow"
          style={{ transformStyle: "preserve-3d", width: "min(760px, 92vw)" }}
          draggable={false}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 -mt-[22vh] flex flex-col items-center text-center"
      >
        <span className="m-stripe mb-6 h-[3px] w-10 rounded-full" />
        <h1 className="text-4xl sm:text-6xl">BMW M4 Competition</h1>
        <p className="mt-5 text-[12px] tracking-[0.22em] text-muted-foreground uppercase">
          Aukeratu hizkuntza / Elige idioma
        </p>

        <div className="mt-8 flex gap-3">
          {([
            { l: "es", label: "Español", icon: "🇪🇸" },
            { l: "eu", label: "Euskara", icon: "🟢" },
          ] as const).map((b, i) => (
            <motion.button
              key={b.l}
              type="button"
              onClick={() => pick(b.l)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.8 + i * 0.12 }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.94, y: 1 }}
              className="glass-panel no-select flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium text-foreground shadow-lift"
            >
              <span aria-hidden="true">{b.icon}</span>
              {b.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
