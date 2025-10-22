import { useEffect, useRef } from 'react';

const GlobeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Globe parameters
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      originX: number;
      originY: number;
      originZ: number;
    }> = [];
    
    const numParticles = 1000;
    const radius = 250;
    let rotation = 0;

    // Create particles in a sphere
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x, y, z,
        originX: x,
        originY: y,
        originZ: z,
      });
    }

    // Animation
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 11, 31, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.002;

      particles.forEach((particle) => {
        // Rotate particle
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        
        particle.x = particle.originX * cosR - particle.originZ * sinR;
        particle.z = particle.originZ * cosR + particle.originX * sinR;

        // Project 3D to 2D
        const scale = 800 / (800 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        // Draw particle
        const opacity = (particle.z + radius) / (2 * radius);
        const size = scale * 2;
        
        ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect for some particles
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(45, 212, 191, ${opacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default GlobeCanvas;
