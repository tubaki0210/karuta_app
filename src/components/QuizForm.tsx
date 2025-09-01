import QuizRange from "./QuizRange";

interface Settings {
  start_num: number;
  end_num: number;
  format: string;
}

interface Props {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  handleStart: () => void;
  children: React.ReactNode;
}

const QuizForm = ({ settings, setSettings, handleStart, children }: Props) => {
  return (
    <div className="bg-white shadow-2xl p-8 flex flex-col   w-[500px]">
      <QuizRange settings={settings} setSettings={setSettings} />
      {/* ランダムにするかどうか */}
      {children}
      <div className="w-full mt-20 flex justify-center">
        <button
          type="button"
          className="w-2/3 py-3 bg-green-500 text-white font-bold"
          onClick={handleStart}
        >
          開始
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
