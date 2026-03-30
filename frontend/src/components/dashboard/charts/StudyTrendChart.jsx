import {
  AreaChart,
  Area,
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

// Study intensity levels
const getStudyLevel = (hours) => {
  if (hours >= 6) return { label: "Deep Work", emoji: "🚀", color: "rgba(195,180,240,0.9)" };
  if (hours >= 4) return { label: "Focused", emoji: "📚", color: "rgba(200,210,240,0.9)" };
  if (hours >= 2) return { label: "Light", emoji: "📝", color: "rgba(220,220,240,0.9)" };
  if (hours > 0) return { label: "Minimal", emoji: "🌿", color: "rgba(240,220,210,0.9)" };
  return { label: "None", emoji: "😴", color: "rgba(240,200,200,0.9)" };
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const val = payload[0]?.value;
  const level = getStudyLevel(val);

  return (
    <div style={{
      background: "rgba(250,247,255,0.97)",
      border: "1px solid rgba(210,200,240,0.5)",
      borderRadius: 16,
      padding: "10px 16px",
      fontFamily: fonts.sans,
      boxShadow: "0 8px 32px rgba(180,160,220,0.15)",
    }}>
      <p style={{ fontSize: 11, color: "#8A7FA8", margin: "0 0 5px", letterSpacing: "0.08em" }}>
        {label}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>{level.emoji}</span>
        <div>
          <p style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#2A2A2A",
            margin: 0,
            fontFamily: fonts.serif
          }}>
            {val}h
          </p>
          <p style={{ fontSize: 11, color: "#7A8A9A", margin: 0 }}>
            {level.label}
          </p>
        </div>
      </div>
    </div>
  );
};

const StudyTrendChart = ({ data = [] }) => {
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    study: item.studyHours ?? 0,
  }));

  const avg = formattedData.length
    ? +(formattedData.reduce((s, d) => s + d.study, 0) / formattedData.length).toFixed(1)
    : null;

  return (
    <div style={{ fontFamily: fonts.sans }}>

      {/* Avg badge */}
      {avg !== null && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <div style={{
            background: "rgba(235,225,250,0.7)",
            border: "1px solid rgba(210,200,240,0.5)",
            borderRadius: 14,
            padding: "6px 16px",
            textAlign: "right",
          }}>
            <p style={{
              fontSize: 10,
              color: "#8A7FA8",
              margin: "0 0 1px",
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}>
              Avg
            </p>
            <p style={{
              fontSize: 17,
              fontWeight: 400,
              color: "#2A2A2A",
              margin: 0,
              fontFamily: fonts.serif
            }}>
              {avg}
              <span style={{ fontSize: 11, color: "#8A7FA8" }}>h</span>
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {formattedData.length === 0 ? (
        <div style={{
          height: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10
        }}>
          <span style={{ fontSize: 34 }}>📚</span>
          <p style={{
            fontSize: 13,
            color: "#9A8A93",
            margin: 0,
            fontWeight: 300
          }}>
            No study data yet — start logging to see your trend.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 6, left: -18, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(220,210,240,0.35)"
              vertical={false}
            />

            {/* Focus benchmark */}
            <ReferenceLine
              y={4}
              stroke="rgba(160,140,220,0.4)"
              strokeDasharray="6 3"
              strokeWidth={1.5}
            />

            {avg && (
              <ReferenceLine
                y={avg}
                stroke="rgba(180,150,230,0.4)"
                strokeDasharray="6 3"
                strokeWidth={1.5}
              />
            )}

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#8A7FA8", fontFamily: fonts.sans }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />

            <YAxis
              domain={[0, 8]}
              tick={{ fontSize: 11, fill: "#8A7FA8", fontFamily: fonts.sans }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}h`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(235,225,250,0.2)", radius: 8 }}
            />

            <Area
              type="monotone"
              dataKey="study"
              stroke="rgba(150,120,220,0.9)"
              fill="rgba(200,180,250,0.35)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StudyTrendChart;