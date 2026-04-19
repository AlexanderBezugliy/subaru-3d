"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    LucideChevronRight,
    LucideInstagram,
    LucideTwitter,
    LucideYoutube,
    LucideFacebook,
} from "lucide-react";

// --- Components ---

const GlassPanel = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}
    >
        {children}
    </div>
);

const SpecCard = ({
    label,
    value,
    icon,
    style,
    variant = "default",
}: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    style: any;
    variant?: "default" | "accent";
}) => (
    <motion.div
        style={style}
        className={`bg-black/40 backdrop-blur-xl border rounded-xl p-5 shadow-2xl flex items-center gap-5 min-w-[240px] relative ${
            variant === "accent"
                ? "border-[#00D6FF]/30 shadow-[#00D6FF]/10"
                : "border-white/10"
        }`}
    >
        {icon && (
            <div
                className={
                    variant === "accent" ? "text-[#00D6FF]" : "text-accent-blue"
                }
            >
                {icon}
            </div>
        )}
        <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5 font-bold">
                {label}
            </p>
            <p className="text-xl font-bold text-white/95">{value}</p>
        </div>
        {variant === "accent" && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#00D6FF]/5 to-transparent pointer-events-none" />
        )}
    </motion.div>
);

const Navbar = () => {
    return (
        <nav
            style={{
                backgroundColor: `rgba(10, 10, 12, 0.4)`,
                backdropFilter: `blur(12px)`,
            }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10"
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

            <button className="px-5 py-2 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,80,255,0.4)] transition-all active:scale-95">
                Pre-order
            </button>
        </nav>
    );
};

const Footer = () => (
    <footer className="w-full bg-[#050505]/80 backdrop-blur-xl pt-12 pb-8 px-6 md:px-24 border-t border-white/10 z-10 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white/90 uppercase tracking-[0.2em]">
                        Vehicles
                    </h4>
                    <ul className="space-y-2 text-white/40 text-[11px] font-medium uppercase tracking-wider">
                        <li>
                            <a
                                href="#"
                                className="hover:text-accent-blue transition-colors"
                            >
                                Impreza
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-accent-blue transition-colors"
                            >
                                WRX
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-accent-blue transition-colors"
                            >
                                BRZ
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white/90 uppercase tracking-[0.2em]">
                        Engineering
                    </h4>
                    <ul className="space-y-2 text-white/40 text-[11px] font-medium uppercase tracking-wider">
                        <li>
                            <a
                                href="#"
                                className="hover:text-accent-blue transition-colors"
                            >
                                Symmetrical AWD
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-accent-blue transition-colors"
                            >
                                Boxer Engine
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white/90 uppercase tracking-[0.2em]">
                        Company
                    </h4>
                    <ul className="space-y-2 text-white/40 text-[11px] font-medium uppercase tracking-wider">
                        <li>
                            <a
                                href="#"
                                className="hover:text-accent-blue transition-colors"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-accent-blue transition-colors"
                            >
                                Motorsports
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white/90 uppercase tracking-[0.2em]">
                        Social
                    </h4>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <LucideTwitter className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <LucideInstagram className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <LucideYoutube className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold">
                    © 2026 Subaru Impreza Concept.
                </p>
                <div className="flex gap-8 text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold">
                    <a href="#" className="hover:text-white transition-colors">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Terms
                    </a>
                </div>
            </div>
        </div>
    </footer>
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
                // Calculate display size based on the 60vw/60vh constraints
                const maxWidth = window.innerWidth * 0.6;
                const maxHeight = window.innerHeight * 0.6;

                // Use the image aspect ratio if available to determine the final canvas size
                const img = images[0];
                let displayWidth = maxWidth;
                let displayHeight = maxHeight;

                if (img) {
                    const imgRatio = img.width / img.height;
                    const containerRatio = maxWidth / maxHeight;

                    if (imgRatio > containerRatio) {
                        displayHeight = maxWidth / imgRatio;
                    } else {
                        displayWidth = maxHeight * imgRatio;
                    }
                }

                canvasRef.current.width = displayWidth * pixelRatio;
                canvasRef.current.height = displayHeight * pixelRatio;

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
            // Remap frame sequence for extended exploration
            // 0% - 10%: Initial intro
            // 10% - 30%: Disassemble
            // 0% - 100%: Smooth continuous interpolation from start to end
            const mappedProgress = latest;

            const index = Math.min(
                totalFrames - 1,
                Math.max(0, Math.floor(mappedProgress * totalFrames)),
            );
            renderCanvas(index);
        });
        return () => unsubscribe();
    }, [images]);

    // Transform values for content animations
    const introOpacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.1, 0.12],
        [1, 1, 0, 0],
    );
    const engineeringOpacity = useTransform(
        scrollYProgress,
        [0.15, 0.2, 0.35, 0.4],
        [0, 1, 1, 0],
    );
    const engineeringX = useTransform(scrollYProgress, [0.15, 0.2], [-50, 0]);

    const performanceOpacity = useTransform(
        scrollYProgress,
        [0.45, 0.5, 0.65, 0.7],
        [0, 1, 1, 0],
    );
    const performanceX = useTransform(scrollYProgress, [0.45, 0.5], [50, 0]);

    const heartOpacity = useTransform(
        scrollYProgress,
        [0.72, 0.77, 0.87, 0.92],
        [0, 1, 1, 0],
    );
    const heartX = useTransform(scrollYProgress, [0.72, 0.77], [-50, 0]);

    const finalOpacity = useTransform(scrollYProgress, [0.94, 0.97], [0, 1]);
    const finalScale = useTransform(scrollYProgress, [0.94, 0.99], [0.95, 1]);

    // Spec Card Transforms
    const spec1Opacity = useTransform(
        scrollYProgress,
        [0.2, 0.25, 0.4, 0.45],
        [0, 1, 1, 0],
    );
    const spec1X = useTransform(scrollYProgress, [0.2, 0.25], [-100, 0]);

    const spec2Opacity = useTransform(
        scrollYProgress,
        [0.25, 0.3, 0.42, 0.47],
        [0, 1, 1, 0],
    );
    const spec2X = useTransform(scrollYProgress, [0.25, 0.3], [-100, 0]);

    const spec3Opacity = useTransform(
        scrollYProgress,
        [0.5, 0.55, 0.65, 0.7],
        [0, 1, 1, 0],
    );
    const spec3Y = useTransform(scrollYProgress, [0.5, 0.55], [50, 0]);

    const spec4Opacity = useTransform(
        scrollYProgress,
        [0.55, 0.6, 0.67, 0.72],
        [0, 1, 1, 0],
    );
    const spec4Y = useTransform(scrollYProgress, [0.55, 0.6], [50, 0]);

    const spec5Opacity = useTransform(
        scrollYProgress,
        [0.75, 0.8, 0.9, 0.95],
        [0, 1, 1, 0],
    );
    const spec5X = useTransform(scrollYProgress, [0.75, 0.8], [100, 0]);

    return (
        <main
            ref={containerRef}
            className="relative bg-background text-white selection:bg-accent-blue/30"
        >
            <Navbar />

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">
                {/* Subtle Ambient Gradients */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 rounded-full blur-[120px]" />
                </div>

                <canvas
                    ref={canvasRef}
                    className="relative max-w-[50vw] max-h-[50vh] h-full rounded-full object-contain z-0 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                    style={{
                        // Ensure it keeps aspect ratio via CSS too
                        aspectRatio: images[0]
                            ? `${images[0].width} / ${images[0].height}`
                            : "16 / 9",
                    }}
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

                {/* 1. HERO / INTRO (0–10%) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ opacity: introOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-30 px-6"
                >
                    {/* Strong dark gradient overlay behind hero text */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-transparent pointer-events-none" />

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.2,
                            duration: 1,
                            ease: "easeOut",
                        }}
                        className="relative backdrop-blur-2xl bg-black/40 border border-white/10 rounded-[2.5rem] p-12 md:p-20 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-5xl mx-auto overflow-hidden"
                    >
                        {/* Inner glass highlight */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                        <motion.h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_10px_40px_rgba(0,0,0,1)] [text-shadow:_0_4px_24px_rgba(0,0,0,1)] leading-none">
                            Subaru Impreza
                        </motion.h1>
                        <motion.p className="text-xl md:text-3xl font-medium text-white/80 mb-6 drop-shadow-2xl [text-shadow:_0_2px_12px_rgba(0,0,0,1)]">
                            Motion, perfected.
                        </motion.p>
                        <motion.p className="text-sm md:text-lg text-white/50 max-w-xl mx-auto drop-shadow-xl font-medium leading-relaxed">
                            The legendary rally-bred icon, re-engineered for the
                            modern road.
                        </motion.p>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-12 flex flex-col items-center gap-2"
                    >
                        <div className="w-[1px] h-12 bg-gradient-to-b from-[#0050FF] to-transparent" />
                        <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">
                            Scroll to Explore
                        </span>
                    </motion.div>
                </motion.div>

                {/* 2. ENGINEERING REVEAL (15–40%) */}
                <motion.div
                    style={{ opacity: engineeringOpacity, x: engineeringX }}
                    className="absolute inset-y-0 left-0 flex flex-col justify-center pointer-events-none px-8 md:px-16 max-w-[45vw] z-20"
                >
                    <GlassPanel>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white/90 leading-tight drop-shadow-lg">
                            Precision-engineered <br /> for control.
                        </h2>
                        <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed drop-shadow-md">
                            <p>
                                High-tensile steel frame and optimized
                                aerodynamics deliver unparalleled stability.
                            </p>
                        </div>
                    </GlassPanel>

                    <div className="mt-10 flex flex-col gap-5">
                        <SpecCard
                            label="Chassis"
                            value="High-Tensile Steel"
                            variant="accent"
                            style={{ opacity: spec1Opacity, x: spec1X }}
                        />
                        <SpecCard
                            label="Distribution"
                            value="50:50 Weight"
                            style={{ opacity: spec2Opacity, x: spec2X }}
                        />
                    </div>
                </motion.div>

                {/* 3. PERFORMANCE & DRIVETRAIN (45–70%) */}
                <motion.div
                    style={{ opacity: performanceOpacity, x: performanceX }}
                    className="absolute inset-y-0 right-0 flex flex-col justify-center text-right pointer-events-none px-8 md:px-16 max-w-[45vw] ml-auto z-20"
                >
                    <GlassPanel>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white/90 leading-tight drop-shadow-lg">
                            Symmetrical <br /> All-Wheel Drive.
                        </h2>
                        <ul className="space-y-4 text-white/60 text-base md:text-lg drop-shadow-md">
                            <li>Maximum traction in any condition.</li>
                            <li>Power routed to all four wheels.</li>
                        </ul>
                    </GlassPanel>

                    <div className="mt-10 flex flex-col items-end gap-5">
                        <SpecCard
                            label="Acceleration"
                            value="0-60 MPH in 4.5s"
                            variant="accent"
                            style={{ opacity: spec3Opacity, y: spec3Y }}
                        />
                        <SpecCard
                            label="Control"
                            value="Active Torque Vectoring"
                            style={{ opacity: spec4Opacity, y: spec4Y }}
                        />
                    </div>
                </motion.div>

                {/* 4. HEART OF THE MACHINE (72–92%) */}
                <motion.div
                    style={{ opacity: heartOpacity, x: heartX }}
                    className="absolute inset-y-0 left-0 flex flex-col justify-center pointer-events-none px-8 md:px-16 max-w-[45vw] z-20"
                >
                    <GlassPanel>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white/90 leading-tight drop-shadow-lg">
                            The heartbeat <br /> of a champion.
                        </h2>
                        <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed drop-shadow-md">
                            <p>
                                The legendary SUBARU BOXER® engine provides a
                                lower center of gravity.
                            </p>
                        </div>
                    </GlassPanel>

                    <div className="mt-10">
                        <SpecCard
                            label="Engine"
                            value="300 HP Turbo Boxer"
                            variant="accent"
                            style={{ opacity: spec5Opacity, x: spec5X }}
                        />
                    </div>
                </motion.div>

                {/* 5. REASSEMBLY & CTA + FOOTER (85–100%) */}
                <motion.div
                    style={{ opacity: finalOpacity }}
                    className="absolute inset-0 flex flex-col justify-end pointer-events-none z-20"
                >
                    <motion.div
                        style={{ scale: finalScale }}
                        className="flex-1 flex flex-col items-center justify-center text-center px-6"
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white drop-shadow-[0_10px_40px_rgba(0,0,0,1)] leading-none uppercase italic">
                            Own the <br /> road.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
                            <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-accent-blue hover:text-white transition-all flex items-center gap-3 group shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                                Experience Impreza
                                <LucideChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    <Footer />
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
            <div className="h-[700vh] w-full" />
        </main>
    );
}
