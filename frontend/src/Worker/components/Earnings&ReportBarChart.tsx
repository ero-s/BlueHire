import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "JAN", earnings: 25000 },
  { month: "FEB", earnings: 52000 },
  { month: "MAR", earnings: 42000 },
  { month: "APR", earnings: 43000 },
  { month: "MAY", earnings: 31000 },
  { month: "JUN", earnings: 63000 },
  { month: "JUL", earnings: 68000 },
  { month: "AUG", earnings: 22000 },
  { month: "SEP", earnings: 64000 },
  { month: "OCT", earnings: 56000 },
  { month: "NOV", earnings: 74000 },
  { month: "DEC", earnings: 82000 },
];

const EarningsBarChart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value / 1000}K`} />
          <Tooltip formatter={(value: number) => `₱${value.toLocaleString()}`} />
          <Bar dataKey="earnings" fill="#3f51b5" barSize={40} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsBarChart;
