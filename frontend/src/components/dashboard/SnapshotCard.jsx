const SnapshotCard = ({ title, value, subtitle, icon, color = "pink" }) => {
  const colorMap = {
    pink: "from-[#FFF6F8] to-[#FDECEF] border-[#F2D9E1]",
    blue: "from-[#F6FAFF] to-[#EEF6FF] border-[#D9E8F4]",
    lavender: "from-[#FAF7FF] to-[#F2ECFA] border-[#E4DCF2]",
    mint: "from-[#F7FFF8] to-[#EEF8F0] border-[#DCEEDD]",
    peach: "from-[#FFF8F2] to-[#FFF2E8] border-[#F4E0C8]",
  };

  return (
    <div
      className={`rounded-[28px] border bg-gradient-to-br ${colorMap[color]} p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)]`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-2xl">{icon}</div>
        <span className="text-xs uppercase tracking-[0.15em] text-[#8A8A8A]">
          Today
        </span>
      </div>

      <p className="text-sm text-[#6B6B6B]">{title}</p>
      <h3 className="text-3xl font-semibold text-[#2F2F2F] mt-1">{value}</h3>
      <p className="text-sm text-[#8A8A8A] mt-2">{subtitle}</p>
    </div>
  );
};

export default SnapshotCard;