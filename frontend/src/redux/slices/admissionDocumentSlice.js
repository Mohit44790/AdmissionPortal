import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const uploadDocument = createAsyncThunk(
    "admissionDocument/up;oad",
    async({file,type},{rejectWithValue}) =>{
        try {
            const formData = new FormData();
            formData.append("file",file);
            formData.append("type",type);

            const res = await api.post("student/admission/upload-document",formData,
                {headers:{
                    "Content-Type":"multipart/form-data",
                }}
            )

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Document upload failed")
            
        }
    }
);
 
// get document

export const fetchDocuments = createAsyncThunk(
    "admissionDocument/fetchAll",
    async (__, {rejectWithValue})=>{
        try {
            const res = await api.get("student/admission/documents");
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch documents")
            
        }
    }
);

// view document 
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


const admissionDocumentSlice = createSlice({
    name:"admissionDocument",
    initialState:{
        document:[],
        loading:false,
        error:null,
        viewing:null,
    },
    reducers:{
        clearView:(state)=>{
            state.viewing = null;
        }
    }
})

