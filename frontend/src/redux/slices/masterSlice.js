import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

//create program 

export const createProgram = createAsyncThunk(
    "master/createProgram",
    async(data,{rejectWithValue}) =>{
        try {
            const res = await api.post("/api/master/admin/program",data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Program create failed")
        }
    }
);

export const deleteProgram = createAsyncThunk(
    "master/deleteProgram",
    async(id,{rejectWithValue})=>{
        try {
            await api.delete(`api/master/admin/program/${id}`)
            return id;
        } catch (error) {
             return rejectWithValue("Delete failed");
        }
    }
)

/* ================= COURSE ================= */
export const createCourse = createAsyncThunk(
  "master/createCourse",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/master/admin/course", data);
      return res.data;
    } catch (e) {
      return rejectWithValue("Course create failed");
    }
  }
);