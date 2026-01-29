"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`transition-all duration-300 ease-in-out ${scrolled ? "px-20" : ""}`}>
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
            className={`flex justify-between items-center px-3 z-20 py-2 mx-auto border border-neutral-400 rounded-full bg-white m-2 fixed top-0 left-0 right-0 ${
                scrolled ? "max-w-7xl" : "max-w-7xl"
            }`}
        >
            <div className="gap-8 flex items-center">
                <motion.h1 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-xl font-bold text-primary"
                >
                    Synco
                </motion.h1>
                <div className="flex gap-6 items-center">
                    {["Features", "About", "How it works ?"].map((item, index) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                            className="hover:text-primary cursor-pointer transition-colors text-sm font-medium"
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div> 
            <div className="flex gap-2">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <Link href="/get-started">
                        <Button className="rounded-full px-6 py-2">Get Started</Button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
        </div>
    );
}