import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

import AnalyticsSummaryCard from "../components/dashboard/AnalyticsSummaryCard";
import MoodTrendChart from "../components/dashboard/charts/MoodTrendChart";
import SleepTrendChart from "../components/dashboard/charts/SleepTrendChart";
import StudyTrendChart from "../components/dashboard/charts/StudyTrendChart";
import FocusStressChart from "../components/dashboard/charts/FocusStressChart";

// ─── Animation tokens ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

// ─── Shared style tokens (mirrors DailyLogForm) ──────────────────────────────
const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

// ─── Stat Card ───────────────────────────────────────────────────────────────
const statThemes = {
  blue: {
    bg: "linear-gradient(145deg, rgba(248,252,255,0.97), rgba(238,246,255,0.93))",
    border: "rgba(210,228,245,0.6)",
    blob: "rgba(221,235,247,0.55)",
    accent: "#4A7A9F",
    label: "#7A96AB",
    tag: "rgba(221,235,247,0.8)",
    tagBorder: "rgba(180,210,235,0.6)",
    tagText: "#4A6A8A",
  },
  lavender: {
    bg: "linear-gradient(145deg, rgba(252,249,255,0.97), rgba(244,238,255,0.93))",
    border: "rgba(228,220,245,0.6)",
    blob: "rgba(233,228,245,0.55)",
    accent: "#6E5CA8",
    label: "#9A8AB8",
    tag: "rgba(233,228,245,0.8)",
    tagBorder: "rgba(200,185,235,0.6)",
    tagText: "#6E5CA8",
  },
  pink: {
    bg: "linear-gradient(145deg, rgba(255,248,251,0.97), rgba(255,238,245,0.93))",
    border: "rgba(242,220,230,0.6)",
    blob: "rgba(247,214,224,0.55)",
    accent: "#B06080",
    label: "#B09AA8",
    tag: "rgba(247,214,224,0.8)",
    tagBorder: "rgba(220,175,195,0.6)",
    tagText: "#8A5070",
  },
  mint: {
    bg: "linear-gradient(145deg, rgba(247,255,249,0.97), rgba(238,248,241,0.93))",
    border: "rgba(210,235,215,0.6)",
    blob: "rgba(220,240,222,0.55)",
    accent: "#4A8A6A",
    label: "#7A9A84",
    tag: "rgba(220,240,222,0.8)",
    tagBorder: "rgba(170,215,178,0.6)",
    tagText: "#3A6A4A",
  },
};

const MiniStatCard = ({ title, value, subtitle, color = "pink", icon, index = 0 }) => {
  const t = statThemes[color];
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -5, boxShadow: "0 28px 70px rgba(0,0,0,0.08)" }}
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 28,
        padding: "26px 24px 22px",
        boxShadow: "0 12px 44px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Decorative blob */}
      <div style={{
        position: "absolute", top: -32, right: -32,
        width: 110, height: 110,
        background: `radial-gradient(circle, ${t.blob} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 16,
          background: t.tag, border: `1px solid ${t.tagBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
          color: t.label, fontFamily: fonts.sans,
          background: t.tag, border: `1px solid ${t.tagBorder}`,
          borderRadius: 20, padding: "4px 12px",
        }}>
          Avg
        </span>
      </div>

      <p style={{ fontSize: 13, color: t.label, margin: "0 0 5px", fontFamily: fonts.sans, fontWeight: 400 }}>
        {title}
      </p>
      <h3 style={{
        fontSize: 34, fontWeight: 400, color: "#2A2A2A", margin: "0 0 6px",
        fontFamily: fonts.serif, lineHeight: 1.1,
      }}>
        {value}
      </h3>
      <p style={{ fontSize: 12, color: "#9A8A93", margin: 0, fontFamily: fonts.sans, fontWeight: 300 }}>
        {subtitle}
      </p>
    </motion.div>
  );
};

