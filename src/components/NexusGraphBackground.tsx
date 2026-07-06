// src/components/NexusGraphBackground.tsx
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

interface Particle {
  // Base structural index
  id: number;
  
  // Current visual position (physics-driven)
  x: number;
  y: number;

  // Speeds/phases
  angle: number;
  speed: number;
  
  // Specific node properties
  layer: number; // for Future layer layout
  cluster: number; // for Present cluster layout
  gridCol: number; // for Past grid layout
  gridRow: number; // for Past grid layout
}

export default function NexusGraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize particles
    const particleCount = 75;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.4,
        layer: i % 4, // 4 vertical columns for Future GIN layers
        cluster: i % 3, // 3 centers for Present clusters
        gridCol: i % 9, // grid layout for Past
        gridRow: Math.floor(i / 9) % 8,
      });
    }

    // Animation frame render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const progress = scrollYProgress.get(); // [0, 1] scroll progress

      // Segment calculations
      // Hero (0.0), Past (0.33), Present (0.66), Future (1.0)
      let w0 = 0, w1 = 0, w2 = 0, w3 = 0;

      if (progress < 0.33) {
        // Interpolate Hero -> Past
        const t = progress / 0.33;
        w0 = 1 - t;
        w1 = t;
      } else if (progress < 0.66) {
        // Interpolate Past -> Present
        const t = (progress - 0.33) / 0.33;
        w1 = 1 - t;
        w2 = t;
      } else {
        // Interpolate Present -> Future
        const t = Math.min((progress - 0.66) / 0.34, 1);
        w2 = 1 - t;
        w3 = t;
      }

      // Dynamic theme styling details based on scroll section
      let strokeColor = "rgba(0, 240, 255, 0.12)"; // Hero Default
      let nodeColor = "rgba(0, 240, 255, 0.35)";
      let linkDistance = 110;

      if (w1 > 0.5) {
        // Past (CRT Green)
        strokeColor = `rgba(51, 255, 0, ${0.08 * w1})`;
        nodeColor = `rgba(51, 255, 0, ${0.4 * w1})`;
        linkDistance = 130;
      } else if (w2 > 0.5) {
        // Present (Slate Blue)
        strokeColor = `rgba(37, 99, 235, ${0.1 * w2})`;
        nodeColor = `rgba(37, 99, 235, ${0.35 * w2})`;
        linkDistance = 90;
      } else if (w3 > 0.5) {
        // Future (Glowing Purple/Cyan)
        strokeColor = `rgba(176, 38, 255, ${0.14 * w3})`;
        nodeColor = `rgba(0, 240, 255, ${0.45 * w3})`;
        linkDistance = 100;
      }

      // Update positions
      particles.forEach((p) => {
        // Define coordinate anchors for each state
        const centerX = width / 2;
        const centerY = height / 2;

        // 1. Hero layout: simple orbiting circles
        const rHero = (p.id % 3 + 1.5) * 60 + Math.sin(p.angle) * 10;
        const xHero = centerX + rHero * Math.cos(p.angle + progress * 0.5);
        const yHero = centerY + rHero * Math.sin(p.angle + progress * 0.5);

        // 2. Past layout: rigid schematic grid rows/cols
        const gridCellW = width / 10;
        const gridCellH = height / 9;
        const xPast = (p.gridCol + 1) * gridCellW + Math.sin(p.angle) * 4;
        const yPast = (p.gridRow + 1) * gridCellH + Math.cos(p.angle) * 4;

        // 3. Present layout: 3 localized cluster nodes
        let clusterX = centerX;
        let clusterY = centerY;
        if (p.cluster === 0) {
          clusterX = width * 0.25;
          clusterY = height * 0.45;
        } else if (p.cluster === 1) {
          clusterX = width * 0.75;
          clusterY = height * 0.35;
        } else {
          clusterX = width * 0.5;
          clusterY = height * 0.75;
        }
        const clusterRadius = 40 + (p.id % 5) * 12;
        const xPresent = clusterX + clusterRadius * Math.cos(p.angle * 1.5);
        const yPresent = clusterY + clusterRadius * Math.sin(p.angle * 1.5);

        // 4. Future layout: Deep layered neural network column paths
        const colW = width * 0.5;
        const colStart = width * 0.25;
        const xFuture = colStart + (p.layer / 3) * colW;
        
        // Vertical spacing within column
        const colNodeCount = 19; // ~75 particles / 4 layers
        const nodeIndex = p.id % colNodeCount;
        const yFuture = height * 0.2 + (nodeIndex / (colNodeCount - 1)) * height * 0.6 + Math.sin(p.angle * 2) * 15;

        // Weighted target coordinate blend
        const targetX = xHero * w0 + xPast * w1 + xPresent * w2 + xFuture * w3;
        const targetY = yHero * w0 + yPast * w1 + yPresent * w2 + yFuture * w3;

        // Apply smooth spring physics
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Slowly increment phase angles for ambient motion
        p.angle += 0.003 * p.speed;

        // Render Particle nodes
        ctx.beginPath();
        const size = w1 > 0.5 ? 2 : w3 > 0.5 ? (p.layer === 0 || p.layer === 3 ? 4 : 3) : 3;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // GIN connection dots halo for Future section
        if (w3 > 0.6 && p.layer === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(176, 38, 255, 0.15)";
          ctx.stroke();
        }
      });

      // Draw Connections (links)
      ctx.lineWidth = 1;
      
      // Speed optimization: draw lines selectively
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          // Dist filter
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < linkDistance * linkDistance) {
            // Additional structure matching styles:
            let connect = true;

            if (w1 > 0.6) {
              // Past: point-to-point connection along same column or same row to look modular/orthogonal
              connect = p1.gridCol === p2.gridCol || p1.gridRow === p2.gridRow;
            } else if (w2 > 0.6) {
              // Present: connect nodes within the same cluster
              connect = p1.cluster === p2.cluster;
            } else if (w3 > 0.6) {
              // Future: connect nodes only in adjacent network layers
              connect = Math.abs(p1.layer - p2.layer) === 1;
            }

            if (connect) {
              const dist = Math.sqrt(distSq);
              const opacityFactor = (1 - dist / linkDistance);
              
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = strokeColor.replace(/[\d.]+\)$/, `${opacityFactor * 0.5})`);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-10]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
