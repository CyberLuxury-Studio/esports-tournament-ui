"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-targetable='true']") ||
        target.closest(".targetable")
      ) {
        setIsHoveringTarget(true);
      } else {
        setIsHoveringTarget(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      animate={{
        x: mousePosition.x - 24,
        y: mousePosition.y - 24,
        scale: isClicking ? 0.8 : isHoveringTarget ? 1.5 : 1,
        rotate: isHoveringTarget ? 45 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neon-green transition-colors duration-300"
        style={{ color: isHoveringTarget ? "#FF003C" : "#00FF00" }}
      >
        <path
          d="M24 8v6M24 34v6M8 24h6M34 24h6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    </motion.div>
  );
}
