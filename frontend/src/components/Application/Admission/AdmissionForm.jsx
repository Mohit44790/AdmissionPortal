import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../../redux/slices/admissionSlice";


const AdmissionForm = () => {
  const { step } = useSelector((s) => s.admission);
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl mx-auto">
      <h2>Step {step} of 4</h2>

      {step === 1 && <PersonalForm />}
      {step === 2 && <AcademicForm />}
      {step === 3 && <DocumentUpload />}
      {step === 4 && <Review />}

      <div className="flex justify-between mt-4">
        {step > 1 && <button onClick={() => dispatch(prevStep())}>Back</button>}
        {step < 4 && <button onClick={() => dispatch(nextStep())}>Next</button>}
      </div>
    </div>
  );
};

export default AdmissionForm;
