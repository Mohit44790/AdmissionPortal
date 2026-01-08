import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCollege, fetchColleges } from "../../redux/slices/adminSlice";

const CollegeMaster = () => {
  const [collegeName, setCollegeName] = useState("");
  const dispatch = useDispatch();
  const { colleges } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchColleges());
  }, [dispatch]);

  const handleSave = () => {
    if (!collegeName) return;
    dispatch(createCollege({ collegeName }));
    setCollegeName("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">College Master</h2>

      <input
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
        placeholder="College Name"
        className="border px-3 py-2 rounded w-full mb-3"
      />

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save College
      </button>

      <ul className="mt-4 space-y-2">
        {colleges.map((c) => (
          <li key={c.id} className="text-sm text-gray-700">
            {c.collegeName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollegeMaster;
