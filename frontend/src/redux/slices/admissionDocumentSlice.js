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
)