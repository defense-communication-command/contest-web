"use client";

import { useState } from "react";
import Map from "./Map";
import { Sidebar } from "./Sidebar";

export default function Home() {
  const [month, setMonth] = useState("1월");
  const [year, setYear] = useState(1);

  return (
    <>
      <h1 className="absolute left-8 top-8 text-6xl font-semibold">DPM</h1>
      <Map year={year} month={month} />
      <Sidebar />
    </>
  );
}
