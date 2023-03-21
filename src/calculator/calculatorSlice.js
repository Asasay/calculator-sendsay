import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "constructor",
  isDragging: "false",
  filling: [],
  value: 0,
  //status: "idle",
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "constructor" ? "runtime" : "constructor";
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, toggleMode } =
  calculatorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFilling = (state) => state.calculator.filling;
export const selectMode = (state) => state.calculator.mode;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

/* export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
}; */

export default calculatorSlice.reducer;
