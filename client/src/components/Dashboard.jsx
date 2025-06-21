import { useSelector } from "react-redux";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Get week number of a date
const getWeekNumber = (date) => {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
};

// 🔄 Get Grouped Chart Data
const getGroupedData = (dreams, mode) => {
  const now = new Date();
  let range = [];

  if (mode === "day") {
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const key = date.toDateString();
      const label = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      range.push({ key, label, count: 0 });
    }
  } else if (mode === "week") {
    for (let i = 3; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i * 7);
      const week = getWeekNumber(date);
      const label = `Week ${week}`;
      range.push({ key: week, label, count: 0 });
    }
  } else if (mode === "month") {
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(now.getMonth() - i);
      const key = `${date.getMonth()}-${date.getFullYear()}`;
      const label = date.toLocaleString("default", { month: "short", year: "2-digit" });
      range.push({ key, label, count: 0 });
    }
  }

  dreams.forEach((dream) => {
    const date = new Date(dream.date);

    if (mode === "day") {
      const key = date.toDateString();
      const item = range.find((r) => r.key === key);
      if (item) item.count++;
    } else if (mode === "week") {
      const week = getWeekNumber(date);
      const item = range.find((r) => r.key === week);
      if (item) item.count++;
    } else if (mode === "month") {
      const key = `${date.getMonth()}-${date.getFullYear()}`;
      const item = range.find((r) => r.key === key);
      if (item) item.count++;
    }
  });

  return range;
};

const Dashboard = () => {
  const dreams = useSelector((state) => state.dreams.allDreams) || [];
  console.log("DREAMS", dreams);
  const [viewMode, setViewMode] = useState("week"); // day | week | month

  const chartData = getGroupedData(dreams, viewMode);
  const totalDreams = dreams.length;
  const past7Days = dreams.filter((d) => {
    const daysAgo = (new Date() - new Date(d.date)) / (1000 * 60 * 60 * 24);
    return daysAgo <= 7;
  });

  const titleWords = dreams.flatMap((d) => d.title.toLowerCase().split(/\s+/));
  const wordFreq = titleWords.reduce((acc, word) => {
    if (word.length <= 2) return acc;
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  const mostUsedWord =
    Object.entries(wordFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const longestDream = dreams.reduce(
  (longest, current) =>
    current.description.length > longest.description.length ? current : longest,
  { title: "", description: "" }
);


  const mostActive = chartData.reduce(
    (max, curr) => (curr.count > max.count ? curr : max),
    { label: "", count: 0 }
  );
  const leastActive = chartData.reduce(
    (min, curr) => (curr.count < min.count ? curr : min),
    { label: "", count: Infinity }
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dream Journal Dashboard</h1>

      {/* Selector */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium">Group By:</label>
        <select
          className="border px-3 py-1 rounded"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <option value="day">Daily (7 Days)</option>
          <option value="week">Weekly (4 Weeks)</option>
          <option value="month">Monthly (6 Months)</option>
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">
          Dreams per {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-sm mt-3 text-gray-600 space-y-1">
          <p>
            🏆 Most active {viewMode}: <strong>{mostActive.label}</strong> ({mostActive.count} dreams)
          </p>
          <p>
            📉 Least active {viewMode}: <strong>{leastActive.label}</strong> ({leastActive.count} dreams)
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold">Total Dreams</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalDreams}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold">Dreams in Past 7 Days</h2>
          <p className="text-3xl font-bold text-blue-500">{past7Days.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold">Most Used Word (Title)</h2>
          <p className="text-2xl italic text-gray-700">{mostUsedWord}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 col-span-1 sm:col-span-2">
          <h2 className="text-lg font-semibold">Longest Dream</h2>
          {longestDream.title ? (
            <>
              <p className="font-medium text-indigo-700">"{longestDream.title}"</p>
              <p className="text-sm text-gray-500"> {longestDream.description.length} characters </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">No dreams yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
