import { motion } from "motion/react";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const spring = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };
export const softSpring = { type: "spring" as const, stiffness: 140, damping: 22 };

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div className="flex items-center gap-3">
      <span className="m-stripe h-[3px] w-8 rounded-full" />
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.22em]",
          tone === "dark" ? "text-ink-muted" : "text-muted-foreground",
        )}
      >
        {children}
      </span>
    </div>
  );
}

export function PillButton({
  children,
  onClick,
  active,
  tone = "light",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      transition={spring}
      className={cn(
        "no-select rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
        tone === "dark"
          ? active
            ? "bg-ink-foreground text-ink"
            : "glass-panel-dark text-ink-foreground hover:bg-white/10"
          : active
            ? "bg-primary text-primary-foreground shadow-soft"
            : "bg-card text-foreground shadow-soft hover:bg-secondary",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

export function Hotspot({
  x,
  y,
  active,
  onClick,
  label,
  tone = "light",
}: {
  x: number;
  y: number;
  active: boolean;
  onClick: () => void;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="no-select absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.span
        animate={{ scale: active ? 1.25 : 1 }}
        whileTap={{ scale: 0.85 }}
        transition={spring}
        className={cn(
          "relative flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md",
          tone === "dark"
            ? "border-white/40 bg-white/15"
            : "border-foreground/15 bg-card/80 shadow-soft",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            active ? "bg-m-red" : tone === "dark" ? "bg-white/80" : "bg-foreground/60",
          )}
        />
        {!active && (
          <motion.span
            className={cn(
              "absolute inset-0 rounded-full border",
              tone === "dark" ? "border-white/40" : "border-foreground/25",
            )}
            animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.span>
    </button>
  );
}

/** Rotación por arrastre, limitada — para inspeccionar el coche sin marearse. */
export function useDragRotate(limit = 14) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    origin.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.x;
      const dy = e.clientY - origin.current.y;
      setRot({
        y: Math.max(-limit, Math.min(limit, dx / 14)),
        x: Math.max(-limit / 2.4, Math.min(limit / 2.4, -dy / 22)),
      });
    },
    [limit],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    setRot({ x: 0, y: 0 });
  }, []);

  return {
    rot,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
  };
}

export function InfoCard({
  title,
  children,
  tone = "light",
  className,
}: {
  title: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
      transition={softSpring}
      className={cn(
        "rounded-3xl p-6",
        tone === "dark" ? "glass-panel-dark" : "glass-panel shadow-soft",
        className,
      )}
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <div
        className={cn(
          "mt-2 text-sm leading-relaxed",
          tone === "dark" ? "text-ink-muted" : "text-muted-foreground",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function Stat({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <div className="tabular font-display text-3xl font-medium tracking-tight sm:text-4xl">{value}</div>
      <div
        className={cn(
          "mt-1 text-[11px] font-medium uppercase tracking-[0.16em]",
          tone === "dark" ? "text-ink-muted" : "text-muted-foreground",
        )}
      >
        {label}
      </div>
    </div>
  );
}

export function Source({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "text-[11px] leading-relaxed",
        tone === "dark" ? "text-ink-muted/70" : "text-muted-foreground/70",
      )}
    >
      {children}
    </p>
  );
}

/** Contenedor estándar de diapositiva: mucho aire, contenido centrado. */
export function SlideShell({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-center overflow-hidden px-6 py-16 sm:px-12 lg:px-20",
        tone === "dark" ? "surface-dark" : "bg-background",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}
