import Card from "../Card";

const AnalyticsSummaryCard = ({ analytics }) => {
  return (
    <Card className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[30px] p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.18em] text-[#8A8A8A] mb-2">
          Performance Summary
        </p>
        <h2 className="text-2xl font-semibold text-[#2F2F2F]">
          Your behavioral analytics
        </h2>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#FFF7FA] border border-[#F2D9E1] p-5">
          <p className="text-sm text-[#6B6B6B]">📈 Productivity Score</p>
          <h3 className="text-2xl font-semibold text-[#2F2F2F] mt-2">
            {analytics?.productivityScore ?? "--"}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#F6FAFF] border border-[#D9E8F4] p-5">
          <p className="text-sm text-[#6B6B6B]">🔥 Burnout Risk</p>
          <h3 className="text-2xl font-semibold text-[#2F2F2F] mt-2">
            {analytics?.burnoutRisk ?? "--"}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#FAF7FF] border border-[#E4DCF2] p-5">
          <p className="text-sm text-[#6B6B6B]">✅ Completion Rate</p>
          <h3 className="text-2xl font-semibold text-[#2F2F2F] mt-2">
            {analytics?.completionRate ?? "--"}%
          </h3>
        </div>

        <div className="rounded-2xl bg-[#F7FFF8] border border-[#DCEEDD] p-5">
          <p className="text-sm text-[#6B6B6B]">📚 Avg Study</p>
          <h3 className="text-2xl font-semibold text-[#2F2F2F] mt-2">
            {analytics?.avgStudy ?? "--"} hrs
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsSummaryCard;