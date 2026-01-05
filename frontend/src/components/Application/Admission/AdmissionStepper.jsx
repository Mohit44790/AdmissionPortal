import { useSelector } from "react-redux";
import { TOTAL_STEPS } from "../../../redux/slices/admissionSlice";

const steps = ["Personal", "Family", "Bank", "Category", "Other"];

const AdmissionStepper = () => {
  const { step } = useSelector((s) => s.admission);

  return (
    <div className="w-full px-6 py-4 bg-white shadow sticky top-0 ">
      <div className="flex items-center max-w-4xl mx-auto">
        {steps.map((label, index) => (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${index + 1 <= step ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"}`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1">{label}</span>
            </div>

            {index < TOTAL_STEPS - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded
                ${index + 1 < step ? "bg-indigo-600" : "bg-gray-300"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionStepper;
