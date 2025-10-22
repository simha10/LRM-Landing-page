import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import GlobeCanvas from "./GlobeCanvas";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[150vh] w-full overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center gradient-hero">
        {/* Animated 3D Globe Background */}
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          <GlobeCanvas />
        </motion.div>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />

        {/* Hero Content */}
        <motion.div 
          style={{ opacity, y: textY }}
          className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight hero-title">
              <span className="block">LRM</span>
              <span className="block text-gradient">Consultants</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-3xl font-light text-muted-foreground mb-12 hero-subtitle"
          >
            Transforming Vision into Reality
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 font-libre-baskerville"
          >
            Government-tied consulting and engineering excellence in GIS, 
            environmental studies, water management, and mapping solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex justify-center"
          >
            <ArrowDown className="w-8 h-8 text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;