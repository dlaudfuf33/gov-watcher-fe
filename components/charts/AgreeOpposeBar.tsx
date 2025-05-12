interface AgreeOpposeBarProps {
  agreeRatio: number;
  opposeRatio: number;
}

export default function AgreeOpposeBar({
  agreeRatio,
  opposeRatio,
}: AgreeOpposeBarProps) {
  return (
    <>
      <div className="w-full mt-2">
        <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-500"
            style={{ width: `${agreeRatio}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-red-500"
            style={{ width: `${opposeRatio}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-600 font-medium px-0.5">
          <span className="text-blue-600">찬성 {agreeRatio}%</span>
          <span className="text-red-500">반대 {opposeRatio}%</span>
        </div>
      </div>
    </>
  );
}
