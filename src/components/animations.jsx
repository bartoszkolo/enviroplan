import { motion } from 'framer-motion';

/**
 * ScrollReveal - Fade in from bottom when scrolled into view
 * @param {Object} props
 * @param {ReactNode} props.children - Content to reveal
 * @param {number} props.delay - Delay in seconds (default: 0)
 */
export function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: { opacity: 0, y: 60 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: 'easeOut' }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideFromLeft - Slide in from left when scrolled into view
 */
export function SlideFromLeft({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideFromRight - Slide in from right when scrolled into view
 */
export function SlideFromRight({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container variant for animating children in sequence
 */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * FadeInUp - Simple fade in from bottom variant
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

/**
 * ScaleOnHover - Scale up when hovered
 */
export const scaleOnHover = {
  scale: 1.05,
  transition: { duration: 0.2 }
};
