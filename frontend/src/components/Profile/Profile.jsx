import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../redux/slices/admissionSlice";
import { savePersonalProfile } from "../../redux/slices/studentSlice";

const Profile = () => {
const dispatch = useDispatch();
  const { personal, loading } = useSelector((s) => s.studentProfile);

  const [formData, setFormData] = useState({
    fullName: "",
    alternatePhone: "",
    alternateEmail: "",
    gender: "",
    dob: "",
  });

  /* 🔥 PREFILL FROM REDUX */
  useEffect(() => {
    if (personal) {
      setFormData({
        fullName: personal.fullName || "",
        alternatePhone: personal.alternatePhone || "",
        alternateEmail: personal.alternateEmail || "",
        gender: personal.gender || "",
        dob: personal.dob || "",
      });
    }
  }, [personal]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(savePersonalProfile(formData));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(nextStep());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Student Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Alternate Phone
            </label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Alternate Email
            </label>
            <input
              type="email"
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              Save & Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
