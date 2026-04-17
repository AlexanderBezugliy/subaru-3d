"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { LucideChevronRight } from "lucide-react";

// --- Components ---

const Navbar = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 50], [0, 1]);
    const blur = useTransform(scrollY, [0, 50], [0, 12]);

    return (
        <motion.nav
            style={{
                backgroundColor: `rgba(10, 10, 12, 0.7)`,
                backdropFilter: `blur(12px)`,
                opacity,
            }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/5"
        >
            <div className="text-xl font-bold tracking-tight text-white/90">
                Impreza
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                {[
                    "Overview",
                    "Design",
                    "Performance",
                    "Engineering",
                    "Build",
                ].map((link) => (
                    <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        className="hover:text-white transition-colors"
                    >
                        {link}
                    </a>
                ))}
            </div>

            <button className="px-5 py-2 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,80,255,0.4)] transition-all active:scale-95">
                Pre-order
            </button>
        </motion.nav>
    );
};

const Section = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`relative h-screen w-full flex flex-col justify-center px-6 md:px-24 z-10 ${className}`}
    >
        {children}
    </div>
);

// --- Main Page ---

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const totalFrames = 240;

    // Scroll Progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth frame index calculation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `/ezgif-jpg/ezgif-frame-${frameNumber}.jpg`;

                const promise = new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null); // Handle missing frames gracefully
                });

                promises.push(promise);
                loadedImages.push(img);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        preloadImages();
    }, []);

    // Canvas Drawing logic
    const renderCanvas = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (ctx && canvas && img) {
            const pixelRatio = window.devicePixelRatio || 1;
            const width = canvas.width / pixelRatio;
            const height = canvas.height / pixelRatio;

            // Calculate aspect ratio fit
            const imgRatio = img.width / img.height;
            const canvasRatio = width / height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawWidth = width;
                drawHeight = width / imgRatio;
                offsetX = 0;
                offsetY = (height - drawHeight) / 2;
            } else {
                drawWidth = height * imgRatio;
                drawHeight = height;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, width, height);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const pixelRatio = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * pixelRatio;
                canvasRef.current.height = window.innerHeight * pixelRatio;

                const ctx = canvasRef.current.getContext("2d");
                if (ctx) {
                    ctx.scale(pixelRatio, pixelRatio);
                }

                // Re-render current frame on resize
                const currentIndex = Math.floor(
                    smoothProgress.get() * (totalFrames - 1),
                );
                renderCanvas(currentIndex);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

    // Update canvas on scroll
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (latest) => {
            const index = Math.min(
                totalFrames - 1,
                Math.max(0, Math.floor(latest * totalFrames)),
            );
            renderCanvas(index);
        });
        return () => unsubscribe();
    }, [images]);

    // Transform values for content animations
    const introOpacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.15, 0.18],
        [0, 1, 1, 0],
    );
    const engineeringOpacity = useTransform(
        scrollYProgress,
        [0.2, 0.25, 0.35, 0.4],
        [0, 1, 1, 0],
    );
    const engineeringX = useTransform(scrollYProgress, [0.2, 0.25], [-50, 0]);

    const performanceOpacity = useTransform(
        scrollYProgress,
        [0.45, 0.5, 0.6, 0.65],
        [0, 1, 1, 0],
    );
    const performanceX = useTransform(scrollYProgress, [0.45, 0.5], [50, 0]);

    const heartOpacity = useTransform(
        scrollYProgress,
        [0.7, 0.75, 0.85, 0.9],
        [0, 1, 1, 0],
    );
    const heartX = useTransform(scrollYProgress, [0.7, 0.75], [-50, 0]);

    const finalOpacity = useTransform(scrollYProgress, [0.92, 0.95], [0, 1]);
    const finalScale = useTransform(scrollYProgress, [0.92, 0.98], [0.95, 1]);

    return (
        <main
            ref={containerRef}
            className="relative bg-background text-white selection:bg-accent-blue/30"
        >
            <Navbar />

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Subtle Ambient Gradients */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 rounded-full blur-[120px]" />
                </div>

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Loading Overlay */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background z-50">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-2 border-accent-blue/20 border-t-accent-blue rounded-full animate-spin" />
                            <p className="text-white/40 text-xs font-bold tracking-widest uppercase">
                                Initializing Experience
                            </p>
                        </div>
                    </div>
                )}

                {/* --- Storytelling Overlays --- */}

                {/* 1. HERO / INTRO (0–15%) */}
                <motion.div
                    style={{ opacity: introOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
                >
                    <motion.h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white/95">
                        Subaru Impreza
                    </motion.h1>
                    <motion.p className="text-xl md:text-2xl font-medium text-white/60 mb-2">
                        Motion, perfected.
                    </motion.p>
                    <motion.p className="text-sm md:text-base text-white/40 max-w-md">
                        The legendary rally-bred icon, re-engineered for the
                        modern road.
                    </motion.p>
                </motion.div>

                {/* 2. ENGINEERING REVEAL (15–40%) */}
                <motion.div
                    style={{ opacity: engineeringOpacity, x: engineeringX }}
                    className="absolute inset-y-0 left-0 flex flex-col justify-center pointer-events-none px-6 md:px-24 max-w-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white/90">
                        Precision-engineered <br /> for control.
                    </h2>
                    <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed">
                        <p>
                            High-tensile steel frame and optimized aerodynamics
                            deliver unparalleled stability.
                        </p>
                        <p>
                            Every component is tuned for balance, power, and
                            safety—mile after mile.
                        </p>
                    </div>
                </motion.div>

                {/* 3. PERFORMANCE & DRIVETRAIN (40–65%) */}
                <motion.div
                    style={{ opacity: performanceOpacity, x: performanceX }}
                    className="absolute inset-y-0 right-0 flex flex-col justify-center text-right pointer-events-none px-6 md:px-24 max-w-2xl ml-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white/90">
                        Symmetrical <br /> All-Wheel Drive.
                    </h2>
                    <ul className="space-y-4 text-white/60 text-base md:text-lg">
                        <li>Maximum traction in any condition.</li>
                        <li>Power routed to all four wheels simultaneously.</li>
                        <li>Absolute confidence on every curve.</li>
                    </ul>
                </motion.div>

                {/* 4. HEART OF THE MACHINE (65–85%) */}
                <motion.div
                    style={{ opacity: heartOpacity, x: heartX }}
                    className="absolute inset-y-0 left-0 flex flex-col justify-center pointer-events-none px-6 md:px-24 max-w-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white/90">
                        The heartbeat <br /> of a champion.
                    </h2>
                    <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed">
                        <p>
                            The legendary SUBARU BOXER® engine provides a lower
                            center of gravity.
                        </p>
                        <p>
                            Perfect balance and smooth power transfer for an
                            exhilarating drive.
                        </p>
                    </div>
                </motion.div>

                {/* 5. REASSEMBLY & CTA (85–100%) */}
                <motion.div
                    style={{ opacity: finalOpacity, scale: finalScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white/95">
                        Own the road. <br /> Feel the drive.
                    </h2>
                    <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl">
                        Subaru Impreza. Designed for thrill, crafted for life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all flex items-center gap-2 group">
                            Experience Impreza
                            <LucideChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">
                            Build & Price
                        </button>
                    </div>
                </motion.div>

                {/* Progress Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <div className="h-[2px] w-24 bg-white/10 overflow-hidden rounded-full">
                        <motion.div
                            className="h-full bg-accent-blue"
                            style={{
                                scaleX: scrollYProgress,
                                transformOrigin: "left",
                            }}
                        />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                        Exploration
                    </span>
                </div>
            </div>

            {/* Spacer to allow scrolling */}
            <div className="h-[400vh] w-full" />

            {/* Footer-like section to finish the scroll */}
            <section className="relative h-screen bg-secondary flex items-center justify-center px-6">
                <div className="max-w-4xl text-center">
                    <p className="text-accent-blue font-bold uppercase tracking-widest text-xs mb-4">
                        Symmetrical AWD
                    </p>
                    <h3 className="text-3xl md:text-5xl font-bold mb-8">
                        Ready for whatever the road throws at you.
                    </h3>
                    <p className="text-white/40 leading-relaxed mb-12">
                        The Impreza is more than just a car. It's a commitment
                        to safety, performance, and the joy of driving. Join the
                        legacy of Subaru owners who know that the journey is
                        just as important as the destination.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Horsepower", value: "182 hp" },
                            { label: "MPG (Hwy)", value: "34" },
                            { label: "Cargo Volume", value: "56.0 cu.ft." },
                            { label: "Safety Rating", value: "Top Pick+" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="text-left border-l border-white/10 pl-4"
                            >
                                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-xl font-bold">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
