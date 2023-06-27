
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
      <h1 className="text-6xl font-semibold py-8">서울시 월별 예상 미세먼지 농도</h1>
      <Sidebar props={{ year, setYear, month, setMonth }} />
      <Suspense fallback={<StaticMap />}>
        <Map year={year} month={month} />
      </Suspense>
    </>
  );
}
