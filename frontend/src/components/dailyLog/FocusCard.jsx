import Card from "../Card";
import Input from "../Input";

const FocusCard = ({ formData, handleChange }) => {
  return (
    <Card className="bg-gradient-to-br from-[#F8FFF9] to-[#FCFFFC] border border-[#DDEEDD] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[28px] p-8">
      <p className="text-sm uppercase tracking-[0.18em] text-[#7D9A7D] mb-2">
         Focus & Reflection
      </p>
      <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-6">
        Protect your attention
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
             How distracted did you feel?
          </label>
          <Input
            type="number"
            name="distractions"
            placeholder="e.g. 2"
            value={formData.distractions}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
             What made today feel this way?
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="6"
            placeholder="e.g. Felt more focused in the library, but got tired after lunch..."
            className="w-full rounded-2xl border border-[#E7F1E7] bg-white/80 px-4 py-3 text-[#2F2F2F] placeholder:text-[#9B9B9B] outline-none focus:ring-2 focus:ring-[#DDEEDD] resize-none"
          />
        </div>

        <div className="rounded-2xl bg-white/70 border border-[#E7F1E7] p-4">
          <p className="text-sm text-[#6B6B6B]">Little reminder </p>
          <p className="text-[#2F2F2F] mt-2 leading-relaxed text-sm">
            Your notes can later help the AI coach give more personal suggestions.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FocusCard;