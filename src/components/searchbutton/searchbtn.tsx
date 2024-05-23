// UserInput.js
import React from 'react';
import { PlaceholdersAndVanishInput } from "./searchbtncomponent";

export function UserInput({ onChange, onSubmit }) {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <div className="flex flex-col justify-center items-center px-4 w-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
