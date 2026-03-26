const InsightCard = ({ label, value, color }) => {
  return (
    <div className="bg-white/75 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
      <p className="text-sm uppercase tracking-[0.16em] text-[#8A8A8A]">{label}</p>
      <h3 className="text-3xl font-semibold mt-4 text-[#2F2F2F]">{value}</h3>

      <div
        className="w-full h-2 rounded-full mt-6"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default InsightCard;