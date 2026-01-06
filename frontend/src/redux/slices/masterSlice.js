import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* ================= PROGRAM ================= */
export const createProgram = createAsyncThunk(
  "master/createProgram",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/master/admin/program", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Program create failed");
    }
  }
);

export const deleteProgram = createAsyncThunk(
  "master/deleteProgram",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/master/admin/program/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue("Delete failed");
    }
  }
);

/* ================= COLLEGE ================= */
export const createCollege = createAsyncThunk(
  "master/createCollege",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/master/admin/college", data);
      return res.data;
    } catch (e) {
      return rejectWithValue("College create failed");
    }
  }
);

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

const masterSlice = createSlice({
  name:"master",
  initialState:{
    programs:[],
    colleges:[],
    courses:[],
    loading:false,
    error:null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    const pending =(s) =>{
      s.loading = true;
      s.error = null;
    };
    const rejected =(s,a)=>{
      s.loading = false;
      s.error = a.payload;
    };

    builder
          .addCase(createProgram.pending,pending)
          .addCase(createProgram.fulfilled,(s,a) =>{
            s.loading = false;
            s.programs.push(a.payload);
          })
          .addCase(createProgram.rejected ,rejected)

          .addCase(deleteProgram.fulfilled,(s,a)=>{
            s.programs = s.programs.filter((p)=>p.id !== a.payload);
          })
          .addCase(createCollege.fulfilled,(s,a)=>{
            s.loading = false;
            s.colleges.push(a.payload);
          })
          .addCase(createCourse.fulfilled,(s,a)=>{
            s.loading = false;
            s.courses.push(a.payload);
          });
  }
});

export default masterSlice.reducer;