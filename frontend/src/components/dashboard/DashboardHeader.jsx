const DashboardHeader = () => {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm tracking-[0.18em] uppercase text-[#8A8A8A]">
          Smart Productivity Dashboard
        </span>

        <span className="px-3 py-1 rounded-full bg-[#FFF6F8] border border-[#F2D9E1] text-sm text-[#7A6470] shadow-sm">
          Behavioral Insights 🌷
        </span>

        <span className="px-3 py-1 rounded-full bg-[#F6FAFF] border border-[#D9E8F4] text-sm text-[#60788F] shadow-sm">
          Gentle Analytics ✨
        </span>
      </div>

      <h1 className="text-4xl font-semibold text-[#2F2F2F]">
        Your calm productivity space
      </h1>

      <p className="text-[#6B6B6B] mt-3 text-lg leading-relaxed max-w-2xl">
        Track your patterns, notice your energy, and turn daily reflections
        into meaningful self-understanding.
      </p>
    </div>
  );
};

export default DashboardHeader;