import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

interface ValueType{
  value: number;
}

const initialState: ValueType={
  value: 0,
}

const uuidSlice = createSlice({
  name:'uuid',
  initialState,
  reducers:{
    setUid(state, action: PayloadAction<number>)
    {
      state.value = action.payload;
    }
  }
})

export const { setUid } = uuidSlice.actions;
export default uuidSlice.reducer;