const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-[#6B6B6B] mt-1">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;