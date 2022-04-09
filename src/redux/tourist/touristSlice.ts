import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import Tourist from "../../model/Tourist";
import apiClient from "../../utils/apiClient";

export interface TouristState {
    touristList: object | any;
    detailTourist: object | any;
}

const initialState: TouristState = {
    touristList: {},
    detailTourist: {}
};

interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}

//Get All tourists
export const getTourists = createAsyncThunk<
    Tourist,
    { pageNum: number, setIsLoading: Dispatch<SetStateAction<any>> },
    {
        rejectValue: ValidationErrors
    }
>('tourist/getTourists', async ({ pageNum, setIsLoading }, { rejectWithValue }) => {
    setIsLoading(true)
    try {
        setIsLoading(false)
        const response = await apiClient().get(`api/Tourist?page=${pageNum}`)
        return response.data
    } catch (err) {
        setIsLoading(false)
        let error: AxiosError<ValidationErrors> | any = err // cast the error for access
        if (!error.response) {
            throw err
        }
        return rejectWithValue(error.response.data)
    }
})

//Get Specific tourist
export const getTouristById = createAsyncThunk<
    Tourist,
    { id: string | any },
    {
        rejectValue: ValidationErrors
    }
>('tourist/getTouristById', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await apiClient().get(`api/Tourist/${id}`)
        return response.data
    } catch (err) {

        let error: AxiosError<ValidationErrors> | any = err // cast the error for access
        if (!error.response) {
            throw err
        }
        return rejectWithValue(error.response.data)
    }
})

export const touristSlice = createSlice({
    name: "tourist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTourists.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.touristList = payload
        })
        builder.addCase(getTourists.rejected, (state, { payload }: PayloadAction<any>) => {
            state.touristList = {}
        })
        builder.addCase(getTouristById.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.detailTourist = payload
        })
        builder.addCase(getTouristById.rejected, (state, { payload }: PayloadAction<any>) => {
            state.detailTourist = {}
        })
    },
});

export default touristSlice.reducer;