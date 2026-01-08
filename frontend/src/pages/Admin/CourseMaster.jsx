import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  fetchPrograms,
  fetchColleges,
} from "../../redux/slices/adminSlice";

const CourseMaster = () => {
  const dispatch = useDispatch();
  const { programs, colleges, loading } = useSelector((s) => s.admin);

  const [courseName, setCourseName] = useState("");
  const [programId, setProgramId] = useState("");
  const [collegeId, setCollegeId] = useState("");

  useEffect(() => {
    dispatch(fetchPrograms());
    dispatch(fetchColleges());
  }, [dispatch]);

  const handleSave = () => {
    if (!courseName || !programId || !collegeId) return;

    dispatch(
      createCourse({
        courseName,
        program: { id: Number(programId) },
        college: { id: Number(collegeId) },
      })
    );

    setCourseName("");
    setProgramId("");
    setCollegeId("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Course Master</h2>

      <input
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course Name"
        className="border px-3 py-2 rounded w-full mb-3"
      />

      {/* PROGRAM DROPDOWN */}
      <select
        value={programId}
        onChange={(e) => setProgramId(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      >
        <option value="">Select Program</option>
        {programs.map((p) => (
          <option key={p.id} value={p.id}>
            {p.level}
          </option>
        ))}
      </select>

      {/* COLLEGE DROPDOWN */}
      <select
        value={collegeId}
        onChange={(e) => setCollegeId(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      >
        <option value="">Select College</option>
        {colleges.map((c) => (
          <option key={c.id} value={c.id}>
            {c.collegeName}
          </option>
        ))}
      </select>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded w-full"
      >
        {loading ? "Saving..." : "Save Course"}
      </button>
    </div>
  );
};

export default CourseMaster;
