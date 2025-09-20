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
  const start_options = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
  const end_options = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
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
          {start_options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        <span>～</span>
        <select
          className="flex-1 border-b-2 py-1"
          value={settings.end_num}
          onChange={(e) => handleChangeSettings(e)}
          name="end_num"
        >
          {end_options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default QuizRange;
