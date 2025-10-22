import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeProject, setActiveProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Urban Water Supply Network",
      location: "Lucknow, Uttar Pradesh",
      year: "2023",
      category: "Water Management",
      description: "Comprehensive GIS mapping and network analysis for municipal water distribution system.",
      coordinates: { lat: 26.8467, lng: 80.9462 },
    },
    {
      title: "Environmental Impact Assessment",
      location: "Kanpur Industrial Area",
      year: "2023",
      category: "Environmental",
      description: "Detailed environmental study for industrial zone expansion with sustainability recommendations.",
      coordinates: { lat: 26.4499, lng: 80.3319 },
    },
    {
      title: "Digital Land Records",
      location: "Varanasi District",
      year: "2022",
      category: "GIS & Mapping",
      description: "Digitization of land records and cadastral mapping for government land management.",
      coordinates: { lat: 25.3176, lng: 82.9739 },
    },
    {
      title: "Highway Corridor Study",
      location: "Agra-Lucknow Expressway",
      year: "2022",
      category: "Infrastructure",
      description: "DPR preparation and feasibility study for highway development project.",
      coordinates: { lat: 27.1767, lng: 78.0081 },
    },
    {
      title: "Watershed Management",
      location: "Bundelkhand Region",
      year: "2021",
      category: "Water Management",
      description: "Integrated watershed development and rainwater harvesting project planning.",
      coordinates: { lat: 25.4358, lng: 79.4534 },
    },
    {
      title: "Smart City Planning",
      location: "Prayagraj",
      year: "2021",
      category: "Urban Planning",
      description: "GIS-based urban planning and infrastructure development for smart city initiative.",
      coordinates: { lat: 25.4358, lng: 81.8463 },
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-3xl" />
      </div>

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
            Project Portfolio
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Transformative Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing our commitment to excellence through impactful projects across North India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setActiveProject(index)}
              onHoverEnd={() => setActiveProject(null)}
              className="group relative"
            >
              <div className="relative h-full bg-card border border-border rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-accent hover:shadow-2xl hover:glow-blue">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: activeProject === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Location & Year */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-secondary" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-accent" />
                    {project.year}
                  </div>
                </div>

                {/* Hover Gradient Border */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeProject === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-secondary origin-left"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
