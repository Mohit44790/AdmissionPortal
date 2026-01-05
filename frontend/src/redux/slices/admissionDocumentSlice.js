import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* ================= UPLOAD DOCUMENT ================= */
export const uploadDocument = createAsyncThunk(
  "admissionDocument/upload",
  async ({ file, type }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await api.post(
        "/student/admission/upload-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Document upload failed"
      );
    }
  }
);

/* ================= FETCH DOCUMENT LIST ================= */
export const fetchDocuments = createAsyncThunk(
  "admissionDocument/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/student/admission/documents");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch documents"
      );
    }
  }
);

/* ================= VIEW DOCUMENT ================= */
export const viewDocument = createAsyncThunk(
  "admissionDocument/view",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/student/admission/view-document/${id}`,
        { responseType: "blob" }
      );
      return { blob: res.data, id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to view document"
      );
    }
  }
);

/* ================= SLICE ================= */
const admissionDocumentSlice = createSlice({
  name: "admissionDocument",
  initialState: {
    documents: [],
    loading: false,
    error: null,
    viewing: null, // blob url
  },
  reducers: {
    clearView: (state) => {
      state.viewing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // UPLOAD
      .addCase(uploadDocument.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(uploadDocument.fulfilled, (s, a) => {
        s.loading = false;
        s.documents.push(a.payload);
      })
      .addCase(uploadDocument.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // FETCH
      .addCase(fetchDocuments.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (s, a) => {
        s.loading = false;
        s.documents = a.payload;
      })
      .addCase(fetchDocuments.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // VIEW
      .addCase(viewDocument.fulfilled, (s, a) => {
        s.viewing = URL.createObjectURL(a.payload.blob);
      });
  },
});

export const { clearView } = admissionDocumentSlice.actions;
export default admissionDocumentSlice.reducer;
