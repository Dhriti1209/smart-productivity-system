import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../api/axios";

const DailyLogForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    sleepHours: "",
    studyHours: "",
    mood: "",
    tasksPlanned: "",
    tasksCompleted: "",
    distractions: "",
    exercise: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const moodOptions = [
    { value: 1, emoji: "😓", label: "Drained" },
    { value: 2, emoji: "😕", label: "Low" },
    { value: 3, emoji: "😌", label: "Okay" },
    { value: 4, emoji: "😊", label: "Good" },
    { value: 5, emoji: "✨", label: "Great" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMoodSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      mood: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/logs", {
        ...formData,
        sleepHours: parseFloat(formData.sleepHours),
        studyHours: parseFloat(formData.studyHours),
        mood: parseInt(formData.mood),
        tasksPlanned: parseInt(formData.tasksPlanned),
        tasksCompleted: parseInt(formData.tasksCompleted),
        distractions: parseInt(formData.distractions),
      });

      setSuccess("Daily log saved beautifully ✨");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save log");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] relative overflow-hidden flex">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,#eae7e2_1px,transparent_1px),linear-gradient(to_bottom,#eae7e2_1px,transparent_1px)] bg-[size:42px_42px]"></div>

      {/* Decorative blobs */}
      <div className="absolute top-[-120px] left-[18%] w-[300px] h-[300px] bg-[#F7D6E0] rounded-full blur-[140px] opacity-45"></div>
      <div className="absolute bottom-[-100px] right-[10%] w-[340px] h-[340px] bg-[#DDEBF7] rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute top-[35%] right-[30%] w-[220px] h-[220px] bg-[#E9E4F5] rounded-full blur-[120px] opacity-35"></div>
      <div className="absolute top-[50%] left-[30%] w-[220px] h-[220px] bg-[#E8F3E8] rounded-full blur-[120px] opacity-25"></div>

      <Sidebar />

      <main className="relative z-10 flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm tracking-[0.18em] uppercase text-[#8A8A8A]">
              Daily Reflection
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FFF6F8] border border-[#F2D9E1] text-sm text-[#7A6470] shadow-sm">
              Gentle Check-in 🌷
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F6FAFF] border border-[#D9E8F4] text-sm text-[#60788F] shadow-sm">
              2 mins only ✨
            </span>
          </div>

          <h1 className="text-4xl font-semibold text-[#2F2F2F]">
            How was your day today?
          </h1>
          <p className="text-[#6B6B6B] mt-3 text-lg max-w-2xl leading-relaxed">
            A tiny reflection every day helps you notice your patterns,
            protect your energy, and grow with more intention.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-[#FFF6F8]/90 backdrop-blur-md border border-[#F2D9E1] rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.15em] text-[#A08A95]">Reminder</p>
              <p className="text-sm text-[#2F2F2F] mt-1">Gentle effort still counts 🌸</p>
            </div>

            <div className="bg-[#F6FAFF]/90 backdrop-blur-md border border-[#D9E8F4] rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.15em] text-[#8798A9]">Mindset</p>
              <p className="text-sm text-[#2F2F2F] mt-1">Consistency &gt; Perfection</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl">

          {/* Mood Selector */}
          <Card className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[28px] p-8">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[#8A8A8A] mb-2">
                Emotional Check-in
              </p>
              <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                What’s your energy like today?
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {moodOptions.map((mood) => (
                <button
                  type="button"
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`rounded-2xl border px-4 py-5 text-center transition shadow-sm ${
                    Number(formData.mood) === mood.value
                      ? "bg-[#F7D6E0] border-[#E8C3CF] scale-[1.02]"
                      : "bg-white/80 border-white/60 hover:bg-[#FCF6F8] hover:scale-[1.01]"
                  }`}
                >
                  <div className="text-2xl mb-2">{mood.emoji}</div>
                  <p className="text-sm text-[#2F2F2F] font-medium">{mood.label}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Main cards */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Recovery */}
            <Card className="bg-gradient-to-br from-[#FFF8FB] to-[#FAF5FF] border border-[#F1E4EE] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[28px] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[#A08997] mb-2">
                🌙 Rest & Recovery
              </p>
              <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-6">
                Recharge your system
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2">📅 Which day are you logging?</label>
                  <Input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2">😴 How much did you sleep?</label>
                  <Input type="number" name="sleepHours" placeholder="e.g. 7.5" value={formData.sleepHours} onChange={handleChange} />
                </div>

                <div className="pt-2">
                  <label className="flex items-center justify-between rounded-2xl border border-[#EFDDE5] bg-white/70 px-4 py-4 cursor-pointer">
                    <span className="text-sm text-[#5F5F5F]">🏃 Did your body move today?</span>
                    <input
                      type="checkbox"
                      name="exercise"
                      checked={formData.exercise}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#EBC6D2]"
                    />
                  </label>
                </div>
              </div>
            </Card>

            {/* Productivity */}
            <Card className="bg-gradient-to-br from-[#F8FCFF] to-[#F4F9FF] border border-[#DDEAF4] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[28px] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[#8094A7] mb-2">
                📚 Deep Work
              </p>
              <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-6">
                What did you get done?
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2">⏳ How long did you study/work?</label>
                  <Input type="number" name="studyHours" placeholder="e.g. 5" value={formData.studyHours} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2">📌 What did you plan today?</label>
                  <Input type="number" name="tasksPlanned" placeholder="e.g. 6" value={formData.tasksPlanned} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2">✅ What did you actually finish?</label>
                  <Input type="number" name="tasksCompleted" placeholder="e.g. 5" value={formData.tasksCompleted} onChange={handleChange} />
                </div>
              </div>
            </Card>

            {/* Focus */}
            <Card className="bg-gradient-to-br from-[#F8FFF9] to-[#FCFFFC] border border-[#DDEEDD] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[28px] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[#7D9A7D] mb-2">
                🎯 Focus & Energy
              </p>
              <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-6">
                Protect your attention
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2">🌪 How distracted did you feel?</label>
                  <Input type="number" name="distractions" placeholder="e.g. 2" value={formData.distractions} onChange={handleChange} />
                </div>

                <div className="rounded-2xl bg-white/70 border border-[#E7F1E7] p-4">
                  <p className="text-sm text-[#6B6B6B]">Little reminder 🌿</p>
                  <p className="text-[#2F2F2F] mt-2 leading-relaxed text-sm">
                    Slower days still count. Recovery is part of productivity too.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-[#FFF7FA] via-white to-[#F6FAFF] border border-[#F0E6EA] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[28px] p-6">
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-lg font-medium text-[#2F2F2F]">Save today’s reflection</p>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  Your dashboard will turn this into calm, useful insight.
                </p>
              </div>

              <div className="w-full md:w-64">
                <Button type="submit">Save Daily Log ✨</Button>
              </div>
            </div>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default DailyLogForm;