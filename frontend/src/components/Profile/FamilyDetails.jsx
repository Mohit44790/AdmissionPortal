import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveFamilyProfile } from "../../redux/slices/studentSlice";
import { nextStep } from "../../redux/slices/admissionSlice";


const FamilyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.studentProfile);

  const [formData, setFormData] = useState({
    fatherName: "",
    motherName: "",
    familyIncome: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await dispatch(saveFamilyProfile(formData));
  if (res.meta.requestStatus === "fulfilled") {
    dispatch(nextStep()); // ✅ correct
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC]">
      <div className="w-[420px] bg-gradient-to-br from-[#5D54A4] to-[#7C78B8] rounded-3xl shadow-2xl p-10">

        <h2 className="text-white text-3xl font-bold text-center mb-8">
          Family Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Father Name */}
          <div className="relative">
            <i className="fas fa-male absolute top-3 left-3 text-gray-500" />
            <input
              name="fatherName"
              placeholder="Father's Name"
              onChange={handleChange}
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg pl-10 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Mother Name */}
          <div className="relative">
            <i className="fas fa-female absolute top-3 left-3 text-gray-500" />
            <input
              name="motherName"
              placeholder="Mother's Name"
              onChange={handleChange}
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg pl-10 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Family Income */}
          <div className="relative">
            <i className="fas fa-rupee-sign absolute top-3 left-3 text-gray-500" />
            <input
              name="familyIncome"
              type="number"
              placeholder="Annual Family Income"
              onChange={handleChange}
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg pl-10 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-300 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-[#4C489D] font-bold py-3 rounded-full shadow transition
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}`}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>

        <p className="text-white text-xs text-center mt-6 opacity-80">
          Step 2 of 5
        </p>
      </div>
    </div>
  );
};

export default FamilyDetails;
