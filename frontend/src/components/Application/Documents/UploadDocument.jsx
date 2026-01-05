import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocument } from "../../../redux/slices/admissionDocumentSlice";


const UploadDocument = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.admissionDocument);

  const [file, setFile] = useState(null);
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !type) return;

    dispatch(uploadDocument({ file, type }));
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select Document Type</option>
          <option value="PHOTO">Photo</option>
          <option value="AADHAR">Aadhar</option>
          <option value="MARKSHEET">Marksheet</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadDocument;
