import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* ================= COMMON HANDLER ================= */

const handleApiError = (err, fallback) =>
  err?.response?.data?.message || fallback;

/* ================= SAVE THUNKS ================= */

// PERSONAL
export const savePersonalProfile = createAsyncThunk(
  "studentProfile/savePersonal",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/personal", data);
      return res.data?.profile || res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Personal save failed"));
    }
  }
);

// FAMILY
export const saveFamilyProfile = createAsyncThunk(
  "studentProfile/saveFamily",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/family", data);
      return res.data?.profile || res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Family save failed"));
    }
  }
);

// BANK
export const saveBankProfile = createAsyncThunk(
  "studentProfile/saveBank",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/bank", data);
      return res.data?.profile || res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Bank save failed"));
    }
  }
);

// CATEGORY
export const saveCategoryProfile = createAsyncThunk(
  "studentProfile/saveCategory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/category", data);
      return res.data?.profile || res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Category save failed"));
    }
  }
);

// OTHER
export const saveOtherProfile = createAsyncThunk(
  "studentProfile/saveOther",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/student/profile/other", data);
      return res.data?.profile || res.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Other save failed"));
    }
  }
);

/* ================= FETCH PROFILE ================= */

export const fetchStudentProfile = createAsyncThunk(
  "studentProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/student/profile");
      return res.data?.profile;
    } catch (err) {
      return rejectWithValue(handleApiError(err, "Failed to fetch profile"));
    }
  }
);

/* ================= SLICE ================= */

const initialState = {
  personal: null,
  family: null,
  bank: null,
  category: null,
  other: null,
  completedStep: 0,
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "studentProfile",
  initialState,
  reducers: {
    resetStudentProfile: () => initialState,
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

    const fulfilledStep = (state, step) => {
      state.loading = false;
      state.completedStep = Math.max(state.completedStep, step);
    };

    builder
      /* ---------- SAVE PERSONAL ---------- */
      .addCase(savePersonalProfile.pending, pending)
      .addCase(savePersonalProfile.fulfilled, (state, action) => {
        state.personal = action.payload;
        fulfilledStep(state, 1);
      })
      .addCase(savePersonalProfile.rejected, rejected)

      /* ---------- SAVE FAMILY ---------- */
      .addCase(saveFamilyProfile.pending, pending)
      .addCase(saveFamilyProfile.fulfilled, (state, action) => {
        state.family = action.payload;
        fulfilledStep(state, 2);
      })
      .addCase(saveFamilyProfile.rejected, rejected)

      /* ---------- SAVE BANK ---------- */
      .addCase(saveBankProfile.pending, pending)
      .addCase(saveBankProfile.fulfilled, (state, action) => {
        state.bank = action.payload;
        fulfilledStep(state, 3);
      })
      .addCase(saveBankProfile.rejected, rejected)

      /* ---------- SAVE CATEGORY ---------- */
      .addCase(saveCategoryProfile.pending, pending)
      .addCase(saveCategoryProfile.fulfilled, (state, action) => {
        state.category = action.payload;
        fulfilledStep(state, 4);
      })
      .addCase(saveCategoryProfile.rejected, rejected)

      /* ---------- SAVE OTHER ---------- */
      .addCase(saveOtherProfile.pending, pending)
      .addCase(saveOtherProfile.fulfilled, (state, action) => {
        state.other = action.payload;
        fulfilledStep(state, 5);
      })
      .addCase(saveOtherProfile.rejected, rejected)

      /* ---------- FETCH PROFILE ---------- */
      .addCase(fetchStudentProfile.pending, pending)
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        const p = action.payload;
        if (!p) return;

        state.loading = false;
        state.completedStep = p.completedStep || 0;

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
