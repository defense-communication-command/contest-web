import mapData from "@/app/data/mapData";
import { District } from "./District";

export const COLOR_RANGE = 130;

export default async function Map({ year, month }) {
  const data = await fetch(process.env.NEXT_PUBLIC_URL + `/dust-${year}.json`);
  const chartData = await data.json();
  const highest = Math.max(...chartData.map((d) => d[month]));
  const lowest = Math.min(...chartData.map((d) => d[month]));

  const districtValues = chartData.reduce((acc, cur) => {
    acc[cur.id] = cur[month];
    return acc;
  }, {});

  // get the name of the highest and second highest districts
  const sortedDistrictValues = Object.values(districtValues).sort((a, b) => b - a);
  const highestDistrictId = Object.keys(districtValues).find((key) => districtValues[key] === sortedDistrictValues[0]);
  const secondHighestDistrictId = Object.keys(districtValues).find((key) => districtValues[key] === sortedDistrictValues[1]);

  const highestDistrict = mapData.find((data) => data.id === highestDistrictId)?.district;
  const secondHighestDistrict = mapData.find((data) => data.id === secondHighestDistrictId)?.district;


  return (
    <div className="overflow-scroll relative">
      <div className="absolute top-0 left-0 bg-white/40 mt-6 p-4 rounded-lg">
        <h2 className="text-3xl font-semibold">서울시 {month} 예상 미세먼지 농도</h2>
        <div className="text-lg pt-2">
          예상 미세먼지 농도가 가장 높은 지역은 <span className="font-bold text-xl">{highestDistrict}, {secondHighestDistrict}</span>입니다.
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
            const density = (districtValues[d.id] - lowest) / (highest - lowest) * COLOR_RANGE;
            return (
              <District
                key={d.id + "_polygon"}
                data={{ ...d, density }}
                path={`/forecast/${d.id}/${year}`}
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


