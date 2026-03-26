import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import InsightCard from "../components/InsightCard";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [logs, setLogs] = useState([]);

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

  return (
    <div className="min-h-screen bg-[#F9F7F4] relative overflow-hidden flex">
      <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(to_right,#eae7e2_1px,transparent_1px),linear-gradient(to_bottom,#eae7e2_1px,transparent_1px)] bg-[size:42px_42px]"></div>

      <div className="absolute top-[-120px] left-[20%] w-[300px] h-[300px] bg-[#F7D6E0] rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute bottom-[-100px] right-[10%] w-[340px] h-[340px] bg-[#DDEBF7] rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute top-[35%] right-[30%] w-[220px] h-[220px] bg-[#E9E4F5] rounded-full blur-[120px] opacity-35"></div>

      <Sidebar />

      <main className="relative z-10 flex-1 p-6 md:p-10">
        <div className="mb-10">
          <p className="text-sm tracking-[0.18em] uppercase text-[#8A8A8A] mb-3">
            Overview
          </p>
          <h1 className="text-4xl font-semibold text-[#2F2F2F]">
            Good evening, {user?.name || "User"} 🌷
          </h1>
          <p className="text-[#6B6B6B] mt-3 text-lg">
            Here’s your calm productivity snapshot for today.
          </p>
        </div>

        {analytics && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <InsightCard
                label="Productivity Score"
                value={analytics.productivityScore}
                color="#F7D6E0"
              />
              <InsightCard
                label="Burnout Risk"
                value={analytics.burnoutRisk}
                color="#DCEBDD"
              />
              <InsightCard
                label="Avg Sleep"
                value={`${analytics.avgSleep} hrs`}
                color="#DDEBF7"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="lg:col-span-2 bg-white/75 backdrop-blur-xl border border-white/60 rounded-[28px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                <p className="text-sm uppercase tracking-[0.18em] text-[#8A8A8A] mb-3">
                  Recommendation
                </p>
                <h2 className="text-2xl font-semibold text-[#2F2F2F] mb-3">
                  Your smart insight
                </h2>
                <p className="text-[#5F5F5F] leading-relaxed text-base">
                  {analytics.recommendation}
                </p>
              </div>

              <div className="bg-white/75 backdrop-blur-xl border border-white/60 rounded-[28px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                <p className="text-sm uppercase tracking-[0.18em] text-[#8A8A8A] mb-3">
                  Mood Status
                </p>
                <h2 className="text-3xl font-semibold text-[#2F2F2F] mb-2">
                  {analytics.avgMood >= 4
                    ? "😊 Balanced"
                    : analytics.avgMood >= 3
                    ? "😌 Stable"
                    : "😓 Low"}
                </h2>
                <p className="text-[#5F5F5F] text-sm">
                  Based on your recent mood trends.
                </p>
              </div>
            </div>
          </>
        )}

        <div className="bg-white/75 backdrop-blur-xl border border-white/60 rounded-[28px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#8A8A8A] mb-6">
            Recent Daily Logs
          </p>

          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="flex justify-between items-center border-b border-[#EFEAE5] pb-4"
                >
                  <div>
                    <p className="font-medium text-[#2F2F2F]">{log.date}</p>
                    <p className="text-sm text-[#6B6B6B]">
                      Sleep {log.sleepHours}h • Study {log.studyHours}h • Mood {log.mood}
                    </p>
                  </div>
                  <span className="text-sm text-[#8A8A8A]">
                    {log.tasksCompleted >= log.tasksPlanned
                      ? "Strong Day"
                      : "In Progress"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[#6B6B6B] text-sm">No logs yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;