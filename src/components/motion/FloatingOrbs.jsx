import { motion } from "framer-motion";

// Ambient floating glow orbs — matches the hero-dot / blur-circle language
// already used on the homepage. Purely decorative, aria-hidden.
export default function FloatingOrbs({ variant = "light", className = "" }) {
  const palette =
    variant === "dark"
      ? ["bg-[#8E72D9]/25", "bg-[#D4A843]/15", "bg-[#C4ADDF]/15"]
      : ["bg-[#E8DEFF]/60", "bg-[#C4ADDF]/35", "bg-[#D4A843]/12"];

  const orbs = [
    { size: "h-[28rem] w-[28rem]", pos: "left-[-10rem] top-[-8rem]", color: palette[0], dur: 9 },
    { size: "h-[22rem] w-[22rem]", pos: "right-[-8rem] bottom-[-6rem]", color: palette[1], dur: 11 },
    { size: "h-40 w-40", pos: "right-[12%] top-[18%]", color: palette[2], dur: 7 },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.size} ${orb.pos} ${orb.color}`}
          animate={{
            x: [0, 18, 0],
            y: [0, -22, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6,
          }}
        />
      ))}
    </div>
  );
}
