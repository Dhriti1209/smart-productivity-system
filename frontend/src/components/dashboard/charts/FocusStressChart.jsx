import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(225,205,215,0.6)",
      borderRadius: 14,
      padding: "10px 16px",
      boxShadow: "0 8px 30px rgba(180,130,150,0.12)",
      fontFamily: fonts.sans,
    }}>
      <p style={{ fontSize: 11, color: "#B09AA8", margin: "0 0 3px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {d.payload.subject}
      </p>
      <p style={{ fontSize: 20, fontWeight: 400, color: "#2A2A2A", margin: 0, fontFamily: fonts.serif }}>
        {d.value}
        <span style={{ fontSize: 12, color: "#9A8A93", marginLeft: 4, fontFamily: fonts.sans }}>/ 5</span>
      </p>
    </div>
  );
};

// ─── Stat pill ────────────────────────────────────────────────────────────────
const StatPill = ({ label, value, bg, border, textColor, barColor }) => (
  <div style={{
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: 18,
    padding: "14px 18px",
    flex: 1,
  }}>
    <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: textColor, margin: "0 0 6px", fontFamily: fonts.sans }}>
      {label}
    </p>
    <p style={{ fontSize: 26, fontWeight: 400, color: "#2A2A2A", margin: "0 0 10px", fontFamily: fonts.serif, lineHeight: 1 }}>
      {value}<span style={{ fontSize: 12, color: "#9A8A93", marginLeft: 3, fontFamily: fonts.sans }}>/5</span>
    </p>
    {/* Mini bar */}
    <div style={{ height: 4, borderRadius: 4, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: `${(value / 5) * 100}%`,
        background: barColor,
        borderRadius: 4,
        transition: "width 0.6s ease",
      }} />
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const FocusStressChart = ({ data = [] }) => {
  // Empty state
  if (!data.length) {
    return (
      <div style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(225,205,215,0.5)",
        borderRadius: 28,
        padding: "28px 28px 24px",
        boxShadow: "0 8px 40px rgba(180,130,150,0.06)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: 260,
        gap: 10,
      }}>
        <div style={{ fontSize: 32 }}>🧘</div>
        <p style={{ fontSize: 14, color: "#9A8A93", fontFamily: fonts.sans, fontWeight: 300, margin: 0 }}>
          No data yet — start logging to see your balance.
        </p>
      </div>
    );
  }

  // Build chart data across all entries (average focus & stress)
  const avg = (key) =>
    Math.round((data.reduce((sum, d) => sum + (d[key] || 0), 0) / data.length) * 10) / 10;

  const avgFocus  = avg("focusLevel");
  const avgStress = avg("stressLevel");
  const latest    = data[data.length - 1];

  const chartData = [
    { subject: "Focus",      value: avgFocus,  fullMark: 5 },
    { subject: "Energy",     value: avg("energyLevel"),  fullMark: 5 },
    { subject: "Mood",       value: avg("mood"),          fullMark: 5 },
    { subject: "Stress",     value: avgStress, fullMark: 5 },
    { subject: "Rest",       value: avg("sleepHours") > 5 ? Math.min(5, avg("sleepHours") - 3) : 1, fullMark: 5 },
  ];

  const balance = avgFocus - avgStress;
  const balanceLabel =
    balance > 1.5 ? "Well balanced 🌿" :
    balance > 0   ? "Slightly strained 🌤" :
                    "High stress load 🌧";
  const balanceColor =
    balance > 1.5 ? "#4A8A6A" :
    balance > 0   ? "#8A7A20" :
                    "#9A4A60";

  return (
    <div style={{
      background: "rgba(255,255,255,0.72)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(225,205,215,0.5)",
      borderRadius: 28,
      padding: "26px 26px 22px",
      boxShadow: "0 8px 40px rgba(180,130,150,0.06)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative blob */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 140, height: 140,
        background: "radial-gradient(circle, rgba(255,242,216,0.5) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{
            fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#B09AA8", margin: "0 0 4px", fontFamily: fonts.sans,
          }}>
            Attention &amp; Stress
          </p>
          <h3 style={{
            fontSize: 20, fontWeight: 400, color: "#2A2A2A",
            margin: 0, fontFamily: fonts.serif,
          }}>
            Focus vs stress balance
          </h3>
        </div>
        <span style={{
          fontSize: 11, color: balanceColor, fontFamily: fonts.sans,
          background: balance > 1.5
            ? "rgba(220,240,222,0.8)"
            : balance > 0
              ? "rgba(255,242,216,0.8)"
              : "rgba(247,214,224,0.8)",
          border: `1px solid ${balance > 1.5
            ? "rgba(170,215,178,0.6)"
            : balance > 0
              ? "rgba(235,205,140,0.6)"
              : "rgba(220,175,195,0.6)"}`,
          borderRadius: 20, padding: "4px 12px",
          whiteSpace: "nowrap",
        }}>
          {balanceLabel}
        </span>
      </div>

      {/* Radar chart */}
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid
            stroke="rgba(196,143,160,0.18)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fill: "#8A7A82",
              fontWeight: 400,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fontSize: 10, fill: "#C0B0B8", fontFamily: fonts.sans }}
            tickCount={4}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Average"
            dataKey="value"
            stroke="rgba(196,143,160,0.8)"
            fill="rgba(247,214,224,0.45)"
            fillOpacity={1}
            strokeWidth={2}
            dot={{ fill: "rgba(196,143,160,0.9)", r: 4, strokeWidth: 0 }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Stat pills */}
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <StatPill
          label="Avg Focus"
          value={avgFocus}
          bg="rgba(221,235,247,0.6)"
          border="rgba(180,210,235,0.5)"
          textColor="#6A90B0"
          barColor="rgba(100,160,210,0.7)"
        />
        <StatPill
          label="Avg Stress"
          value={avgStress}
          bg="rgba(247,214,224,0.6)"
          border="rgba(220,175,195,0.5)"
          textColor="#A06070"
          barColor="rgba(196,143,160,0.7)"
        />
        <div style={{
          background: "rgba(255,255,255,0.65)",
          border: "1px solid rgba(225,205,215,0.4)",
          borderRadius: 18,
          padding: "14px 18px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B09AA8", margin: "0 0 6px", fontFamily: fonts.sans }}>
            Latest Mood
          </p>
          <p style={{ fontSize: 26, fontWeight: 400, color: "#2A2A2A", margin: 0, fontFamily: fonts.serif, lineHeight: 1 }}>
            {latest.mood ?? "—"}
            {latest.mood && <span style={{ fontSize: 12, color: "#9A8A93", marginLeft: 3, fontFamily: fonts.sans }}>/5</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FocusStressChart;