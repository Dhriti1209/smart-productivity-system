import Card from "../Card";
import Input from "../Input";

const ProductivityCard = ({ formData, handleChange }) => {
  return (
    <Card className="bg-gradient-to-br from-[#F8FCFF] to-[#F4F9FF] border border-[#DDEAF4] shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[28px] p-8">
      <p className="text-sm uppercase tracking-[0.18em] text-[#8094A7] mb-2">
         Deep Work
      </p>
      <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-6">
        What did you get done?
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            ⏳ How long did you study/work?
          </label>
          <Input
            type="number"
            name="studyHours"
            placeholder="e.g. 5"
            value={formData.studyHours}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
             How many things did you plan?
          </label>
          <Input
            type="number"
            name="tasksPlanned"
            placeholder="e.g. 6"
            value={formData.tasksPlanned}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
             How many did you finish?
          </label>
          <Input
            type="number"
            name="tasksCompleted"
            placeholder="e.g. 5"
            value={formData.tasksCompleted}
            onChange={handleChange}
          />
        </div>

        {/* UI-only todo snapshot */}
        <div className="mt-4 rounded-2xl bg-white/75 border border-[#DDEAF4] p-4">
          <p className="text-sm font-medium text-[#2F2F2F] mb-3">📝 Tiny To-Do Snapshot</p>

          <div className="space-y-3">
            <Input
              type="text"
              name="todo1"
              placeholder="☐ Revise DBMS"
              value={formData.todo1}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="todo2"
              placeholder="☐ Solve 3 DSA questions"
              value={formData.todo2}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="todo3"
              placeholder="☐ Complete ML notebook"
              value={formData.todo3}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductivityCard;