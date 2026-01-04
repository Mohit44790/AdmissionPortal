import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveOtherProfile } from "../../redux/slices/studentSlice";


const OtherDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.studentProfile);

  const [formData, setFormData] = useState({
    nationality: "",
    religion: "",
    disability: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(saveOtherProfile(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard"); // admission completed
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC]">
      <div className="w-[420px] bg-gradient-to-br from-[#5D54A4] to-[#7C78B8] rounded-3xl shadow-2xl p-10">

        <h2 className="text-white text-3xl font-bold text-center mb-8">
          Other Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nationality */}
          <input
            name="nationality"
            placeholder="Nationality"
            onChange={handleChange}
            className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          {/* Religion */}
          <input
            name="religion"
            placeholder="Religion"
            onChange={handleChange}
            className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          {/* Disability */}
          <select
            name="disability"
            onChange={handleChange}
            className="w-full bg-white/90 text-gray-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          >
            <option value="">Any Disability?</option>
            <option value="NO">No</option>
            <option value="YES">Yes</option>
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
            {loading ? "Submitting..." : "Submit Admission"}
          </button>
        </form>

        <p className="text-white text-xs text-center mt-6 opacity-80">
          Step 5 of 5 • Admission Complete
        </p>
      </div>
    </div>
  );
};

export default OtherDetails;
