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

