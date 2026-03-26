const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-[28px] shadow-sm border border-[#EAE7E2] p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;