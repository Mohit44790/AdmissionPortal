import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    alternatePhone: "",
    alternateEmail: "",
    gender: "",
    dob: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Student Profile
        </h1>

        {submitted && (
          <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-green-700 border border-green-300">
            Profile saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Alternate Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Alternate Phone
            </label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              placeholder="9123456789"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Alternate Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Alternate Email
            </label>
            <input
              type="email"
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
              placeholder="alt@gmail.com"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      {submitted && (
        <div className="mt-8 bg-gray-50 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Profile Preview
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Full Name:</strong> {formData.fullName}</li>
            <li><strong>Alternate Phone:</strong> {formData.alternatePhone}</li>
            <li><strong>Alternate Email:</strong> {formData.alternateEmail}</li>
            <li><strong>Gender:</strong> {formData.gender}</li>
            <li><strong>Date of Birth:</strong> {formData.dob}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
