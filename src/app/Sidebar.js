"use client";

import { useState } from "react";

export const Sidebar = ({ props }) => {

  return (
    <aside className="absolute bottom-8 left-8 grid gap-4 overflow-hidden rounded bg-white/30 p-6 backdrop-blur">
      <div>
        <label htmlFor="year" className="block text-2xl font-semibold">
          분석 년 수
        </label>
        <select id="year" onChange={e => props.setYear(e.target.value)} className="mt-2 w-full rounded p-2">
          <option value={1}>1년</option>
          <option value={3}>3년</option>
          <option value={5}>5년</option>
        </select>
      </div>
      <div>
        <label htmlFor="month" className="block text-2xl font-semibold">
          확인 월
        </label>
        <select onChange={(e) => props.setMonth(e.target.value)} id="month" className="mt-2 w-full rounded p-2">
          <option value="1월">1월</option>
          <option value="2월">2월</option>
          <option value="3월">3월</option>
          <option value="4월">4월</option>
          <option value="5월">5월</option>
          <option value="6월">6월</option>
          <option value="7월">7월</option>
          <option value="8월">8월</option>
          <option value="9월">9월</option>
          <option value="10월">10월</option>
          <option value="11월">11월</option>
          <option value="12월">12월</option>
        </select>
      </div>
    </aside>
  );
};
