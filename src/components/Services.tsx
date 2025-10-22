import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Map, Leaf, FileText, GraduationCap, Building, Code } from "lucide-react";
import { useState } from "react";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Map,
      title: "Mapping & GIS",
      description: "Advanced geospatial analysis and digital mapping solutions for accurate land surveys and urban planning.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Leaf,
      title: "Environmental Studies",
      description: "Comprehensive environmental impact assessments and sustainability consulting for eco-friendly development.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FileText,
      title: "DPR Preparation",
      description: "Detailed Project Reports with technical specifications, cost estimates, and feasibility analysis.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      title: "Training Programs",
      description: "Professional development courses in GIS, remote sensing, and environmental management technologies.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Building,
      title: "Field Survey",
      description: "Accurate ground-truthing and data collection services for infrastructure and development projects.",
      color: "from-teal-500 to-blue-500",
    },
    {
      icon: Code,
      title: "Construction Management",
      description: "Efficient project management solutions for construction companies and developers.",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="text-accent text-sm uppercase tracking-widest font-semibold"
          >
            Our Services
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Comprehensive Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Delivering excellence across multiple domains with cutting-edge technology and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="relative h-full bg-card border border-border rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-accent hover:shadow-2xl hover:glow-blue">
                  {/* Gradient Background on Hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-[2px] group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Effect Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} origin-left`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
