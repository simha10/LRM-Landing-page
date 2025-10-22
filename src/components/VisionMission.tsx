import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Eye, Target, Sparkles, Leaf } from "lucide-react";

const VisionMission = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const values = [
    {
      icon: Sparkles,
      title: "Precision",
      description: "Delivering accurate and reliable data through cutting-edge technology",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Promoting eco-friendly practices in all our projects and solutions",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Continuously evolving our methodologies to stay ahead in the industry",
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span className="text-accent text-sm uppercase tracking-widest font-semibold">
            Our Purpose
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Vision & Mission
          </h2>
        </motion.div>

        {/* Vision and Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative group"
          >
            <div className="h-full bg-gradient-to-br from-card to-primary/10 border border-border rounded-3xl p-10 hover:border-accent transition-all duration-500 hover:shadow-2xl hover:glow-blue">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-gradient transition-all">
                Our Vision
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading consultancy firm in India, recognized for excellence 
                in geospatial solutions and environmental stewardship, empowering 
                sustainable development through innovation and precision.
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative group"
          >
            <div className="h-full bg-gradient-to-br from-card to-secondary/10 border border-border rounded-3xl p-10 hover:border-secondary transition-all duration-500 hover:shadow-2xl hover:glow-green">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6 group-hover:bg-secondary/20 transition-colors">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-gradient transition-all">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To deliver cutting-edge consulting services in GIS, environmental studies, 
                and infrastructure planning while maintaining the highest standards of 
                quality, integrity, and client satisfaction.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;