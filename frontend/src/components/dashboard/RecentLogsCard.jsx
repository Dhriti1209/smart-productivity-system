import Card from "../Card";

const RecentLogsCard = ({ logs = [] }) => {
  return (
    <Card className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[30px] p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.18em] text-[#8A8A8A] mb-2">
          Recent Activity
        </p>
        <h2 className="text-2xl font-semibold text-[#2F2F2F]">
          Your recent logs
        </h2>
      </div>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <p className="text-[#6B6B6B]">No logs yet — start with your first daily reflection 🌷</p>
        ) : (
          logs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="rounded-2xl border border-[#ECECEC] bg-[#FCFCFC] px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <p className="text-[#2F2F2F] font-medium">{log.date}</p>
                <p className="text-sm text-[#8A8A8A] mt-1">
                  Mood {log.mood}/5 • Focus {log.focusLevel || "-"}/5 • Stress {log.stressLevel || "-"}/5
                </p>
              </div>

              <div className="text-sm text-[#6B6B6B]">
                Sleep {log.sleepHours}h • Study {log.studyHours}h
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentLogsCard;