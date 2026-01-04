import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/slices/studentSlice";

const InfoBlock = ({ title, items }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4 text-indigo-700">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map(({ label, value }) => (
        <p key={label} className="text-sm text-gray-700">
          <span className="font-medium">{label}:</span> {value || "-"}
        </p>
      ))}
    </div>
  </div>
);

const StudentProfileView = () => {
  const dispatch = useDispatch();
  const { personal, family, bank, category, other, loading, error } =
    useSelector((s) => s.studentProfile);

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Admission Profile Overview
      </h1>

      <InfoBlock
        title="Personal Details"
        items={[
          { label: "Full Name", value: personal?.fullName },
          { label: "Gender", value: personal?.gender },
          { label: "Date of Birth", value: personal?.dob },
          { label: "Alternate Email", value: personal?.alternateEmail },
          { label: "Alternate Phone", value: personal?.alternatePhone },
        ]}
      />

      <InfoBlock
        title="Family Details"
        items={[
          { label: "Father Name", value: family?.fatherName },
          { label: "Mother Name", value: family?.motherName },
          { label: "Family Income", value: family?.familyIncome },
        ]}
      />

      <InfoBlock
        title="Bank Details"
        items={[
          { label: "Bank Name", value: bank?.bankName },
          { label: "Account Number", value: bank?.accountNumber },
          { label: "IFSC", value: bank?.ifsc },
        ]}
      />

      <InfoBlock
        title="Category Details"
        items={[
          { label: "Category", value: category?.category },
          { label: "Caste", value: category?.caste },
          { label: "Quota", value: category?.quota },
        ]}
      />

      <InfoBlock
        title="Other Details"
        items={[
          { label: "Nationality", value: other?.nationality },
          { label: "Religion", value: other?.religion },
          { label: "Disability", value: other?.disability },
        ]}
      />
    </div>
  );
};

export default StudentProfileView;
