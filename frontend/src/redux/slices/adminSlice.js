import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* ================= PROGRAM ================= */

// GET PROGRAMS
export const fetchPrograms = createAsyncThunk(
  "admin/fetchPrograms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/master/programs");
      return res.data;
    } catch (e) {
      return rejectWithValue("Failed to load programs");
    }
  }
);

// CREATE PROGRAM
export const createProgram = createAsyncThunk(
  "admin/createProgram",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/master/admin/program", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Program create failed");
    }
  }
);

// UPDATE PROGRAM
export const updateProgram = createAsyncThunk(
  "admin/updateProgram",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/master/admin/program/${id}`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue("Program update failed");
    }
  }
);

// DELETE PROGRAM
export const deleteProgram = createAsyncThunk(
  "admin/deleteProgram",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/master/admin/program/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue("Program delete failed");
    }
  }
);

/* ================= COLLEGE ================= */

export const fetchColleges = createAsyncThunk(
  "admin/fetchColleges",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/master/colleges");
      return res.data;
    } catch {
      return rejectWithValue("Failed to load colleges");
    }
  }
);

export const createCollege = createAsyncThunk(
  "admin/createCollege",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/master/admin/college", data);
      return res.data;
    } catch {
      return rejectWithValue("College create failed");
    }
  }
);

/* ================= COURSE ================= */

// ALL COURSES
export const fetchCourses = createAsyncThunk(
  "admin/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/master/courses");
      return res.data;
    } catch {
      return rejectWithValue("Failed to load courses");
    }
  }
);

// COURSES BY PROGRAM
export const fetchCoursesByProgram = createAsyncThunk(
  "admin/fetchCoursesByProgram",
  async (program, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/master/courses/program/${program}`);
      return res.data;
    } catch {
      return rejectWithValue("Failed to load program courses");
    }
  }
);

// COURSES BY PROGRAM + COLLEGE
export const fetchCoursesByProgramCollege = createAsyncThunk(
  "admin/fetchCoursesByProgramCollege",
  async ({ program, collegeId }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/api/master/courses/program/${program}/college/${collegeId}`
      );
      return res.data;
    } catch {
      return rejectWithValue("Failed to load filtered courses");
    }
  }
);

// CREATE COURSE
export const createCourse = createAsyncThunk(
  "admin/createCourse",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/master/admin/course", data);
      return res.data;
    } catch {
      return rejectWithValue("Course create failed");
    }
  }
);

// UPDATE COURSE
export const updateCourse = createAsyncThunk(
  "admin/updateCourse",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/master/admin/course/${id}`, data);
      return res.data;
    } catch {
      return rejectWithValue("Course update failed");
    }
  }
);

// DELETE COURSE
export const deleteCourse = createAsyncThunk(
  "admin/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/master/admin/course/${id}`);
      return id;
    } catch {
      return rejectWithValue("Course delete failed");
    }
  }
);

/* ================= STUDENT ================= */

// SELECT COURSE
export const selectStudentCourse = createAsyncThunk(
  "admin/selectStudentCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/student/profile/select-course/${courseId}`);
      return res.data;
    } catch {
      return rejectWithValue("Course selection failed");
    }
  }
);

/* ================= SLICE ================= */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    programs: [],
    colleges: [],
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const pending = (s) => {
      s.loading = true;
      s.error = null;
    };

    const rejected = (s, a) => {
      s.loading = false;
      s.error = a.payload;
    };

    builder
      /* PROGRAM */
      .addCase(fetchPrograms.pending, pending)
      .addCase(fetchPrograms.fulfilled, (s, a) => {
        s.loading = false;
        s.programs = a.payload;
      })
      .addCase(createProgram.fulfilled, (s, a) => {
        s.loading = false;
        s.programs.push(a.payload);
      })
      .addCase(updateProgram.fulfilled, (s, a) => {
        s.loading = false;
        s.programs = s.programs.map((p) =>
          p.id === a.payload.id ? a.payload : p
        );
      })
      .addCase(deleteProgram.fulfilled, (s, a) => {
        s.programs = s.programs.filter((p) => p.id !== a.payload);
      })

      /* COLLEGE */
      .addCase(fetchColleges.pending, pending)
      .addCase(fetchColleges.fulfilled, (s, a) => {
        s.loading = false;
        s.colleges = a.payload;
      })
      .addCase(createCollege.fulfilled, (s, a) => {
        s.loading = false;
        s.colleges.push(a.payload);
      })

      /* COURSE */
      .addCase(fetchCourses.fulfilled, (s, a) => {
        s.courses = a.payload;
      })
      .addCase(fetchCoursesByProgram.fulfilled, (s, a) => {
        s.courses = a.payload;
      })
      .addCase(fetchCoursesByProgramCollege.fulfilled, (s, a) => {
        s.courses = a.payload;
      })
      .addCase(createCourse.fulfilled, (s, a) => {
        s.courses.push(a.payload);
      })
      .addCase(updateCourse.fulfilled, (s, a) => {
        s.courses = s.courses.map((c) =>
          c.id === a.payload.id ? a.payload : c
        );
      })
      .addCase(deleteCourse.fulfilled, (s, a) => {
        s.courses = s.courses.filter((c) => c.id !== a.payload);
      })

      .addMatcher(
        (a) => a.type.endsWith("/pending"),
        pending
      )
      .addMatcher(
        (a) => a.type.endsWith("/rejected"),
        rejected
      );
  },
});

export default adminSlice.reducer;
