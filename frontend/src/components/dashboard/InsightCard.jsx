import Card from "../Card";

const ReflectionCard = ({ latestLog }) => {
  return (
    <Card className="bg-gradient-to-br from-[#FFF8FB] to-[#FAF5FF] border border-[#F1E4EE] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[30px] p-8 h-full">
      <p className="text-sm uppercase tracking-[0.18em] text-[#A08997] mb-2">
        ✍️ Reflection
      </p>
      <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-5">
        Recent journal note
      </h3>

      <div className="rounded-2xl bg-white/75 border border-[#F2E6EC] p-5 min-h-[180px]">
        <p className="text-[#2F2F2F] leading-relaxed text-[15px]">
          {latestLog?.notes?.trim()
            ? latestLog.notes
            : "No reflection note yet. Once you start journaling your days, your emotional and productivity patterns will feel much more meaningful here."}
        </p>
      </div>

      <p className="text-sm text-[#8A8A8A] mt-4">
        Your notes will later help the AI coach understand your patterns more deeply.
      </p>
    </Card>
  );
};

export default ReflectionCard;