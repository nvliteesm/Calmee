import { motion } from "framer-motion";

// Ingredients orbit slowly around a center product image, like satellites.
// Gives a "3D-ish" sense of depth using only CSS transforms + Framer Motion.
export default function OrbitRing({ center, items, radius = 170, size = 64 }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: radius * 2 + size, height: radius * 2 + size }}
    >
      {/* Orbit path (subtle) */}
      <div
        className="absolute rounded-full border border-dashed border-white/15"
        style={{ width: radius * 2, height: radius * 2 }}
        aria-hidden="true"
      />

      {/* Center content */}
      <div className="absolute z-20 flex h-[9.5rem] w-[9.5rem] items-center justify-center rounded-full bg-[var(--calmee-cream)] shadow-[0_20px_70px_rgba(18,9,46,0.35)] md:h-[11rem] md:w-[11rem]">
        {center}
      </div>

      {/* Orbiting items */}
      {items.map((item, index) => {
        const angleOffset = (360 / items.length) * index;
        const duration = 26 + index * 3;

        return (
          <motion.div
            key={item.key}
            className="absolute left-1/2 top-1/2 z-10"
            style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            initial={{ rotate: angleOffset }}
          >
            <motion.div
              className="absolute flex flex-col items-center gap-1.5"
              style={{ left: "50%", top: 0, transform: "translateX(-50%)" }}
              animate={{ rotate: -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              initial={{ rotate: -angleOffset }}
            >
              <div
                className="flex items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white shadow-[0_10px_28px_rgba(18,9,46,0.28)]"
                style={{ width: size, height: size }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[#2D1B6B] shadow-sm">
                {item.title}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
