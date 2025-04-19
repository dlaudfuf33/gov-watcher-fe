import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  changePeriod: string;
  descriptionPeriod: string;
  trendPeriod: "up" | "down" | "neutral";
  changeGov: string;
  descriptionGov: string;
  trendGov: "up" | "down" | "neutral";
  color: "blue" | "green" | "red" | "amber" | "purple";
}

export default function StatCard({
  title,
  value,
  changePeriod,
  descriptionPeriod,
  trendPeriod,
  changeGov,
  descriptionGov,
  trendGov,
  color,
}: StatCardProps) {
  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "text-blue-700 bg-gradient-to-br from-blue-200 to-blue-100 border-blue-500 backdrop-blur-lg hover:from-blue-300 hover:to-white";
      case "green":
        return "text-green-700 bg-gradient-to-br from-green-200 to-green-100 border-green-500 backdrop-blur-lg hover:from-green-300 hover:to-white";
      case "red":
        return "text-red-700 bg-gradient-to-br from-red-200 to-red-100 border-red-500 backdrop-blur-lg hover:from-red-300 hover:to-white";
      case "amber":
        return "text-amber-700 bg-gradient-to-br from-amber-200 to-amber-100 border-amber-500 backdrop-blur-lg hover:from-amber-300 hover:to-white";
      case "purple":
        return "text-purple-700 bg-gradient-to-br from-purple-200 to-purple-100 border-purple-500 backdrop-blur-lg hover:from-purple-300 hover:to-white";
      default:
        return "text-blue-700 bg-gradient-to-br from-blue-200 to-blue-100 border-blue-500 backdrop-blur-lg hover:from-blue-300 hover:to-white";
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    if (trend === "up")
      return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    if (trend === "down")
      return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getTrendClass = (trend: "up" | "down" | "neutral") => {
    if (trend === "up") return "text-green-500";
    if (trend === "down") return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg border backdrop-blur-md ${getColorClass()}`}
    >
      <div className="flex justify-between items-start mt-4">
        <div className="flex-1 min-h-[120px]">
          <h3 className="text-lg font-semibold text-gray-600 mb-3">{title}</h3>
          <p className="text-5xl font-extrabold">{value}</p>
        </div>
        <div className="flex flex-col gap-2 items-end self-end mt-auto">
          <div className="flex items-center">
            {getTrendIcon(trendPeriod)}
            <span
              className={`text-base font-semibold ml-1 ${getTrendClass(
                trendPeriod
              )}`}
            >
              {changePeriod}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {descriptionPeriod}
            </span>
          </div>
          <div className="flex items-center">
            {getTrendIcon(trendGov)}
            <span
              className={`text-base font-semibold ml-1 ${getTrendClass(
                trendGov
              )}`}
            >
              {changeGov}
            </span>
            <span className="text-sm text-gray-500 ml-2">{descriptionGov}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
