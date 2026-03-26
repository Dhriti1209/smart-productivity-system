import Card from "../Card";
import Input from "../Input";

const RecoveryCard = ({ formData, handleChange }) => {
  return (
    <Card className="bg-gradient-to-br from-[#FFF8FB] to-[#FAF5FF] border border-[#F1E4EE] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[28px] p-8">
      <p className="text-sm uppercase tracking-[0.18em] text-[#A08997] mb-2">
        🌙 Rest & Recovery
      </p>
      <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-6">
        Recharge your system
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            📅 Which day are you logging?
          </label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            😴 How much did you sleep?
          </label>
          <Input
            type="number"
            name="sleepHours"
            placeholder="e.g. 7.5"
            value={formData.sleepHours}
            onChange={handleChange}
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center justify-between rounded-2xl border border-[#EFDDE5] bg-white/70 px-4 py-4 cursor-pointer">
            <span className="text-sm text-[#5F5F5F]">🏃 Did your body move today?</span>
            <input
              type="checkbox"
              name="exercise"
              checked={formData.exercise}
              onChange={handleChange}
              className="w-5 h-5 accent-[#EBC6D2]"
            />
          </label>
        </div>
      </div>
    </Card>
  );
};

export default RecoveryCard;