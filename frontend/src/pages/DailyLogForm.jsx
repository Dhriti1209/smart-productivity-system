import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Button from "../components/Button";
import API from "../api/axios";

import DailyLogHeader from "../components/dailyLog/DailyLogHeader";
import QuoteStickerPanel from "../components/dailyLog/QuoteStickerPanel";
import MoodSelector from "../components/dailyLog/MoodSelector";
import RecoveryCard from "../components/dailyLog/RecoveryCard";
import ProductivityCard from "../components/dailyLog/ProductivityCard";
import FocusCard from "../components/dailyLog/FocusCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

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
    focusLevel: "",
    energyLevel: "",
    stressLevel: "",
    notes: "",
    todo1: "",
    todo2: "",
    todo3: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const { todo1, todo2, todo3, ...backendData } = formData;

    await API.post("/logs", {
      ...backendData,
      sleepHours: parseFloat(formData.sleepHours),
      studyHours: parseFloat(formData.studyHours),
      mood: parseInt(formData.mood),
      tasksPlanned: parseInt(formData.tasksPlanned),
      tasksCompleted: parseInt(formData.tasksCompleted),
      distractions: parseInt(formData.distractions),
      focusLevel: parseInt(formData.focusLevel),
      energyLevel: parseInt(formData.energyLevel),
      stressLevel: parseInt(formData.stressLevel),
    });

    setSuccess("Daily log saved beautifully ✨");

    setTimeout(() => navigate("/"), 1200);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to save log");
  }
};
  return (
    <div className="min-h-screen bg-[#F9F7F4] relative overflow-hidden flex">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,#eae7e2_1px,transparent_1px),linear-gradient(to_bottom,#eae7e2_1px,transparent_1px)] bg-[size:42px_42px]"></div>

      {/* Blobs */}
      <div className="absolute top-[-120px] left-[15%] w-[320px] h-[320px] bg-[#F7D6E0] rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-[-100px] right-[12%] w-[360px] h-[360px] bg-[#DDEBF7] rounded-full blur-[150px] opacity-35"></div>
      <div className="absolute top-[35%] right-[28%] w-[240px] h-[240px] bg-[#E9E4F5] rounded-full blur-[130px] opacity-30"></div>

      <Sidebar />

      <motion.main
        className="relative z-10 flex-1 px-6 pt-6 pb-12 md:px-10 md:pt-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="mb-6 flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6"
        >
          <DailyLogHeader />

          <div className="xl:sticky xl:top-10">
            <QuoteStickerPanel />
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl">
          {/* Mood */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25 }}
          >
            <MoodSelector formData={formData} setFormData={setFormData} />
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <RecoveryCard formData={formData} handleChange={handleChange} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <ProductivityCard formData={formData} handleChange={handleChange} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <FocusCard formData={formData} handleChange={handleChange} />
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Card className="bg-gradient-to-r from-[#FFF7FA] via-white to-[#F6FAFF] border border-[#F0E6EA] shadow-[0_25px_70px_rgba(0,0,0,0.05)] rounded-[28px] p-6">
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-lg font-medium text-[#2F2F2F]">
                    Save today’s reflection
                  </p>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    Your dashboard will turn this into calm, useful insight.
                  </p>
                </div>

                <motion.div
                  className="w-full md:w-64"
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button type="submit">Save Daily Log ✨</Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </form>
      </motion.main>
    </div>
  );
};

export default DailyLogForm;