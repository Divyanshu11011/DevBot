"use client";
import React from "react";
import { toast, Toaster } from "sonner";
import { ButtonsCard } from "./landingpage";

export function Button({ navigateToMain }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Toaster position="top-center" />
      <div>
        {buttons.map((button, idx) => (
          <ButtonsCard key={idx}>
            {React.cloneElement(button.component, { onClick: navigateToMain })}
          </ButtonsCard>
        ))}
      </div>
    </div>
  );
}

export const buttons = [
  {
    name: "Chat With Devbot",
    description: "Dive in with devbot",
    showDot: false,
    component: (
      <button
        className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
        onClick={() => {}}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
          <span>{`Chat with DevBot`}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>
    ),
  },
];
