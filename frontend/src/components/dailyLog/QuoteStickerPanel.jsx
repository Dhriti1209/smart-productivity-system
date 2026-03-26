import { motion } from "framer-motion";
import quote1 from "../../assets/quote1.jpg";
import quote2 from "../../assets/quote2.jpg";

const QuoteStickerPanel = () => {
  return (
    <div className="hidden xl:flex flex-col gap-4 w-[260px]">
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -6, rotate: -3, scale: 1.02 }}
        className="bg-white/80 border border-white/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-3"
      >
        <img
          src={quote1}
          alt="motivational quote"
          className="rounded-[22px] w-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        whileHover={{ y: -6, rotate: 3, scale: 1.02 }}
        className="bg-white/80 border border-white/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-3 translate-x-6"
      >
        <img
          src={quote2}
          alt="cute journaling quote"
          className="rounded-[22px] w-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default QuoteStickerPanel;