const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-2xl border border-[#EAE7E2] bg-[#FCFBFA] text-[#2F2F2F] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#F7D6E0] focus:border-transparent"
    />
  );
};

export default Input;