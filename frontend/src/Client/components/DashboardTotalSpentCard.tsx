import { ArrowUpRight } from "lucide-react";

export interface SpendingItem {
  month: string;
  amount: number;
}

export default function TotalSpentCard({ data }: { data: SpendingItem[] }) {
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);
  const maxAmount = Math.max(...data.map((d) => d.amount));

  // Chart Dimensions Configuration
  const width = 600;
  const height = 220;
  const paddingX = 30;
  const paddingY = 30; // Bottom padding for labels
  const topMargin = 20;

  // Helper functions to map data to SVG coordinates
  const getX = (index: number) => {
    return (index / (data.length - 1)) * (width - 2 * paddingX) + paddingX;
  };

  const getY = (value: number) => {
    const chartHeight = height - paddingY - topMargin;
    // Invert Y because SVG 0 is at top
    return height - paddingY - (value / maxAmount) * chartHeight;
  };

  // Generate points string for polyline
  const points = data.map((d, i) => `${getX(i)},${getY(d.amount)}`).join(" ");

  // Generate path for area fill (closed loop)
  const firstX = getX(0);
  const lastX = getX(data.length - 1);
  const bottomY = height - paddingY;
  const areaPath = `M ${firstX},${getY(data[0].amount)} L ${points.split(" ").join(" L ")} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;

  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex-1 flex flex-col justify-between min-h-[300px]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">
            Total Spent (Last 12 Months)
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            $
            {total.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <button className="text-[#4F7FAF] hover:bg-blue-50 p-2 rounded-full transition-colors">
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Line Chart Visualization */}
      <div className="w-full mt-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4F7FAF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4F7FAF" stopOpacity="0" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                floodColor="#4F7FAF"
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Area Fill */}
          <path d={areaPath} fill="url(#chartGradient)" stroke="none" />

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#4F7FAF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#shadow)"
          />

          {/* X-Axis Labels */}
          {data.map((item, i) => (
            <text
              key={`label-${i}`}
              x={getX(i)}
              y={height - 5}
              textAnchor="middle"
              className="text-[10px] fill-gray-400 font-medium uppercase"
              style={{ fontSize: "10px" }}
            >
              {item.month.substring(0, 3)}
            </text>
          ))}

          {/* Interactive Data Points */}
          {data.map((item, i) => (
            <g key={`point-${i}`} className="group cursor-pointer">
              {/* Invisible larger hit area */}
              <circle
                cx={getX(i)}
                cy={getY(item.amount)}
                r="12"
                fill="transparent"
              />

              {/* Visible dot */}
              <circle
                cx={getX(i)}
                cy={getY(item.amount)}
                r="4"
                className="fill-white stroke-[#4F7FAF] stroke-[3px] transition-all duration-200 group-hover:r-6 group-hover:fill-[#3b82f6]"
              />

              {/* Tooltip */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <rect
                  x={getX(i) - 25}
                  y={getY(item.amount) - 40}
                  width="50"
                  height="26"
                  rx="6"
                  fill="#1f2937"
                />
                <text
                  x={getX(i)}
                  y={getY(item.amount) - 23}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                  dominantBaseline="middle"
                >
                  ${item.amount}
                </text>
                {/* Little triangle arrow */}
                <path
                  d={`M ${getX(i)},${getY(item.amount) - 14} L ${getX(i) - 4},${getY(item.amount) - 14} L ${getX(i)},${getY(item.amount) - 10} L ${getX(i) + 4},${getY(item.amount) - 14} Z`}
                  fill="#1f2937"
                />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
