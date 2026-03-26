import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.09 },
  }),
};

// ─── Shared style tokens ────────────────────────────────────────────────────
const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid rgba(225,205,215,0.6)",
  background: "rgba(255,255,255,0.75)",
  fontSize: 14,
  color: "#2A2A2A",
  fontFamily: fonts.sans,
  fontWeight: 300,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle = {
  fontSize: 12,
  color: "#8A7A82",
  fontFamily: fonts.sans,
  marginBottom: 8,
  display: "block",
  letterSpacing: "0.01em",
};

const sectionCard = (accent = "#F7D6E0") => ({
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.85)",
  borderRadius: 28,
  padding: "32px 32px 28px",
  boxShadow: "0 8px 40px rgba(180,130,150,0.07)",
  position: "relative",
  overflow: "hidden",
});

// ─── Mood Selector ───────────────────────────────────────────────────────────
const moodOptions = [
  { value: 1, emoji: "😓", label: "Drained", color: "rgba(221,235,247,0.7)" },
  { value: 2, emoji: "😕", label: "Low",     color: "rgba(240,220,230,0.7)" },
  { value: 3, emoji: "😌", label: "Okay",    color: "rgba(255,242,216,0.8)" },
  { value: 4, emoji: "😊", label: "Good",    color: "rgba(220,235,221,0.8)" },
  { value: 5, emoji: "✨", label: "Great",   color: "rgba(247,214,224,0.9)" },
];

const scaleLabels = { focusLevel: "🎯 Focus", energyLevel: "⚡ Energy", stressLevel: "🧠 Stress" };
const scaleColors = {
  focusLevel:  { active: "rgba(221,235,247,0.9)", border: "rgba(180,210,235,0.8)", text: "#4A6A8A" },
  energyLevel: { active: "rgba(255,242,216,0.9)", border: "rgba(235,205,140,0.8)", text: "#7A5A20" },
  stressLevel: { active: "rgba(247,214,224,0.9)", border: "rgba(220,175,190,0.8)", text: "#8A4A60" },
};

