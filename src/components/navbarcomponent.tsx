"use client";

import { useState } from 'react';
import { FloatingNav } from "./navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { Whiteboard } from 'whiteboard-react';

export function FloatingNavDemo() {
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "DevfolioJr",
      link: "https://devfolio-jr.vercel.app/",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Whiteboard",
      link: "/",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
      onClick: () => setIsWhiteboardOpen(true), // Set the modal open on click
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />

      {isWhiteboardOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative w-11/12 h-5/6 sm:w-5/6 sm:h-5/6 lg:w-3/4 lg:h-3/4">
            <button
              className="absolute top-0 right-0 text-white bg-red-500 hover:bg-red-600 border border-red-500 rounded-full p-2 transition-colors duration-200"
              onClick={() => setIsWhiteboardOpen(false)}
            >
              X
            </button>
            <Whiteboard style={{ border: '2px solid #000', width: '100%', height: '100%', backgroundColor: '#fff', pointerEvents: 'auto' }} />
          </div>
        </div>
      )}
    </div>
  );
}
