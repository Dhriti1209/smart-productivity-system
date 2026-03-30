import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  const moodMeta = [
    null,
    { emoji: "😓", label: "Drained", bg: "rgba(221,235,247,0.95)" },
    { emoji: "😕", label: "Low",     bg: "rgba(240,220,230,0.95)" },
    { emoji: "😌", label: "Okay",    bg: "rgba(255,242,216,0.95)" },
    { emoji: "😊", label: "Good",    bg: "rgba(220,235,221,0.95)" },
    { emoji: "✨", label: "Great",   bg: "rgba(247,214,224,0.95)" },
  ];
  const meta = moodMeta[val] || { emoji: "•", label: `${val}`, bg: "rgba(255,248,251,0.95)" };

  return (
    <div style={{
      background: meta.bg,
      border: "1px solid rgba(220,175,195,0.5)",
      borderRadius: 16,
      padding: "10px 16px",
      fontFamily: fonts.sans,
      boxShadow: "0 8px 32px rgba(180,130,150,0.15)",
    }}>
      <p style={{ fontSize: 11, color: "#9A8A93", margin: "0 0 4px", letterSpacing: "0.08em" }}>
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>{meta.emoji}</span>
        <div>
          <p style={{ fontSize: 15, fontWeight: 500, color: "#2A2A2A", margin: 0, fontFamily: fonts.serif }}>
            {val} / 5
          </p>
          <p style={{ fontSize: 11, color: "#7A6A72", margin: 0 }}>{meta.label}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Custom Dot ───────────────────────────────────────────────────────────────
const CustomDot = (props) => {
  const { cx, cy, value } = props;
  if (value === undefined || value === null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={12} fill="rgba(247,214,224,0.25)" />
      <circle cx={cx} cy={cy} r={6} fill="rgba(196,143,160,0.9)" stroke="white" strokeWidth={2.5} />
    </g>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
// NOTE: No header here — title/label are already rendered by <ChartCard> in Analytics.jsx
const MoodTrendChart = ({ data = [] }) => {
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    mood: item.moodScore ?? item.mood ?? 0,
  }));

  const avg =
    formattedData.length
      ? +(formattedData.reduce((s, d) => s + d.mood, 0) / formattedData.length).toFixed(1)
      : null;

  return (
    <div style={{ fontFamily: fonts.sans }}>
      {/* Avg badge */}
      {avg !== null && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <div style={{
            background: "rgba(247,214,224,0.7)",
            border: "1px solid rgba(220,175,195,0.5)",
            borderRadius: 12, padding: "5px 14px",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 11, color: "#9A7080", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Avg
            </span>
            <span style={{ fontSize: 16, fontWeight: 400, color: "#2A2A2A", fontFamily: fonts.serif }}>
              {avg}<span style={{ fontSize: 11, color: "#9A7080" }}>/5</span>
            </span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {formattedData.length === 0 ? (
        <div style={{
          height: 220, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <span style={{ fontSize: 36 }}>😊</span>
          <p style={{ fontSize: 13, color: "#9A8A93", margin: 0, fontWeight: 300 }}>
            No mood data yet — start logging to see your trend.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={formattedData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(220,200,210,0.35)"
              vertical={false}
            />
            {avg && (
              <ReferenceLine
                y={avg}
                stroke="rgba(196,143,160,0.4)"
                strokeDasharray="6 3"
                strokeWidth={1.5}
              />
            )}
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9A8A93", fontFamily: fonts.sans }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 11, fill: "#9A8A93", fontFamily: fonts.sans }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => ["", "😓", "😕", "😌", "😊", "✨"][v] || v}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(196,143,160,0.25)", strokeWidth: 1.5 }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="rgba(196,143,160,0.9)"
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={{ r: 7, fill: "rgba(196,143,160,1)", stroke: "white", strokeWidth: 2.5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <div style={{
        display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap",
        borderTop: "1px solid rgba(220,200,210,0.3)", paddingTop: 12,
      }}>
        {[[1, "😓", "Drained"], [2, "😕", "Low"], [3, "😌", "Okay"], [4, "😊", "Good"], [5, "✨", "Great"]].map(
          ([v, emoji, label]) => (
            <span key={v} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#9A8A93" }}>
              <span>{emoji}</span>
              <span>{v} – {label}</span>
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default MoodTrendChart;