import React from "react";

interface Settings {
  start_num: number;
  end_num: number;
  format: string;
}

interface Props {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const QuizRange = ({ settings, setSettings }: Props) => {
  const handleChangeSettings = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const data = { ...settings, [name]: value };
    if (Number(data.start_num) >= Number(data.end_num)) {
      return;
    }
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold">出題範囲</label>
      <div className="flex gap-6 items-center">
        <select
          value={settings.start_num}
          onChange={(e) => handleChangeSettings(e)}
          className="flex-1 border-b-2 py-1"
          name="start_num"
        >
          <option value={1}>1</option>
          <option value={11}>11</option>
          <option value={21}>21</option>
          <option value={31}>31</option>
          <option value={41}>41</option>
          <option value={51}>51</option>
          <option value={61}>61</option>
          <option value={71}>71</option>
          <option value={81}>81</option>
          <option value={91}>91</option>
        </select>
        <span>～</span>
        <select
          className="flex-1 border-b-2 py-1"
          value={settings.end_num}
          onChange={(e) => handleChangeSettings(e)}
          name="end_num"
        >
          <option value={1}>1</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={60}>60</option>
          <option value={70}>70</option>
          <option value={80}>80</option>
          <option value={90}>90</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default QuizRange;
