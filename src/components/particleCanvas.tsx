import { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export default function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const numParticles = 50;
    let particles: Particle[] = [];

    const initParticles = (canvas: HTMLCanvasElement): void => {
        const width = (canvas.width = canvas.offsetWidth);
        const height = (canvas.height = canvas.offsetHeight);
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 2,
            });
        }
    };

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        initParticles(canvas);
        let animationFrameId: number;

        const mouse = { x: null as number | null, y: null as number | null, radius: 100 };

        const handleMouseMove = (event: MouseEvent): void => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        const updateParticles = () => {
            const width = canvas.width;
            const height = canvas.height;
            context.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx = -p.vx;
                if (p.y < 0 || p.y > height) p.vy = -p.vy;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (mouse.radius - distance) / mouse.radius;
                        p.vx += Math.cos(angle) * force;
                        p.vy += Math.sin(angle) * force;
                    }
                }

                context.beginPath();
                context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                context.fillStyle = '#8bc261';
                context.fill();
            });

            animationFrameId = requestAnimationFrame(updateParticles);
        };

        updateParticles();

        let resizeTimeout: number | null = null;
        const handleResize = () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = window.setTimeout(() => {
                initParticles(canvas);
            }, 500);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className='w-full h-96 rounded-lg shadow-lg bg-card border border-border'
        />
    );
}
