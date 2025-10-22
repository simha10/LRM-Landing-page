import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Target, Users } from "lucide-react";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { icon: Building2, label: "Established", value: "2010" },
    { icon: Target, label: "Projects", value: "100+" },
    { icon: Users, label: "Experts", value: "20+" },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm uppercase tracking-widest font-semibold"
          >
            About Us
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Driven by Innovation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Since 2010, we've been at the forefront of transforming geographical 
            data into actionable insights for government and private sectors
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-accent transition-all duration-300 hover:shadow-lg hover:glow-blue">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-xl mb-6 group-hover:bg-accent/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl font-bold mb-2 text-gradient">{stat.value}</div>
                <div className="text-muted-foreground uppercase tracking-wide text-sm">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-br from-card to-primary/5 border border-border rounded-3xl p-12 md:p-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Our Commitment
          </h3>
          <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
            We specialize in providing comprehensive solutions in GIS mapping, 
            environmental impact assessments, water resource management, and 
            infrastructure planning. Our team of dedicated professionals combines 
            cutting-edge technology with decades of field experience to deliver 
            precision and sustainability in every project.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
