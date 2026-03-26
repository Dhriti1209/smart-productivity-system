const DailyLogHeader = () => {
  return (
    <div className="max-w-2xl">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm tracking-[0.18em] uppercase text-[#8A8A8A]">
          Daily Reflection
        </span>

        <span className="px-3 py-1 rounded-full bg-[#FFF6F8] border border-[#F2D9E1] text-sm text-[#7A6470] shadow-sm">
          Gentle Check-in 
        </span>

        <span className="px-3 py-1 rounded-full bg-[#F6FAFF] border border-[#D9E8F4] text-sm text-[#60788F] shadow-sm">
          2 mins only 
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
          <p className="text-sm text-[#2F2F2F] mt-1">Gentle effort still counts </p>
        </div>

        <div className="bg-[#F6FAFF]/90 backdrop-blur-md border border-[#D9E8F4] rounded-2xl px-4 py-3 shadow-sm">
          <p className="text-xs uppercase tracking-[0.15em] text-[#8798A9]">Mindset</p>
          <p className="text-sm text-[#2F2F2F] mt-1">Consistency &gt; Perfection</p>
        </div>
      </div>
    </div>
  );
};

export default DailyLogHeader;