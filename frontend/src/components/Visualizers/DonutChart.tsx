import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";

const data = [
  { name: "Laundry", value: 10 },
  { name: "Cooking", value: 15 },
  { name: "Gardening", value: 20 },
  { name: "Babysitting", value: 25 },
  { name: "House Cleaning", value: 30 },
];

const COLORS = ["#5AB3E6", "#4D7EAF", "#26466F", "#334A60", "#B1DDF6"];

const DonutChart: React.FC = () => {
  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; // distance from pie slice
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        {`${data[index].value}% ${data[index].name}`}
      </text>
    );
  };

  return (
     <div style={{ width: "100%", height: 400 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
          label={renderCustomLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
  );
};

export default DonutChart;