// ─── Chart Card Wrapper ───────────────────────────────────────────────────────
const ChartCard = ({ children, label, title, accent = "pink" }) => {
  const borders = {
    pink: "rgba(242,217,228,0.5)",
    blue: "rgba(210,228,245,0.5)",
    lavender: "rgba(228,220,245,0.5)",
    mint: "rgba(210,235,215,0.5)",
  };
  const labelColors = {
    pink: "#B09AA8",
    blue: "#8094A7",
    lavender: "#9A8AB8",
    mint: "#7A9A84",
  };
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${borders[accent]}`,
        borderRadius: 28,
        padding: "26px 26px 22px",
        boxShadow: "0 8px 40px rgba(180,130,150,0.06)",
        transition: "box-shadow 0.3s ease",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <p style={{
        fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
        color: labelColors[accent], margin: "0 0 4px", fontFamily: fonts.sans,
      }}>
        {label}
      </p>
      <h3 style={{
        fontSize: 20, fontWeight: 400, color: "#2A2A2A", margin: "0 0 20px",
        fontFamily: fonts.serif,
      }}>
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

// ─── Insight Card ─────────────────────────────────────────────────────────────
const InsightCard = ({
  tagIcon, tagLabel, title, body, accent = "pink",
}) => {
  const themes = {
    pink: {
      bg: "linear-gradient(135deg, rgba(255,248,251,0.97), rgba(250,245,255,0.93))",
      border: "rgba(235,210,225,0.6)",
      label: "#A08997",
      blob: "rgba(247,214,224,0.4)",
    },
    blue: {
      bg: "linear-gradient(135deg, rgba(246,250,255,0.97), rgba(250,252,255,0.93))",
      border: "rgba(210,228,245,0.6)",
      label: "#7F91A5",
      blob: "rgba(221,235,247,0.4)",
    },
  };
  const t = themes[accent];
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: "0 28px 70px rgba(0,0,0,0.07)" }}
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 30,
        padding: "30px 30px 28px",
        boxShadow: "0 12px 50px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Blob */}
      <div style={{
        position: "absolute", bottom: -40, right: -40,
        width: 140, height: 140,
        background: `radial-gradient(circle, ${t.blob} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <p style={{
        fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
        color: t.label, margin: "0 0 6px", fontFamily: fonts.sans,
      }}>
        {tagIcon} {tagLabel}
      </p>
      <h3 style={{
        fontSize: 22, fontWeight: 400, color: "#2A2A2A", margin: "0 0 16px",
        fontFamily: fonts.serif, lineHeight: 1.3,
      }}>
        {title}
      </h3>

      {/* Decorative rule */}
      <div style={{
        width: 36, height: 2, borderRadius: 2,
        background: accent === "pink"
          ? "rgba(196,143,160,0.4)"
          : "rgba(140,180,215,0.4)",
        marginBottom: 16,
      }} />

      <p style={{
        color: "#4A4A4A", lineHeight: 1.75, fontSize: 14,
        fontFamily: fonts.sans, fontWeight: 300, margin: 0,
      }}>
        {body}
      </p>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Analytics = () => {
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [logsRes, analyticsRes] = await Promise.all([
          API.get("/logs"),
          API.get("/analytics"),
        ]);
        setLogs(logsRes.data || []);
        setAnalytics(analyticsRes.data || {});
      } catch (error) {
        console.error("Analytics fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FDF6F9 0%, #F9F4FD 50%, #F4F8FD 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 16,
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "2px solid rgba(220,175,195,0.3)",
            borderTop: "2px solid rgba(196,143,160,0.8)",
          }}
        />
        <p style={{ fontSize: 14, color: "#9A8A93", fontFamily: fonts.sans, fontWeight: 300 }}>
          Loading your analytics...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6F9 0%, #F9F4FD 50%, #F4F8FD 100%)",
      display: "flex",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(180,150,165,0.1) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      {/* Ambient blobs */}
      <div style={{ position: "absolute", top: -120, left: "15%", width: 380, height: 380, background: "radial-gradient(circle, rgba(247,214,224,0.45) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, right: "12%", width: 420, height: 420, background: "radial-gradient(circle, rgba(221,235,247,0.4) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "30%", width: 260, height: 260, background: "radial-gradient(circle, rgba(233,228,245,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />

      <Sidebar />

      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          flex: 1, padding: "40px 48px 64px",
          position: "relative", zIndex: 10, minWidth: 0,
        }}
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <p style={{
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#B09AA8", margin: 0, fontFamily: fonts.sans,
            }}>
              Behavioral Analytics
            </p>
            {[["Trend Intelligence 📊", "rgba(247,214,224,0.8)", "rgba(220,175,195,0.5)", "#7A6470"],
              ["Pattern Discovery ✨", "rgba(221,235,247,0.8)", "rgba(180,210,235,0.5)", "#60788F"]].map(([label, bg, border, color]) => (
              <span key={label} style={{
                padding: "4px 14px", borderRadius: 20, fontSize: 11,
                background: bg, border: `1px solid ${border}`,
                color, fontFamily: fonts.sans,
              }}>
                {label}
              </span>
            ))}
          </div>

          <h1 style={{
            fontSize: 42, fontWeight: 400, color: "#2A2A2A", margin: "0 0 12px",
            fontFamily: fonts.serif, lineHeight: 1.15, maxWidth: 640,
          }}>
            Understand your{" "}
            <span style={{ color: "#C48FA0", fontStyle: "italic" }}>behavioral patterns</span>
          </h1>

          <p style={{
            color: "#7A7A7A", fontSize: 15, margin: 0,
            fontFamily: fonts.sans, fontWeight: 300,
            maxWidth: 560, lineHeight: 1.75,
          }}>
            This space helps you notice how sleep, focus, stress, and study habits
            interact over time — turning daily logs into deeper self-awareness.
          </p>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <MiniStatCard title="Average Sleep" value={analytics?.avgSleep ? `${analytics.avgSleep}h` : "—"} subtitle="Rest & recovery" icon="😴" color="blue" index={0} />
          <MiniStatCard title="Average Study" value={analytics?.avgStudy ? `${analytics.avgStudy}h` : "—"} subtitle="Deep work consistency" icon="📚" color="lavender" index={1} />
          <MiniStatCard title="Average Mood" value={analytics?.avgMood ? `${analytics.avgMood}/5` : "—"} subtitle="Emotional baseline" icon="😊" color="pink" index={2} />
          <MiniStatCard title="Avg Distractions" value={analytics?.avgDistractions ?? "—"} subtitle="Attention drift" icon="🌪" color="mint" index={3} />
        </motion.div>

        {/* ── Summary Card ── */}
        <motion.div variants={fadeUp} custom={4} style={{ marginBottom: 28 }}>
          <AnalyticsSummaryCard analytics={analytics} />
        </motion.div>

        {/* ── Charts Row 1 ── */}
        <motion.div
          variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}
        >
          <ChartCard label="Emotional Rhythm" title="Mood over time" accent="pink">
            <MoodTrendChart data={logs} />
          </ChartCard>
          <ChartCard label="Rest Quality" title="Sleep patterns" accent="blue">
            <SleepTrendChart data={logs} />
          </ChartCard>
        </motion.div>

        {/* ── Charts Row 2 ── */}
        <motion.div
          variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}
        >
          <ChartCard label="Deep Work" title="Study consistency" accent="lavender">
            <StudyTrendChart data={logs} />
          </ChartCard>
          <ChartCard label="Attention & Stress" title="Focus vs stress balance" accent="mint">
            <FocusStressChart data={logs} />
          </ChartCard>
        </motion.div>

        {/* ── Insight Strip ── */}
        <motion.div
          variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <InsightCard
            tagIcon="🌿"
            tagLabel="Recommendation"
            title="What your current pattern suggests"
            body={analytics?.recommendation || "As you continue logging, this space will surface more meaningful recommendations about your routine, rest, and focus patterns."}
            accent="pink"
          />
          <InsightCard
            tagIcon="🧠"
            tagLabel="Pattern Note"
            title="Behavioral interpretation"
            body="Your trends begin to matter when consistency builds. Over time, this page will help identify what conditions tend to support your strongest productivity and what patterns may signal early burnout."
            accent="blue"
          />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Analytics;