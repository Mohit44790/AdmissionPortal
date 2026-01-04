import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../../redux/slices/admissionSlice";

import AdmissionStepper from "./AdmissionStepper";
import Profile from "../../Profile/Profile";
import FamilyDetails from "../../Profile/FamilyDetails";
import BankDetails from "../../Profile/BankDetails";
import CategoryDetails from "../../Profile/CategoryDetails";
import OtherDetails from "../../Profile/OtherDetails";

const AdmissionForm = () => {
  const { step } = useSelector((s) => s.admission);
  const dispatch = useDispatch();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Profile />;
      case 2:
        return <FamilyDetails />;
      case 3:
        return <BankDetails />;
      case 4:
        return <CategoryDetails />;
      case 5:
        return <OtherDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdmissionStepper />

      <div className="max-w-4xl mx-auto bg-white p-6 mt-6 rounded-xl shadow">
        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            disabled={step === 1}
            onClick={() => dispatch(prevStep())}
            className="px-6 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Back
          </button>

          <button
            disabled={step === 5}
            onClick={() => dispatch(nextStep())}
            className="px-6 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
          >
            {step === 5 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
