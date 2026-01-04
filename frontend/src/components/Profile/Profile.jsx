import React, { useState } from "react";

const Profile = () => {
  // Form state
  const [formData, setFormData] = useState({
    personal: "",
    family: "",
    bank: "",
    category: "",
    other: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Profile</h1>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Profile submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Personal Info</label>
          <input
            type="text"
            name="personal"
            value={formData.personal}
            onChange={handleChange}
            placeholder="Enter personal info"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Family Info */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Family Info</label>
          <input
            type="text"
            name="family"
            value={formData.family}
            onChange={handleChange}
            placeholder="Enter family info"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Bank Info */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Bank Info</label>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            placeholder="Enter bank info"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Category Info */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Category Info</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category info"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Other Info */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Other Info</label>
          <input
            type="text"
            name="other"
            value={formData.other}
            onChange={handleChange}
            placeholder="Enter other info"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
