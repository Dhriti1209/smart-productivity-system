const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-[#EBC6D2] hover:bg-[#e3b9c7] text-[#2F2F2F] font-medium py-3 rounded-2xl shadow-sm"
    >
      {children}
    </button>
  );
};

export default Button;