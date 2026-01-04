import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// PERSONAL
export const savePersonalProfile = createAsyncThunk(
  "studentProfile/savePersonal",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/student/personal", data); // Ensure correct API endpoint
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save personal info");
    }
  }
);

// FAMILY
export const saveFamilyProfile = createAsyncThunk(
  "studentProfile/saveFamily",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/student/family", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save family info");
    }
  }
);

// BANK
export const saveBankProfile = createAsyncThunk(
  "studentProfile/saveBank",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/student/bank", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save bank info");
    }
  }
);

// CATEGORY
export const saveCategoryProfile = createAsyncThunk(
  "studentProfile/saveCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/student/category", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save category info");
    }
  }
);

// OTHER
export const saveOtherProfile = createAsyncThunk(
  "studentProfile/saveOther",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/student/other", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save other info");
    }
  }
);

const studentSlice = createSlice({
  name: "studentProfile",
  initialState: {
    personal: null,
    family: null,
    bank: null,
    category: null,
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
      state.other = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    };

    builder
      // PERSONAL
      .addCase(savePersonalProfile.pending, setPending)
      .addCase(savePersonalProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.personal = action.payload;
      })
      .addCase(savePersonalProfile.rejected, setRejected)

      // FAMILY
      .addCase(saveFamilyProfile.pending, setPending)
      .addCase(saveFamilyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.family = action.payload;
      })
      .addCase(saveFamilyProfile.rejected, setRejected)

      // BANK
      .addCase(saveBankProfile.pending, setPending)
      .addCase(saveBankProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.bank = action.payload;
      })
      .addCase(saveBankProfile.rejected, setRejected)

      // CATEGORY
      .addCase(saveCategoryProfile.pending, setPending)
      .addCase(saveCategoryProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(saveCategoryProfile.rejected, setRejected)

      // OTHER
      .addCase(saveOtherProfile.pending, setPending)
      .addCase(saveOtherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.other = action.payload;
      })
      .addCase(saveOtherProfile.rejected, setRejected);
  },
});

export const { resetStudentProfile } = studentSlice.actions;
export default studentSlice.reducer;
