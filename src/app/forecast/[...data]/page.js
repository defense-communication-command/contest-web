import mapData from "@/app/data/mapData";
import * as d3 from "d3";

export default async function Page({ params }) {
  const url = params.data;
  if (url === undefined || url[0] === undefined || url[1] === undefined) {
    return <div>
      <h1 className="text-6xl font-semibold">404 Not Found!</h1>
    </div>
  }

  const districtId = url[0];
  const district = mapData.find((data) => data.id === districtId)?.district;
  const year = url[1];
  const chart = await fetch(process.env.NEXT_PUBLIC_URL + `/dust-${year}.json`);
  const chartData = await chart.json();
  const districtData = chartData.find((data) => data.id === districtId)
  const months = ["1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"];
  const districtDataArray = months.map((month, i) => Number(districtData[month]))

  let xScale = d3
    .scaleTime()
    .domain([0, districtDataArray.length - 1])
    .range([0, 100]);

  let yScale = d3
    .scaleLinear()
    .domain([d3.min(districtDataArray.map((d) => d)) - 1 ?? 0, d3.max(districtDataArray.map((d) => d)) + 1 ?? 0])
    .range([100, 0]);

  let line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.amount));

  let d = line(districtDataArray.map((d, i) => ({ date: i, amount: d })));

  return (
    <>
      <h1 className="absolute left-8 top-8 text-6xl font-semibold">{district}</h1>
      <div className="relative w-[100%] h-[50%] px-8 mt-40">

        <div className="@container relative h-full w-full"
          style={
            {
              "--marginTop": "6px",
              "--marginRight": "8px",
              "--marginBottom": "25px",
              "--marginLeft": "25px",
            }
          }>
          <svg className="absolute inset-0
          h-[calc(100%-var(--marginTop))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        ">
            {months.map((month, i) => {
              return (
                <g key={month} className="overflow-visible font-medium text-gray-100">
                  <text
                    x={`${xScale(i)}%`}
                    y="100%"
                    textAnchor={i === 0 ? "start" : i === months.length - 1 ? "end" : "middle"}
                    fill="currentColor"
                  >
                    {month}
                  </text>
                </g>
              )
            })}
          </svg>
          <svg className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          overflow-visible">
            <g className="translate-x-4">
              {yScale
                .ticks(8)
                .map(yScale.tickFormat(8, "d"))
                .map((value, i) => (
                  <text
                    key={i}
                    y={`${yScale(+value)}%`}
                    alignmentBaseline="middle"
                    textAnchor="end"
                    className="text-xs tabular-nums text-gray-100"
                    fill="currentColor"
                  >
                    {value}
                  </text>
                ))}
            </g>
          </svg>
          <svg
            className="absolute inset-0
              h-[calc(100%-var(--marginTop)-var(--marginBottom))]
              w-[calc(100%-var(--marginLeft)-var(--marginRight))]
              translate-x-[var(--marginLeft)]
              translate-y-[var(--marginTop)]
              overflow-visible"
          >
            <svg
              viewBox="0 0 100 100"
              className="overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {yScale
                .ticks(8)
                .map(yScale.tickFormat(8, "d"))
                .map((active, i) => (
                  <g
                    transform={`translate(0,${yScale(+active)})`}
                    className="text-gray-700"
                    key={i}
                  >
                    <line
                      x1={0}
                      x2={100}
                      stroke="currentColor"
                      strokeDasharray="6,5"
                      strokeWidth={0.5}
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                ))}

              {/* Line */}
              <path
                d={d}
                fill="none"
                className="text-gray-400"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />

              {/* Circles */}
              {districtDataArray.map((d, i) => (
                <path
                  key={i}
                  d={`M ${xScale(i)} ${yScale(d)} l 0.0001 0`}
                  vectorEffect="non-scaling-stroke"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-200"
                />
              ))}
            </svg>
          </svg>
        </div>
      </div>
    </>
  )
}