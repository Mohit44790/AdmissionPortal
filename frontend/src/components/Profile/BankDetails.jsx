import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveBankProfile } from "../../redux/slices/studentSlice";
import { nextStep } from "../../redux/slices/admissionSlice";

const BankDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bank, loading, error } = useSelector((s) => s.studentProfile);

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifsc: "",
  });

  // Pre-fill form if bank details exist
  useEffect(() => {
    if (bank) {
      setFormData({
        bankName: bank.bankName || "",
        accountNumber: bank.accountNumber || "",
        ifsc: bank.ifsc || "",
      });
    }
  }, [bank]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(saveBankProfile(formData));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(nextStep());
      // Optional: navigate to next step
      // navigate("/category-details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC]">
      <div className="w-[420px] bg-gradient-to-br from-[#5D54A4] to-[#7C78B8] rounded-3xl shadow-2xl p-10">

        <h2 className="text-white text-3xl font-bold text-center mb-8">
          Bank Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Bank Name */}
          <div className="relative">
            <i className="fas fa-university absolute top-3 left-3 text-gray-500" />
            <input
              name="bankName"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg pl-10 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Account Number */}
          <div className="relative">
            <i className="fas fa-credit-card absolute top-3 left-3 text-gray-500" />
            <input
              name="accountNumber"
              type="text"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 rounded-lg pl-10 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* IFSC Code */}
          <div className="relative">
            <i className="fas fa-code absolute top-3 left-3 text-gray-500" />
            <input
              name="ifsc"
              placeholder="IFSC Code"
              value={formData.ifsc}
              onChange={handleChange}
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 uppercase tracking-widest rounded-lg pl-10 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
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
          Step 3 of 5
        </p>
      </div>
    </div>
  );
};

export default BankDetails;
