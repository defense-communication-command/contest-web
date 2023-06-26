"use client";

import { useState } from "react";

export const Sidebar = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const [duration, setDuration] = useState(new Date());

  return (
    <aside className="absolute bottom-8 left-8 grid gap-4 overflow-hidden rounded bg-white/30 p-6 backdrop-blur">
      <div>
        <label htmlFor="base-date" className="block text-2xl font-semibold">
          분석 기준 날짜
        </label>
        <input
          className="mt-2 w-full rounded p-2"
          id="base-date"
          type="date"
          onChange={(e) => setBaseDate(new Date(e.target.value))} />
      </div>
      <div>
        <label htmlFor="duration" className="block text-2xl font-semibold">
          확인 기간
        </label>
        <select id="duration" className="mt-2 w-full rounded p-2">
          <option>1개월</option>
          <option>6개월</option>
          <option>12개월</option>
        </select>
      </div>
    </aside>
  );
};
