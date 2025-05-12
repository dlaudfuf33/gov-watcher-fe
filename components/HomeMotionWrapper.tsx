"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomeMotionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.section key={index} variants={item}>
            {child}
          </motion.section>
        ))
      ) : (
        <motion.section variants={item}>{children}</motion.section>
      )}
    </motion.div>
  );
}
