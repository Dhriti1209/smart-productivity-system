import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

const getMoodLabel = (avgMood) => {
  if (avgMood >= 4) return { emoji: "🌸", label: "Balanced", color: "#F7D6E0" };
  if (avgMood >= 3) return { emoji: "🌿", label: "Stable", color: "#DCEBDD" };
  return { emoji: "🌧", label: "Low", color: "#DDEBF7" };
};

const getBurnoutColor = (risk) => {
  if (risk === "High") return "#FADADD";
  if (risk === "Moderate") return "#FFF2D8";
  return "#DCEBDD";
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const analyticsRes = await API.get("/analytics");
        const logsRes = await API.get("/logs");
        setAnalytics(analyticsRes.data);
        setLogs(logsRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const mood = analytics ? getMoodLabel(analytics.avgMood) : null;

  // Most recent log that has a notes field
  const latestNote = logs.find((log) => log.notes && log.notes.trim() !== "");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FDF6F9 0%, #F9F4FD 50%, #F4F8FD 100%)",
        display: "flex",
        fontFamily: "'Instrument Serif', 'Georgia', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div style={{
        position: "absolute", top: -100, left: "10%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(247,214,224,0.55) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, right: "8%",
        width: 450, height: 450,
        background: "radial-gradient(circle, rgba(221,235,247,0.45) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "40%", right: "25%",
        width: 280, height: 280,
        background: "radial-gradient(circle, rgba(233,228,245,0.4) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(180,150,165,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      <Sidebar />
      {/* maxWidth: 1100 */}
      <main style={{ flex: 1, padding: "40px 48px", position: "relative", zIndex: 10, minWidth: 0 }}>

        {/* Header */}
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate="visible"
          style={{ marginBottom: 44 }}
        >
          <p style={{
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#B09AA8", marginBottom: 10, fontFamily: "'DM Sans', sans-serif",
          }}>
            Overview
          </p>
          <h1 style={{
            fontSize: 42, fontWeight: 400, color: "#2A2A2A", margin: 0, lineHeight: 1.15,
            fontFamily: "'Playfair Display', 'Instrument Serif', Georgia, serif",
          }}>
            {getGreeting()}, <span style={{ color: "#C48FA0", fontStyle: "italic" }}>{user?.name || "there"}</span> 🌷
          </h1>
          <p style={{
            color: "#7A7A7A", marginTop: 10, fontSize: 16,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          }}>
            Here's your calm productivity snapshot for today.
          </p>
        </motion.div>

        {analytics && (
          <>
            {/* Stat cards */}
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
              style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20, marginBottom: 24,
              }}
            >
              {[
                {
                  label: "Productivity Score",
                  value: analytics.productivityScore ?? "—",
                  accent: "#F7D6E0",
                  icon: "✦",
                  sub: "out of 100",
                },
                {
                  label: "Burnout Risk",
                  value: analytics.burnoutRisk,
                  accent: getBurnoutColor(analytics.burnoutRisk),
                  icon: "◎",
                  sub: analytics.burnoutRisk === "No data" ? "start logging" : "current level",
                },
                {
                  label: "Avg Sleep",
                  value: analytics.avgSleep ? `${analytics.avgSleep}h` : "—",
                  accent: "#DDEBF7",
                  icon: "☽",
                  sub: "per night",
                },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    borderRadius: 24,
                    padding: "28px 28px 24px",
                    boxShadow: "0 8px 40px rgba(180,130,150,0.08)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: card.accent, borderRadius: "24px 24px 0 0",
                  }} />
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 16,
                  }}>
                    <p style={{
                      fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "#9A8A93", margin: 0, fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {card.label}
                    </p>
                    <span style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: card.accent,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, color: "#6B5560",
                    }}>
                      {card.icon}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: 34, fontWeight: 400, color: "#2A2A2A", margin: "0 0 6px",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}>
                    {card.value}
                  </h3>
                  <p style={{
                    fontSize: 12, color: "#A89BA3", margin: 0,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {card.sub}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Recommendation + Mood */}
            <motion.div
              variants={fadeUp} custom={2} initial="hidden" animate="visible"
              style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}
            >
              <div style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: 24,
                padding: "32px 36px",
                boxShadow: "0 8px 40px rgba(180,130,150,0.08)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 120, height: 120,
                  background: "radial-gradient(circle, rgba(247,214,224,0.4) 0%, transparent 70%)",
                }} />
                <p style={{
                  fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#9A8A93", marginBottom: 12, fontFamily: "'DM Sans', sans-serif",
                }}>
                  Your smart insight
                </p>
                <div style={{ width: 36, height: 3, background: "#F7D6E0", borderRadius: 8, marginBottom: 16 }} />
                <p style={{
                  fontSize: 17, color: "#3A3A3A", lineHeight: 1.75,
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300, margin: 0,
                }}>
                  {analytics.recommendation}
                </p>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: 24,
                padding: "32px 28px",
                boxShadow: "0 8px 40px rgba(180,130,150,0.08)",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <p style={{
                  fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#9A8A93", marginBottom: 16, fontFamily: "'DM Sans', sans-serif",
                }}>
                  Mood Status
                </p>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: mood?.color || "#F7D6E0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginBottom: 14,
                }}>
                  {mood?.emoji || "🌸"}
                </div>
                <h2 style={{
                  fontSize: 28, fontWeight: 400, color: "#2A2A2A", margin: "0 0 8px",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}>
                  {mood?.label || "No data"}
                </h2>
                <p style={{ fontSize: 13, color: "#A89BA3", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  Based on your recent mood trends.
                </p>
              </div>
            </motion.div>
          </>
        )}

        {/* Recent Logs + Journal Note */}
        <motion.div
          variants={fadeUp} custom={3} initial="hidden" animate="visible"
          style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}
        >
          {/* Recent Logs */}
          <div style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: 24,
            padding: "32px 36px",
            boxShadow: "0 8px 40px rgba(180,130,150,0.08)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <p style={{
                  fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#9A8A93", marginBottom: 6, fontFamily: "'DM Sans', sans-serif",
                }}>
                  Recent Daily Logs
                </p>
                <div style={{ width: 28, height: 2.5, background: "#F7D6E0", borderRadius: 8 }} />
              </div>
              {logs.length > 0 && (
                <span style={{ fontSize: 12, color: "#B09AA8", fontFamily: "'DM Sans', sans-serif" }}>
                  {logs.length} entries total
                </span>
              )}
            </div>

            {logs.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {logs.slice(0, 5).map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    whileHover={{ x: 4 }}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 0",
                      borderBottom: i < Math.min(logs.length, 5) - 1
                        ? "1px solid rgba(234,231,226,0.7)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: `rgba(247,214,224,${0.3 + (log.mood / 5) * 0.5})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, flexShrink: 0,
                      }}>
                        {log.mood >= 4 ? "🌸" : log.mood >= 3 ? "🌿" : "🌧"}
                      </div>
                      <div>
                        <p style={{
                          fontSize: 13, fontWeight: 500, color: "#2A2A2A", margin: "0 0 3px",
                          fontFamily: "'DM Sans', sans-serif",
                        }}>
                          {new Date(log.date).toLocaleDateString("en-US", {
                            weekday: "short", month: "short", day: "numeric",
                          })}
                        </p>
                        <p style={{ fontSize: 11, color: "#9A8A93", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                          Sleep {log.sleepHours}h · Study {log.studyHours}h · Mood {log.mood}/5
                        </p>
                      </div>
                    </div>
                    <span style={{
                      fontSize: 11, padding: "4px 12px", borderRadius: 20,
                      background: log.tasksCompleted >= log.tasksPlanned
                        ? "rgba(220,235,221,0.7)" : "rgba(247,214,224,0.6)",
                      color: log.tasksCompleted >= log.tasksPlanned ? "#4A7A55" : "#8A5060",
                      fontFamily: "'DM Sans', sans-serif",
                      border: `1px solid ${log.tasksCompleted >= log.tasksPlanned
                        ? "rgba(180,210,185,0.6)" : "rgba(220,185,195,0.6)"}`,
                    }}>
                      {log.tasksCompleted >= log.tasksPlanned ? "Strong day" : "In progress"}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🌱</div>
                <p style={{
                  fontSize: 15, color: "#9A8A93",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                }}>
                  No logs yet. Start your first daily reflection.
                </p>
              </div>
            )}
          </div>

          {/* Journal Note Card */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "linear-gradient(145deg, rgba(255,246,250,0.92), rgba(255,250,255,0.85))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(242,217,225,0.6)",
              borderRadius: 24,
              padding: "32px 28px",
              boxShadow: "0 8px 40px rgba(196,143,160,0.1)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative corner bloom */}
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 100, height: 100,
              background: "radial-gradient(circle, rgba(247,214,224,0.5) 0%, transparent 70%)",
            }} />
            {/* Faint ruled lines */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "0 28px 28px", opacity: 0.06,
            }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{
                  height: 1, background: "#C48FA0",
                  marginBottom: 22, borderRadius: 1,
                }} />
              ))}
            </div>

            <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 6,
              }}>
                <p style={{
                  fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#C4A0AD", margin: 0, fontFamily: "'DM Sans', sans-serif",
                }}>
                  Latest Journal Note
                </p>
                <span style={{ fontSize: 18 }}>🪷</span>
              </div>
              <div style={{ width: 28, height: 2.5, background: "#F7D6E0", borderRadius: 8, marginBottom: 20 }} />

              {latestNote ? (
                <>
                  <p style={{
                    fontSize: 11, color: "#B09AA8", margin: "0 0 14px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {new Date(latestNote.date).toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric",
                    })}
                  </p>

                  {/* Paper-style note block */}
                  <div style={{
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(242,217,225,0.5)",
                    borderRadius: 16,
                    padding: "18px 20px",
                    flex: 1,
                    marginBottom: 20,
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", left: 0, top: 16, bottom: 16,
                      width: 3, background: "#F7D6E0", borderRadius: "0 4px 4px 0",
                    }} />
                    <p style={{
                      fontSize: 14, color: "#4A3A42", lineHeight: 1.8,
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                      margin: 0, paddingLeft: 12,
                      display: "-webkit-box",
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {latestNote.notes}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/daily-log")}
                    style={{
                      background: "rgba(247,214,224,0.4)",
                      border: "1px solid rgba(220,185,195,0.5)",
                      borderRadius: 14,
                      padding: "10px 18px",
                      fontSize: 12,
                      color: "#8A5060",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      width: "100%",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(247,214,224,0.65)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(247,214,224,0.4)"}
                  >
                    Add today's reflection →
                  </button>
                </>
              ) : (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                  textAlign: "center", gap: 12,
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(247,214,224,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24,
                  }}>
                    ✍️
                  </div>
                  <p style={{
                    fontSize: 14, color: "#9A8A93",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                    lineHeight: 1.6, margin: 0,
                  }}>
                    No journal notes yet. Add a reflection in your daily log.
                  </p>
                  <button
                    onClick={() => navigate("/daily-log")}
                    style={{
                      marginTop: 8,
                      background: "rgba(247,214,224,0.4)",
                      border: "1px solid rgba(220,185,195,0.5)",
                      borderRadius: 14,
                      padding: "10px 20px",
                      fontSize: 12,
                      color: "#8A5060",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(247,214,224,0.65)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(247,214,224,0.4)"}
                  >
                    Write your first note →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

      </main>
    </div>
  );
};

export default Dashboard;