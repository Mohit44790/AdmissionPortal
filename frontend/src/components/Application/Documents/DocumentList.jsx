import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDocuments,
  viewDocument,
  clearView,
} from "../../redux/slices/admissionDocumentSlice";

const DocumentList = () => {
  const dispatch = useDispatch();
  const { documents, viewing } = useSelector(
    (s) => s.admissionDocument
  );

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <div className="max-w-2xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>

      <ul className="space-y-3">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{doc.type}</span>

            <button
              onClick={() => dispatch(viewDocument(doc.id))}
              className="text-blue-600 font-medium"
            >
              View
            </button>
          </li>
        ))}
      </ul>

      {/* VIEW MODAL */}
      {viewing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-3xl">
            <iframe
              src={viewing}
              title="Document"
              className="w-[600px] h-[500px]"
            />
            <button
              onClick={() => dispatch(clearView())}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
