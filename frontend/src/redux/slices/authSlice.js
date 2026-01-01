import {createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

export const register = createAsyncThunk(
    "auth/register",
    async (data,  { rejectWithValue }) =>{
        try {
            return await axios.post(`${api}/auth/register`, data);

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null
    },
    reducers :{

    },
    extraReducers:(builder) =>{
        builder
        .addCase(register.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) =>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default authSlice.reducer;