import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import * as activityApi from "../api/activityApi";

const RANGES = [
  { id: "day", label: "24 Hours" },
  { id: "week", label: "7 Days" },
  { id: "month", label: "30 Days" },
];

export default function ActivityChart() {
  const [range, setRange] = useState("week");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    function load() {
      activityApi
        .getActivity(range)
        .then((points) => {
          if (!cancelled) setData(points);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }

    setLoading(true);
    load();
    // "Real-time": refresh every 30s so the graph reflects new activity
    // without the admin needing to reload the page.
    const interval = setInterval(load, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [range]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Activity</h2>
        <div className="flex gap-1 rounded-lg border border-slate-200 p-1 dark:border-white/10">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                range === r.id
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-64">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading…</div>
        ) : data.every((d) => d.count === 0) ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No activity recorded in this range yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/10" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={30} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Events"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#activityFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
