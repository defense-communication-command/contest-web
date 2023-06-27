"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLOR_RANGE } from "./Map";

export const District = ({ data, path }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const light = data.lightness > 0 ? data.lightness : hovered ? 30 : 50;

  return (
    <g style={{ cursor: "pointer" }}>
      <path
        onClick={() => {
          router.push(path);
        }}
        z="-1"
        stroke={"black"}
        strokeWidth="4"
        d={data.d}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        style={{
          fill: densityToColor(data.density, light),
          transition: "fill 0.2s ease-in-out",
        }}
      />

    </g>
  );
};

export const densityToColor = (density, lightness) =>
  `hsl(${COLOR_RANGE - density} 50% ${lightness}%)`;