import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans:  "'DM Sans', sans-serif",
};

// Sleep quality thresholds
const getSleepQuality = (hours) => {
  if (hours >= 8)  return { label: "Well rested", emoji: "🌟", color: "rgba(180,215,185,0.9)" };
  if (hours >= 7)  return { label: "Good",         emoji: "😌", color: "rgba(160,200,230,0.9)" };
  if (hours >= 6)  return { label: "Okay",          emoji: "😐", color: "rgba(200,210,240,0.9)" };
  if (hours >= 4)  return { label: "Low",           emoji: "😕", color: "rgba(240,210,190,0.9)" };
  return               { label: "Poor",           emoji: "😓", color: "rgba(240,190,195,0.9)" };
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val  = payload[0]?.value;
  const qual = getSleepQuality(val);
  return (
    <div style={{
      background: "rgba(246,250,255,0.97)",
      border: "1px solid rgba(180,210,235,0.55)",
      borderRadius: 16, padding: "10px 16px",
      fontFamily: fonts.sans,
      boxShadow: "0 8px 32px rgba(130,160,200,0.15)",
    }}>
      <p style={{ fontSize: 11, color: "#8094A7", margin: "0 0 5px", letterSpacing: "0.08em" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>{qual.emoji}</span>
        <div>
          <p style={{ fontSize: 15, fontWeight: 400, color: "#2A2A2A", margin: 0, fontFamily: fonts.serif }}>
            {val}h
          </p>
          <p style={{ fontSize: 11, color: "#7A8A9A", margin: 0 }}>{qual.label}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Custom Bar Shape ─────────────────────────────────────────────────────────
const RoundedBar = (props) => {
  const { x, y, width, height, fill } = props;
  if (!height || height <= 0) return null;
  const r = Math.min(8, width / 2);
  return (
    <path
      d={`M${x + r},${y} h${width - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${height - r} h-${width} v-${height - r} a${r},${r} 0 0 1 ${r},-${r}z`}
      fill={fill}
    />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const SleepTrendChart = ({ data = [] }) => {
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    sleep: item.sleepHours ?? 0,
  }));

  const avg = formattedData.length
    ? +(formattedData.reduce((s, d) => s + d.sleep, 0) / formattedData.length).toFixed(1)
    : null;

  return (
    <div style={{ fontFamily: fonts.sans }}>

      {/* Avg badge */}
      {avg !== null && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <div style={{
            background: "rgba(221,235,247,0.75)",
            border: "1px solid rgba(180,210,235,0.55)",
            borderRadius: 14, padding: "6px 16px", textAlign: "right",
          }}>
            <p style={{ fontSize: 10, color: "#7A96AB", margin: "0 0 1px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Avg</p>
            <p style={{ fontSize: 17, fontWeight: 400, color: "#2A2A2A", margin: 0, fontFamily: fonts.serif }}>
              {avg}<span style={{ fontSize: 11, color: "#7A96AB" }}>h</span>
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {formattedData.length === 0 ? (
        <div style={{ height: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ fontSize: 34 }}>😴</span>
          <p style={{ fontSize: 13, color: "#9A8A93", margin: 0, fontWeight: 300 }}>
            No sleep data yet — start logging to see your trend.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={formattedData} margin={{ top: 10, right: 6, left: -18, bottom: 0 }} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(200,215,230,0.35)" vertical={false} />

            {/* Ideal sleep reference bands */}
            <ReferenceLine y={8} stroke="rgba(140,195,160,0.4)" strokeDasharray="6 3" strokeWidth={1.5} label={{ value: "ideal", position: "insideTopRight", fontSize: 10, fill: "rgba(100,160,110,0.6)", fontFamily: fonts.sans }} />
            {avg && <ReferenceLine y={avg} stroke="rgba(130,170,210,0.4)" strokeDasharray="6 3" strokeWidth={1.5} />}

            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8094A7", fontFamily: fonts.sans }} axisLine={false} tickLine={false} dy={6} />
            <YAxis domain={[0, 12]} ticks={[0, 3, 6, 8, 10, 12]} tick={{ fontSize: 11, fill: "#8094A7", fontFamily: fonts.sans }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}h`} />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(221,235,247,0.2)", radius: 8 }} />

            <Bar dataKey="sleep" shape={<RoundedBar />} maxBarSize={40}>
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getSleepQuality(entry.sleep).color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Quality legend */}
      <div style={{
        display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap",
        borderTop: "1px solid rgba(200,215,230,0.35)", paddingTop: 12,
      }}>
        {[
          ["rgba(180,215,185,0.9)", "≥ 8h", "Well rested"],
          ["rgba(160,200,230,0.9)", "≥ 7h", "Good"],
          ["rgba(200,210,240,0.9)", "≥ 6h", "Okay"],
          ["rgba(240,210,190,0.9)", "≥ 4h", "Low"],
          ["rgba(240,190,195,0.9)", "< 4h", "Poor"],
        ].map(([color, range, label]) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#8094A7" }}>
            <span style={{
              width: 10, height: 10, borderRadius: 3,
              background: color, display: "inline-block", flexShrink: 0,
            }} />
            <span>{range} – {label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SleepTrendChart;