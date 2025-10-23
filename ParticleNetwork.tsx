
import React, { useRef, useEffect } from 'react';

const ParticleNetwork: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        
        const options = {
            particleColor: '#FF4136',
            lineColor: 'rgba(255, 65, 54, opacity)',
            particleAmount: 50,
            defaultRadius: 1.5,
            variantRadius: 1.5,
            defaultSpeed: 0.3,
            variantSpeed: 0.5,
            linkRadius: 150,
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Adjust particle amount based on screen size
            options.particleAmount = Math.floor((canvas.width * canvas.height) / 20000);
            createParticles();
        };
        
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * options.defaultSpeed + (Math.random() - 0.5) * options.variantSpeed;
                this.vy = (Math.random() - 0.5) * options.defaultSpeed + (Math.random() - 0.5) * options.variantSpeed;
                this.radius = options.defaultRadius + Math.random() * options.variantRadius;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx!.fillStyle = options.particleColor;
                ctx!.shadowColor = options.particleColor;
                ctx!.shadowBlur = 10;
                ctx!.fill();
            }
        }

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < options.particleAmount; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < options.linkRadius) {
                        const opacity = 1 - distance / options.linkRadius;
                        ctx!.beginPath();
                        ctx!.moveTo(particles[i].x, particles[i].y);
                        ctx!.lineTo(particles[j].x, particles[j].y);
                        ctx!.strokeStyle = options.lineColor.replace('opacity', opacity.toString());
                        ctx!.lineWidth = 0.5;
                        ctx!.shadowBlur = 0;
                        ctx!.stroke();
                    }
                }
            }
        };
        
        const animate = () => {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            connectParticles();
            
            animationFrameId = requestAnimationFrame(animate);
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-1]" />;
};

export default ParticleNetwork;
