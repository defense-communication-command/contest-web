
"use client";

import { Suspense, useState } from "react";
import Map from "./Map";
import { Sidebar } from "./Sidebar";
import StaticMap from "./StaticMap";

export default function Home() {
  const [year, setYear] = useState(1);
  const [month, setMonth] = useState("3월");

  return (
    <>
      <h1 className="absolute left-8 top-8 text-6xl font-semibold">DPM</h1>
      <Suspense fallback={<StaticMap />}>
        <Map year={year} month={month} />
      </Suspense>
      <Sidebar props={{ year, setYear, month, setMonth }} />
    </>
  );
}
