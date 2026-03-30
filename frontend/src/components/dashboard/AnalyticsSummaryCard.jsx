const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

const statItems = [
  {
    key: "productivityScore",
    icon: "📈",
    label: "Productivity Score",
    suffix: "",
    bg: "linear-gradient(145deg, rgba(255,248,251,0.97), rgba(255,238,245,0.93))",
    border: "rgba(242,217,228,0.65)",
    blob: "rgba(247,214,224,0.5)",
    labelColor: "#B09AA8",
    accent: "#C48FA0",
    iconBg: "rgba(247,214,224,0.8)",
    iconBorder: "rgba(220,175,195,0.6)",
  },
  {
    key: "burnoutRisk",
    icon: "🔥",
    label: "Burnout Risk",
    suffix: "",
    bg: "linear-gradient(145deg, rgba(248,252,255,0.97), rgba(238,246,255,0.93))",
    border: "rgba(209,228,245,0.65)",
    blob: "rgba(221,235,247,0.5)",
    labelColor: "#7A96AB",
    accent: "#4A7A9F",
    iconBg: "rgba(221,235,247,0.8)",
    iconBorder: "rgba(180,210,235,0.6)",
  },
  {
    key: "completionRate",
    icon: "✅",
    label: "Completion Rate",
    suffix: "%",
    bg: "linear-gradient(145deg, rgba(252,249,255,0.97), rgba(244,238,255,0.93))",
    border: "rgba(228,220,245,0.65)",
    blob: "rgba(233,228,245,0.5)",
    labelColor: "#9A8AB8",
    accent: "#6E5CA8",
    iconBg: "rgba(233,228,245,0.8)",
    iconBorder: "rgba(200,185,235,0.6)",
  },
  {
    key: "avgStudy",
    icon: "📚",
    label: "Avg Study",
    suffix: " hrs",
    bg: "linear-gradient(145deg, rgba(247,255,249,0.97), rgba(238,248,241,0.93))",
    border: "rgba(209,235,214,0.65)",
    blob: "rgba(220,240,222,0.5)",
    labelColor: "#7A9A84",
    accent: "#4A8A6A",
    iconBg: "rgba(220,240,222,0.8)",
    iconBorder: "rgba(170,215,178,0.6)",
  },
];

const AnalyticsSummaryCard = ({ analytics }) => {
  return (
    <div style={{
      background: "rgba(255,255,255,0.72)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.85)",
      borderRadius: 30,
      padding: "28px 30px 26px",
      boxShadow: "0 12px 50px rgba(180,130,150,0.06)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient blob */}
      <div style={{
        position: "absolute", top: -50, right: -50,
        width: 160, height: 160,
        background: "radial-gradient(circle, rgba(247,214,224,0.3) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ marginBottom: 22 }}>
        <p style={{
          fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#B09AA8", margin: "0 0 6px", fontFamily: fonts.sans,
        }}>
          Performance Summary
        </p>
        <h2 style={{
          fontSize: 26, fontWeight: 400, color: "#2A2A2A", margin: 0,
          fontFamily: fonts.serif, lineHeight: 1.2,
        }}>
          Your{" "}
          <span style={{ color: "#C48FA0", fontStyle: "italic" }}>behavioral</span>
          {" "}analytics
        </h2>
      </div>

      {/* Stat grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 16,
      }}>
        {statItems.map((item) => {
          const raw = analytics?.[item.key];
          const display = raw != null ? `${raw}${item.suffix}` : "—";

          return (
            <div
              key={item.key}
              style={{
                background: item.bg,
                border: `1px solid ${item.border}`,
                borderRadius: 20,
                padding: "20px 18px 18px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.07)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Corner blob */}
              <div style={{
                position: "absolute", top: -24, right: -24,
                width: 80, height: 80,
                background: `radial-gradient(circle, ${item.blob} 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Icon badge */}
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: item.iconBg,
                border: `1px solid ${item.iconBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, marginBottom: 14,
              }}>
                {item.icon}
              </div>

              {/* Label */}
              <p style={{
                fontSize: 12, color: item.labelColor,
                margin: "0 0 6px", fontFamily: fonts.sans,
                fontWeight: 400, lineHeight: 1.3,
              }}>
                {item.label}
              </p>

              {/* Value */}
              <h3 style={{
                fontSize: 28, fontWeight: 400, color: "#2A2A2A",
                margin: 0, fontFamily: fonts.serif, lineHeight: 1.1,
              }}>
                {display}
              </h3>

              {/* Accent rule */}
              <div style={{
                width: 28, height: 2, borderRadius: 2,
                background: item.border,
                marginTop: 12,
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsSummaryCard;