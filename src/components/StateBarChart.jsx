import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StateBarChart = ({ jobs }) => {
  const counts = {};
  jobs.forEach((job) => {
    if (job.top_end_state) {
      counts[job.top_end_state] = (counts[job.top_end_state] ?? 0) + 1;
    }
  });

  const data = Object.entries(counts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="chart-container">
      <h3>Top-Paying States (Top 10)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" interval={0} angle={-30} textAnchor="end" height={70} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" name="Occupations" fill="#6aa84f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StateBarChart;
