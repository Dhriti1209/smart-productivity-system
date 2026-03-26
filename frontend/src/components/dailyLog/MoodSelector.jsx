import { motion } from "framer-motion";
import Card from "../Card";

const MoodSelector = ({ formData, setFormData }) => {
  const moodOptions = [
    { value: 1, emoji: "😓", label: "Drained" },
    { value: 2, emoji: "😕", label: "Low" },
    { value: 3, emoji: "😌", label: "Okay" },
    { value: 4, emoji: "😊", label: "Good" },
    { value: 5, emoji: "✨", label: "Great" },
  ];

  const scaleOptions = [1, 2, 3, 4, 5];

  const handleSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[28px] p-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.18em] text-[#8A8A8A] mb-2">
          Emotional Check-in
        </p>
        <h2 className="text-2xl font-semibold text-[#2F2F2F]">
          How are you feeling today?
        </h2>
      </div>

      {/* Mood */}
      <div className="mb-8">
        <p className="text-sm text-[#6B6B6B] mb-4">💭 Mood</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {moodOptions.map((moodOption) => (
            <motion.button
              type="button"
              key={moodOption.value}
              onClick={() => handleSelect("mood", moodOption.value)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl border px-4 py-5 text-center shadow-sm ${
                Number(formData.mood) === moodOption.value
                  ? "bg-[#F7D6E0] border-[#E8C3CF]"
                  : "bg-white/80 border-white/60 hover:bg-[#FCF6F8]"
              }`}
            >
              <motion.div
                animate={
                  Number(formData.mood) === moodOption.value
                    ? { scale: [1, 1.15, 1] }
                    : {}
                }
                transition={{ duration: 0.35 }}
                className="text-2xl mb-2"
              >
                {moodOption.emoji}
              </motion.div>
              <p className="text-sm text-[#2F2F2F] font-medium">{moodOption.label}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Focus / Energy / Stress */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            field: "focusLevel",
            title: "🎯 Focus Level",
            subtitle: "How focused did you feel?",
            activeColor: "bg-[#DDEBF7] border-[#C7DCEB]",
          },
          {
            field: "energyLevel",
            title: "⚡ Energy Level",
            subtitle: "How energized were you?",
            activeColor: "bg-[#FFF2D8] border-[#F3D9A7]",
          },
          {
            field: "stressLevel",
            title: "🧠 Stress Level",
            subtitle: "How mentally overloaded were you?",
            activeColor: "bg-[#F8DDE5] border-[#EFC6D2]",
          },
        ].map((item) => (
          <div
            key={item.field}
            className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-[#2F2F2F]">{item.title}</p>
            <p className="text-xs text-[#7A7A7A] mt-1 mb-4">{item.subtitle}</p>

            <div className="flex gap-2 flex-wrap">
              {scaleOptions.map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(item.field, option)}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl border text-sm font-medium transition ${
                    Number(formData[item.field]) === option
                      ? `${item.activeColor}`
                      : "bg-white border-[#ECECEC] hover:bg-[#FAFAFA]"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MoodSelector;