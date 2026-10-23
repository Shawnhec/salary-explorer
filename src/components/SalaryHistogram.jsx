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

const BIN_SIZE = 25000;

const SalaryHistogram = ({ jobs }) => {
  const medians = jobs.map((job) => job.median).filter(Number.isFinite);
  const maxMedian = medians.length ? Math.max(...medians) : 0;
  const binCount = Math.floor(maxMedian / BIN_SIZE) + 1;

  const data = Array.from({ length: medians.length ? binCount : 0 }, (_, i) => ({
    range: `$${i * BIN_SIZE / 1000}k`,
    count: 0,
  }));
  medians.forEach((m) => {
    data[Math.floor(m / BIN_SIZE)].count += 1;
  });

  return (
    <div className="chart-container">
      <h3>Median Salary Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" name="Occupations" fill="#4f7cac" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryHistogram;
