import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProgram, deleteProgram } from "../../redux/slices/adminSlice";


const ProgramMaster = () => {
  const [level, setLevel] = useState("");
  const dispatch = useDispatch();
  const { programs, loading } = useSelector((s) => s.admin);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Program Master</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Program Level (GRADUATE)"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={() => dispatch(createProgram({ level }))}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {programs.map((p) => (
          <li key={p.id} className="flex justify-between border-b py-2">
            {p.level}
            <button
              onClick={() => dispatch(deleteProgram(p.id))}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {loading && <p>Saving...</p>}
    </div>
  );
};

export default ProgramMaster;
