import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCategoryProfile } from "../../redux/slices/studentSlice";


const CategoryDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.studentProfile);

  const [formData, setFormData] = useState({
    category: "",
    caste: "",
    quota: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(saveCategoryProfile(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/student/profile/other"); // next step
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC]">
      <div className="w-[420px] bg-gradient-to-br from-[#5D54A4] to-[#7C78B8] rounded-3xl shadow-2xl p-10">

        <h2 className="text-white text-3xl font-bold text-center mb-8">
          Category Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category */}
          <select
            name="category"
            onChange={handleChange}
            className="w-full bg-white/90 text-gray-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="GENERAL">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>

          {/* Caste */}
          <input
            name="caste"
            placeholder="Caste"
            onChange={handleChange}
            className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          {/* Quota */}
          <select
            name="quota"
            onChange={handleChange}
            className="w-full bg-white/90 text-gray-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          >
            <option value="">Select Quota</option>
            <option value="STATE">State</option>
            <option value="ALL_INDIA">All India</option>
          </select>

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
          Step 4 of 5
        </p>
      </div>
    </div>
  );
};

export default CategoryDetails;
