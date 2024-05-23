"use client";
import React from "react";
import { IconClipboard } from "@tabler/icons-react";
import { cn } from "../utils/cn";

export const ButtonsCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
   
      <div >{children}</div>

  );
};
