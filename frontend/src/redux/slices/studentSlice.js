import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* ================= SAVE THUNKS ================= */

// PERSONAL
export const savePersonalProfile = createAsyncThunk(
  "studentProfile/savePersonal",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/personal", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Personal save failed");
    }
  }
);

// FAMILY
export const saveFamilyProfile = createAsyncThunk(
  "studentProfile/saveFamily",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/family", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Family save failed");
    }
  }
);

// BANK
export const saveBankProfile = createAsyncThunk(
  "studentProfile/saveBank",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/bank", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Bank save failed");
    }
  }
);

// CATEGORY
export const saveCategoryProfile = createAsyncThunk(
  "studentProfile/saveCategory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/category", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Category save failed");
    }
  }
);

// OTHER
export const saveOtherProfile = createAsyncThunk(
  "studentProfile/saveOther",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/other", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Other save failed");
    }
  }
);

/* ================= FETCH PROFILE ================= */

export const fetchStudentProfile = createAsyncThunk(
  "studentProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/student/profile");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

/* ================= SLICE ================= */

const studentSlice = createSlice({
  name: "studentProfile",
  initialState: {
    personal: null,
    family: null,
    bank: null,
    category: null,
    completedStep: 0,
    other: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetStudentProfile: (state) => {
      state.personal = null;
      state.family = null;
      state.bank = null;
      state.category = null;
      state.completedStep = 0;
      state.other = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // SAVE PERSONAL
      .addCase(savePersonalProfile.pending, pending)
      .addCase(savePersonalProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.personal = action.payload;
      })
      .addCase(savePersonalProfile.rejected, rejected)

      // SAVE FAMILY
      .addCase(saveFamilyProfile.pending, pending)
      .addCase(saveFamilyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.family = action.payload;
      })
      .addCase(saveFamilyProfile.rejected, rejected)

      // SAVE BANK
      .addCase(saveBankProfile.pending, pending)
      .addCase(saveBankProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.bank = action.payload;
      })
      .addCase(saveBankProfile.rejected, rejected)

      // SAVE CATEGORY
      .addCase(saveCategoryProfile.pending, pending)
      .addCase(saveCategoryProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(saveCategoryProfile.rejected, rejected)

      // SAVE OTHER
      .addCase(saveOtherProfile.pending, pending)
      .addCase(saveOtherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.other = action.payload;
      })
      .addCase(saveOtherProfile.rejected, rejected)

      // FETCH PROFILE
      .addCase(fetchStudentProfile.pending, pending)
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;

       const p = action.payload.profile;

        state.completedStep = p.completedStep;

        state.personal = {
          fullName: p.fullName,
          gender: p.gender,
          dob: p.dob,
          alternateEmail: p.alternateEmail,
          alternatePhone: p.alternatePhone,
        };

        state.family = {
          fatherName: p.fatherName,
          motherName: p.motherName,
          familyIncome: p.familyIncome,
        };

        state.bank = {
          bankName: p.bankName,
          accountNumber: p.accountNumber,
          ifsc: p.ifsc,
        };

        state.category = {
          category: p.category,
          caste: p.caste,
          quota: p.quota,
        };

        state.other = {
          nationality: p.nationality,
          religion: p.religion,
          disability: p.disability,
        };
      })
      .addCase(fetchStudentProfile.rejected, rejected);
  },
});

export const { resetStudentProfile } = studentSlice.actions;
export default studentSlice.reducer;
