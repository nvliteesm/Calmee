import { motion } from "framer-motion";

// Fade + slide-in wrapper triggered when the element scrolls into view.
// Wrap any section/element to give it the same "alive" feel as the homepage.
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.65,
  className = "",
  as = "div",
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
