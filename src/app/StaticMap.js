import mapData from "@/app/data/mapData";
import { District } from "./District";

export const COLOR_RANGE = 130;

export default function StaticMap() {

  return (
    <div className="overflow-scroll relative">
      <div className="absolute top-0 left-0 bg-white/40 mt-6 p-4 rounded-lg">
        <h2 className="text-3xl font-semibold text-transparent">서울시 예상 미세먼지 농도</h2>
        <div className="text-lg pt-2 text-transparent">
          예상 미세먼지 농도가 가장 높은 지역은 <span className="font-bold text-xl"></span>입니다.
        </div>
      </div>
      <svg
        className="mx-auto my-4 max-w-4xl pl-20"
        viewBox="0 0 800 656"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter>
            <feGaussianBlur in="SourceAlpha" stdDeviation="10"></feGaussianBlur>
            <feOffset dx="0" dy="0" result="offsetblur"></feOffset>
            <feMerge>
              <feMergeNode></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <filter>
            <feGaussianBlur
              in="SourceAlpha"
              stdDeviation="1.4"
            ></feGaussianBlur>
            <feOffset dx="1" dy="1" result="offsetblur"></feOffset>
            <feMerge>
              <feMergeNode></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g>
          {mapData.map((d) => {
            const density = 0;
            return (
              <District
                key={d.id + "_polygon"}
                data={{ ...d, density, lightness: 30 }}
              />
            );
          })}
          {mapData.map((data) => {
            return (
              <text
                key={data.id + "_text"}
                stroke={"white"}
                fill={"white"}
                strokeLinecap="round"
                strokeWidth="1"
                z="100"
                x={Number(data.x) - 25}
                y={Number(data.y)}
                style={{ pointerEvents: "none" }}
              >
                {data.district}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
}


