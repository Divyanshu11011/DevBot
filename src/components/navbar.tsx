"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn"; // Ensure this utility is working correctly

const bounceAnimation = {
  y: [0, -2, 0], // Define the keyframes for the bounce effect
  transition: {
    duration: 1, // Duration of one cycle of the animation
    repeat: Infinity, // Repeat the animation infinitely
    ease: "easeInOut", // Easing function for the animation
  },
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
    onClick?: () => void; // Add onClick handler
  }[];
  className?: string;
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (name: string, onClick?: () => void, link?: string) => {
    setSelectedItem(name);
    if (onClick) onClick(); // Call onClick if provided
    if (link) window.location.href = link; // Redirect to the link if provided
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={bounceAnimation}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
       <a
       key={`link=${idx}`}
       href={navItem.link}
       className={cn(
         "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
       )}
       onClick={(e) => {
         e.preventDefault(); // Prevent default link behavior
         handleItemClick(navItem.name, navItem.onClick); // Handle click
         if (navItem.name === "DevfolioJr") {
           window.open(navItem.link, "_blank", "noopener,noreferrer"); // Open link in new tab
         } else if (navItem.name === "Home") {
           window.location.href = navItem.link; // Open link in same tab for Home
         }
       }}
     >
       <span className="block sm:hidden">{navItem.icon}</span>
       <span className="hidden sm:block text-sm">{navItem.name}</span>
     </a>
     
     
       
        
        ))}
      <button
  className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
  onClick={() => window.open("https://portfolio-neon-zeta-31.vercel.app/", "_blank", "noopener,noreferrer")}
>
  <span>PortFolio</span>
  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
</button>


      </motion.div>
    </AnimatePresence>
  );
};
