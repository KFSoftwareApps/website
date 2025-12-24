
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt?: string;
}

export default function Lightbox({ isOpen, onClose, src, alt = "Image" }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto outline-none"
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
                    >
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                        >
                            <X className="h-8 w-8" />
                        </button>
                        <img
                            src={src}
                            alt={alt}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
