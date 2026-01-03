import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const isProfileComplete =
    user?.name && user?.email && user?.mobile && user?.dob;

  /* ❌ Profile incomplete */
  if (!isProfileComplete) {
    return (
      <DashboardMessage
        title="Complete your profile"
        description="Finish your profile details to unlock the admission dashboard."
        buttonText="Complete Profile"
        buttonLink="/profile"
        currentYear={currentYear}
        nextYear={nextYear}
      />
    );
  }

  /* ✅ Profile complete */
  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 mb-4">
          Admission Portal
        </span>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Academic Session {currentYear} – {nextYear}
        </h1>
      </div>

      {/* Main Card */}
      <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-10 md:p-14">
        {/* Greeting */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Welcome back,{" "}
          <span className="text-blue-600">{user.name}</span>
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl">
          Your profile is complete. You can now manage your admission
          applications, review updates, and make changes anytime.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/applications">
            <button className="px-7 py-3 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">
              View Applications
            </button>
          </Link>

          <Link to="/profile">
            <button className="px-7 py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ----------------------------------------------------------
   MODERN MESSAGE (PROFILE INCOMPLETE)
----------------------------------------------------------- */

const DashboardMessage = ({
  title,
  description,
  buttonText,
  buttonLink,
  currentYear,
  nextYear,
}) => {
  return (
    <div className="min-h-[70vh] flex items-center mt-4 justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-10 text-center">
        <h1 className="inline-block px-4 py-1 text-2xl font-bold rounded-full bg-blue-50 text-blue-600 mb-4">
          Admission Portal {currentYear}–{nextYear}
        </h1>

        <h2 className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          {description}
        </p>

        <Link to={buttonLink}>
          <button className="mt-8 w-full py-3 cursor-pointer rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};
