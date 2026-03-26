import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import SnapshotCard from "../components/dashboard/SnapshotCard";
import ReflectionCard from "../components/dashboard/ReflectionCard";
import InsightCard from "../components/dashboard/InsightCard";
import RecentLogsCard from "../components/dashboard/RecentLogsCard";

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

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const logsRes = await API.get("/logs");
        const analyticsRes = await API.get("/analytics");

        setLogs(logsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const latestLog = logs?.[0];

  return (
    <div className="min-h-screen bg-[#F9F7F4] relative overflow-hidden flex">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,#eae7e2_1px,transparent_1px),linear-gradient(to_bottom,#eae7e2_1px,transparent_1px)] bg-[size:42px_42px]"></div>

      {/* Decorative blobs */}
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
        <motion.div variants={fadeUp} className="mb-8">
          <DashboardHeader />
        </motion.div>

        {/* Snapshot cards */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8"
        >
          <motion.div variants={fadeUp}>
            <SnapshotCard
              title="Sleep"
              value={latestLog?.sleepHours ? `${latestLog.sleepHours}h` : "--"}
              subtitle="Recovery matters too"
              icon="😴"
              color="pink"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SnapshotCard
              title="Mood"
              value={latestLog?.mood ? `${latestLog.mood}/5` : "--"}
              subtitle="Emotional rhythm"
              icon="😊"
              color="blue"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SnapshotCard
              title="Focus"
              value={latestLog?.focusLevel ? `${latestLog.focusLevel}/5` : "--"}
              subtitle="Attention quality"
              icon="🎯"
              color="lavender"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SnapshotCard
              title="Energy"
              value={latestLog?.energyLevel ? `${latestLog.energyLevel}/5` : "--"}
              subtitle="How charged you felt"
              icon="⚡"
              color="peach"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SnapshotCard
              title="Stress"
              value={latestLog?.stressLevel ? `${latestLog.stressLevel}/5` : "--"}
              subtitle="Mental load today"
              icon="🧠"
              color="mint"
            />
          </motion.div>
        </motion.div>

        {/* Reflection + Insight */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8"
        >
          <motion.div variants={fadeUp}>
            <ReflectionCard latestLog={latestLog} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <InsightCard analytics={analytics} />
          </motion.div>
        </motion.div>

        {/* Recent logs */}
        <motion.div variants={fadeUp}>
          <RecentLogsCard logs={logs} />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Dashboard;