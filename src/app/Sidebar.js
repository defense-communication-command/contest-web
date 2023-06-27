export const Sidebar = ({ props }) => {

  return (
    <aside className="flex flex-row gap-4 overflow-hidden rounded bg-white/30 p-4 backdrop-blur">
      <div className="px-4">
        <label htmlFor="year" className="block text-2xl font-semibold">
          과거 데이터 기간 선택
        </label>
        <select id="year" onChange={e => props.setYear(e.target.value)} className="mt-2 w-full rounded p-2">
          <option value={1}>1년</option>
          <option value={3}>3년</option>
          <option value={5}>5년</option>
        </select>
      </div>
      <div className="grow px-4">
        <label htmlFor="month" className="grow flex text-2xl font-semibold">
          분석할 월 선택
        </label>
        <input type="range" min="1" max="12" onChange={(e) => props.setMonth(e.target.value + "월")} id="month" value={props.month.replace("월", "")} className="mt-2 w-full rounded p-2" list="values" />
        <datalist
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            writingMode: "unset",
            width: "100%",
          }}
          id="values"
        >
          <option value="1" label="1월"></option>
          <option value="2" label="2월"></option>
          <option value="3" label="3월"></option>
          <option value="4" label="4월"></option>
          <option value="5" label="5월"></option>
          <option value="6" label="6월"></option>
          <option value="7" label="7월"></option>
          <option value="8" label="8월"></option>
          <option value="9" label="9월"></option>
          <option value="10" label="10월"></option>
          <option value="11" label="11월"></option>
          <option value="12" label="12월"></option>
        </datalist>
      </div>
    </aside >
  );
};
