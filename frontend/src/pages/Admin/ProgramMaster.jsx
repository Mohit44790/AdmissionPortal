import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrograms,
  createProgram,
  deleteProgram,
} from "../../redux/slices/adminSlice";

const ProgramMaster = () => {
  const [level, setLevel] = useState("");
  const dispatch = useDispatch();
  const { programs, loading } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleAdd = () => {
    if (!level) return;
    dispatch(createProgram({ level }));
    setLevel("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Program Master</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Program Level (UG / PG)"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {programs.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{p.level}</span>
            <button
              onClick={() => dispatch(deleteProgram(p.id))}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {loading && <p className="mt-2 text-sm">Saving...</p>}
    </div>
  );
};

export default ProgramMaster;
