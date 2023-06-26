"use client";

import { useState } from "react";
import { densityToColor } from "./Map";
import { useRouter } from "next/navigation";

export const District = ({ data, path }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <g style={{ cursor: "pointer" }}>
      <path
        onClick={() => {
          router.push(path);
        }}
        z="-1"
        fill={densityToColor(data.density, hovered ? 30 : 50)}
        stroke={"black"}
        strokeWidth="4"
        d={data.d}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }} />
    </g>
  );
};