// ─── Main Component ──────────────────────────────────────────────────────────
const DailyLogForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "", sleepHours: "", studyHours: "", mood: "",
    tasksPlanned: "", tasksCompleted: "", distractions: "",
    exercise: false, focusLevel: "", energyLevel: "", stressLevel: "",
    notes: "", todo1: "", todo2: "", todo3: "",
  });

  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving]   = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setSaving(true);
    try {
      const { todo1, todo2, todo3, ...backendData } = formData;
      await API.post("/logs", {
        ...backendData,
        sleepHours:     parseFloat(formData.sleepHours),
        studyHours:     parseFloat(formData.studyHours),
        mood:           parseInt(formData.mood),
        tasksPlanned:   parseInt(formData.tasksPlanned),
        tasksCompleted: parseInt(formData.tasksCompleted),
        distractions:   parseInt(formData.distractions),
        focusLevel:     parseInt(formData.focusLevel),
        energyLevel:    parseInt(formData.energyLevel),
        stressLevel:    parseInt(formData.stressLevel),
      });
      setSuccess("Daily log saved beautifully ✨");
      setTimeout(() => navigate("/"), 1400);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save log");
      setSaving(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6F9 0%, #F9F4FD 50%, #F4F8FD 100%)",
      display: "flex", position: "relative", overflow: "hidden",
    }}>
      {/* Blobs */}
      <div style={{ position:"absolute", top:-100, left:"12%", width:380, height:380, background:"radial-gradient(circle,rgba(247,214,224,0.5) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, right:"6%", width:420, height:420, background:"radial-gradient(circle,rgba(221,235,247,0.4) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"45%", right:"30%", width:260, height:260, background:"radial-gradient(circle,rgba(233,228,245,0.35) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(180,150,165,0.1) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

      <Sidebar />

      <motion.main
        initial="hidden" animate="visible"
        style={{ flex:1, padding:"40px 48px 60px", position:"relative", zIndex:10, minWidth:0 }}
      >
        <form onSubmit={handleSubmit}>

          {/* ── Page Header ── */}
          <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 40 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <p style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#B09AA8", margin:0, fontFamily:fonts.sans }}>
                Daily Reflection
              </p>
              {["Gentle Check-in 🌸", "2 mins only ✨"].map((tag) => (
                <span key={tag} style={{
                  padding:"4px 14px", borderRadius:20, fontSize:11, fontFamily:fonts.sans,
                  background:"rgba(255,246,250,0.9)", border:"1px solid rgba(235,200,215,0.6)",
                  color:"#9A7080",
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 style={{
              fontSize:40, fontWeight:400, color:"#2A2A2A", margin:"0 0 10px",
              fontFamily:fonts.serif, lineHeight:1.15,
            }}>
              How was your day <span style={{ color:"#C48FA0", fontStyle:"italic" }}>today?</span>
            </h1>
            <p style={{ color:"#7A7A7A", fontSize:15, margin:"0 0 20px", fontFamily:fonts.sans, fontWeight:300, maxWidth:560, lineHeight:1.7 }}>
              A tiny reflection every day helps you notice your patterns, protect your energy, and grow with more intention.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {[["Reminder 🌺", "Gentle effort still counts"], ["Mindset 💭", "Consistency > Perfection"]].map(([label, val]) => (
                <div key={label} style={{
                  background:"rgba(255,246,250,0.85)", border:"1px solid rgba(235,200,215,0.5)",
                  borderRadius:16, padding:"10px 18px",
                }}>
                  <p style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.14em", color:"#B09AA8", margin:"0 0 3px", fontFamily:fonts.sans }}>{label}</p>
                  <p style={{ fontSize:13, color:"#3A2A32", margin:0, fontFamily:fonts.sans, fontWeight:400 }}>{val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Emotional Check-in ── */}
          <motion.div variants={fadeUp} custom={1} style={{ ...sectionCard(), marginBottom:24 }}>
            <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, background:"radial-gradient(circle,rgba(247,214,224,0.35) 0%,transparent 70%)" }} />
            <p style={{ fontSize:11, letterSpacing:"0.16em", textTransform:"uppercase", color:"#B09AA8", margin:"0 0 4px", fontFamily:fonts.sans }}>
              Emotional Check-in
            </p>
            <h2 style={{ fontSize:24, fontWeight:400, color:"#2A2A2A", margin:"0 0 24px", fontFamily:fonts.serif }}>
              What's your energy like today?
            </h2>

            {/* Mood buttons */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:28 }}>
              {moodOptions.map((m) => {
                const active = Number(formData.mood) === m.value;
                return (
                  <motion.button
                    type="button" key={m.value}
                    onClick={() => handleSelect("mood", m.value)}
                    whileHover={{ y:-3, scale:1.03 }}
                    whileTap={{ scale:0.96 }}
                    style={{
                      border: active ? "1.5px solid rgba(210,170,185,0.8)" : "1px solid rgba(225,205,215,0.5)",
                      background: active ? m.color : "rgba(255,255,255,0.7)",
                      borderRadius:18, padding:"18px 8px", cursor:"pointer",
                      textAlign:"center", transition:"all 0.2s",
                      boxShadow: active ? "0 4px 16px rgba(196,143,160,0.15)" : "none",
                    }}
                  >
                    <motion.div
                      animate={active ? { scale:[1,1.2,1] } : {}}
                      transition={{ duration:0.35 }}
                      style={{ fontSize:26, marginBottom:8 }}
                    >
                      {m.emoji}
                    </motion.div>
                    <p style={{ fontSize:12, color: active ? "#5A3A48" : "#7A6A72", margin:0, fontFamily:fonts.sans, fontWeight: active ? 500 : 400 }}>
                      {m.label}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Focus / Energy / Stress scales */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {["focusLevel","energyLevel","stressLevel"].map((field) => {
                const sc = scaleColors[field];
                return (
                  <div key={field} style={{
                    background:"rgba(255,255,255,0.65)", border:"1px solid rgba(225,205,215,0.4)",
                    borderRadius:18, padding:"18px 18px 16px",
                  }}>
                    <p style={{ fontSize:13, fontWeight:500, color:"#2A2A2A", margin:"0 0 4px", fontFamily:fonts.sans }}>
                      {scaleLabels[field]}
                    </p>
                    <p style={{ fontSize:11, color:"#9A8A93", margin:"0 0 14px", fontFamily:fonts.sans }}>
                      Rate 1 – 5
                    </p>
                    <div style={{ display:"flex", gap:8 }}>
                      {[1,2,3,4,5].map((n) => {
                        const on = Number(formData[field]) === n;
                        return (
                          <motion.button
                            type="button" key={n}
                            onClick={() => handleSelect(field, n)}
                            whileHover={{ y:-2, scale:1.08 }}
                            whileTap={{ scale:0.94 }}
                            style={{
                              width:38, height:38, borderRadius:12,
                              border: on ? `1.5px solid ${sc.border}` : "1px solid rgba(220,200,210,0.5)",
                              background: on ? sc.active : "rgba(255,255,255,0.8)",
                              fontSize:13, fontWeight: on ? 600 : 400,
                              color: on ? sc.text : "#7A6A72",
                              cursor:"pointer", transition:"all 0.18s",
                              fontFamily:fonts.sans,
                            }}
                          >
                            {n}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Three column cards ── */}
          <motion.div
            variants={fadeUp} custom={2}
            style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:24 }}
          >
            {/* Rest & Recovery */}
            <div style={{
              ...sectionCard(),
              background:"linear-gradient(145deg,rgba(255,248,251,0.95),rgba(250,245,255,0.9))",
              border:"1px solid rgba(235,210,225,0.5)",
            }}>
              <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, background:"radial-gradient(circle,rgba(247,214,224,0.4) 0%,transparent 70%)" }} />
              <p style={{ fontSize:11, letterSpacing:"0.16em", textTransform:"uppercase", color:"#B09AA8", margin:"0 0 4px", fontFamily:fonts.sans }}>
                🌙 Rest & Recovery
              </p>
              <h3 style={{ fontSize:20, fontWeight:400, color:"#2A2A2A", margin:"0 0 24px", fontFamily:fonts.serif }}>
                Recharge your system
              </h3>
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <div>
                  <label style={labelStyle}>📅 Which day are you logging?</label>
                  <input
                    type="date" name="date" value={formData.date} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor="rgba(196,143,160,0.6)"; e.target.style.boxShadow="0 0 0 3px rgba(247,214,224,0.25)"; }}
                    onBlur={e => { e.target.style.borderColor="rgba(225,205,215,0.6)"; e.target.style.boxShadow="none"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>😴 How much did you sleep?</label>
                  <input
                    type="number" name="sleepHours" placeholder="e.g. 7.5"
                    value={formData.sleepHours} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor="rgba(196,143,160,0.6)"; e.target.style.boxShadow="0 0 0 3px rgba(247,214,224,0.25)"; }}
                    onBlur={e => { e.target.style.borderColor="rgba(225,205,215,0.6)"; e.target.style.boxShadow="none"; }}
                  />
                </div>
                <label style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  background:"rgba(255,255,255,0.7)", border:"1px solid rgba(225,205,215,0.5)",
                  borderRadius:14, padding:"13px 16px", cursor:"pointer",
                }}>
                  <span style={{ fontSize:13, color:"#5A4A52", fontFamily:fonts.sans }}>🏃 Did your body move today?</span>
                  <div style={{
                    width:44, height:24, borderRadius:12, cursor:"pointer",
                    background: formData.exercise ? "rgba(196,143,160,0.8)" : "rgba(210,200,205,0.5)",
                    position:"relative", transition:"background 0.25s",
                  }}
                    onClick={() => setFormData(p => ({ ...p, exercise: !p.exercise }))}
                  >
                    <div style={{
                      position:"absolute", top:3,
                      left: formData.exercise ? 22 : 3,
                      width:18, height:18, borderRadius:"50%",
                      background:"white", transition:"left 0.25s",
                      boxShadow:"0 1px 4px rgba(0,0,0,0.15)",
                    }} />
                  </div>
                </label>
              </div>
            </div>

            {/* Deep Work */}
            <div style={{
              ...sectionCard(),
              background:"linear-gradient(145deg,rgba(248,252,255,0.95),rgba(244,249,255,0.9))",
              border:"1px solid rgba(210,225,240,0.5)",
            }}>
              <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, background:"radial-gradient(circle,rgba(221,235,247,0.5) 0%,transparent 70%)" }} />
              <p style={{ fontSize:11, letterSpacing:"0.16em", textTransform:"uppercase", color:"#8094A7", margin:"0 0 4px", fontFamily:fonts.sans }}>
                📚 Deep Work
              </p>
              <h3 style={{ fontSize:20, fontWeight:400, color:"#2A2A2A", margin:"0 0 24px", fontFamily:fonts.serif }}>
                What did you get done?
              </h3>
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                {[
                  { label:"⏳ Hours studied / worked", name:"studyHours", placeholder:"e.g. 5" },
                  { label:"📋 Tasks you planned", name:"tasksPlanned", placeholder:"e.g. 6" },
                  { label:"✅ Tasks you finished", name:"tasksCompleted", placeholder:"e.g. 5" },
                ].map((f) => (
                  <div key={f.name}>
                    <label style={labelStyle}>{f.label}</label>
                    <input
                      type="number" name={f.name} placeholder={f.placeholder}
                      value={formData[f.name]} onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor="rgba(140,180,215,0.7)"; e.target.style.boxShadow="0 0 0 3px rgba(221,235,247,0.3)"; }}
                      onBlur={e => { e.target.style.borderColor="rgba(225,205,215,0.6)"; e.target.style.boxShadow="none"; }}
                    />
                  </div>
                ))}
                {/* Mini todo snapshot */}
                <div style={{ background:"rgba(255,255,255,0.6)", border:"1px solid rgba(210,225,240,0.5)", borderRadius:14, padding:"14px 16px" }}>
                  <p style={{ fontSize:12, fontWeight:500, color:"#3A4A5A", margin:"0 0 10px", fontFamily:fonts.sans }}>📝 Quick to-do snapshot</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {["todo1","todo2","todo3"].map((t, i) => (
                      <input
                        key={t} type="text" name={t}
                        placeholder={["☐ e.g. Revise chapter 3","☐ e.g. Solve DSA problems","☐ e.g. Complete notebook"][i]}
                        value={formData[t]} onChange={handleChange}
                        style={{ ...inputStyle, fontSize:12, padding:"9px 12px" }}
                        onFocus={e => { e.target.style.borderColor="rgba(140,180,215,0.7)"; e.target.style.boxShadow="0 0 0 3px rgba(221,235,247,0.3)"; }}
                        onBlur={e => { e.target.style.borderColor="rgba(225,205,215,0.6)"; e.target.style.boxShadow="none"; }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Focus & Reflection */}
            <div style={{
              ...sectionCard(),
              background:"linear-gradient(145deg,rgba(248,255,249,0.95),rgba(252,255,252,0.9))",
              border:"1px solid rgba(210,235,215,0.5)",
            }}>
              <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, background:"radial-gradient(circle,rgba(220,240,222,0.5) 0%,transparent 70%)" }} />
              <p style={{ fontSize:11, letterSpacing:"0.16em", textTransform:"uppercase", color:"#7D9A7D", margin:"0 0 4px", fontFamily:fonts.sans }}>
                🌿 Focus & Reflection
              </p>
              <h3 style={{ fontSize:20, fontWeight:400, color:"#2A2A2A", margin:"0 0 24px", fontFamily:fonts.serif }}>
                Protect your attention
              </h3>
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <div>
                  <label style={labelStyle}>😵 How distracted did you feel? (1–10)</label>
                  <input
                    type="number" name="distractions" placeholder="e.g. 3"
                    value={formData.distractions} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor="rgba(130,185,140,0.7)"; e.target.style.boxShadow="0 0 0 3px rgba(220,240,222,0.35)"; }}
                    onBlur={e => { e.target.style.borderColor="rgba(225,205,215,0.6)"; e.target.style.boxShadow="none"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>✍️ What made today feel this way?</label>
                  <textarea
                    name="notes" value={formData.notes} onChange={handleChange}
                    rows={7}
                    placeholder="e.g. Felt more focused in the library, but got tired after lunch. The morning session was the most productive..."
                    style={{
                      ...inputStyle, resize:"none", lineHeight:1.7,
                      border:"1px solid rgba(210,235,215,0.6)",
                    }}
                    onFocus={e => { e.target.style.borderColor="rgba(130,185,140,0.7)"; e.target.style.boxShadow="0 0 0 3px rgba(220,240,222,0.35)"; }}
                    onBlur={e => { e.target.style.borderColor="rgba(210,235,215,0.6)"; e.target.style.boxShadow="none"; }}
                  />
                </div>
                <div style={{
                  background:"rgba(255,255,255,0.6)", border:"1px solid rgba(210,235,215,0.5)",
                  borderRadius:14, padding:"14px 16px",
                }}>
                  <p style={{ fontSize:12, color:"#5A7A5A", margin:"0 0 4px", fontFamily:fonts.sans, fontWeight:500 }}>
                    Little reminder 🌱
                  </p>
                  <p style={{ fontSize:12, color:"#5A6A5A", margin:0, fontFamily:fonts.sans, fontWeight:300, lineHeight:1.65 }}>
                    Your notes help the AI give more personal suggestions over time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Save CTA ── */}
          <motion.div variants={fadeUp} custom={3}>
            <div style={{
              background:"linear-gradient(135deg,rgba(255,247,250,0.95),rgba(255,250,255,0.9))",
              border:"1px solid rgba(235,210,225,0.6)",
              borderRadius:24, padding:"24px 32px",
              boxShadow:"0 8px 40px rgba(196,143,160,0.1)",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              gap:24, flexWrap:"wrap",
            }}>
              <div>
                <p style={{ fontSize:18, fontWeight:400, color:"#2A2A2A", margin:"0 0 5px", fontFamily:fonts.serif }}>
                  Save today's reflection
                </p>
                <p style={{ fontSize:13, color:"#8A7A82", margin:0, fontFamily:fonts.sans, fontWeight:300 }}>
                  Your dashboard will turn this into calm, useful insight.
                </p>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
                      style={{ fontSize:13, color:"#C05060", margin:0, fontFamily:fonts.sans }}
                    >
                      {error}
                    </motion.p>
                  )}
                  {success && (
                    <motion.p
                      initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
                      style={{ fontSize:13, color:"#4A8A5A", margin:0, fontFamily:fonts.sans }}
                    >
                      {success}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={saving}
                  whileHover={{ scale:1.02, y:-2 }}
                  whileTap={{ scale:0.97 }}
                  style={{
                    background: saving
                      ? "rgba(210,185,195,0.6)"
                      : "linear-gradient(135deg,rgba(235,198,210,0.95),rgba(220,178,198,0.9))",
                    border:"1px solid rgba(210,170,190,0.5)",
                    borderRadius:16, padding:"14px 36px",
                    fontSize:14, fontWeight:500, color:"#5A2A3A",
                    cursor: saving ? "not-allowed" : "pointer",
                    fontFamily:fonts.sans,
                    boxShadow:"0 4px 20px rgba(196,143,160,0.2)",
                    whiteSpace:"nowrap",
                    transition:"all 0.2s",
                  }}
                >
                  {saving ? "Saving... 🌸" : "Save Daily Log ✨"}
                </motion.button>
              </div>
            </div>
          </motion.div>

        </form>
      </motion.main>
    </div>
  );
};

export default DailyLogForm;