import mapData from "@/app/data/mapData";
import { District } from "./District";

export const COLOR_RANGE = 130;

export default function StaticMap() {

  return (
    <div className="h-screen overflow-scroll">
      <svg
        className="mx-auto my-10 h-screen max-w-4xl pl-20"
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


