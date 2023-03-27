import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "constructor",
  display: "",
  formula: "",
  evaluation: "",
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "constructor" ? "runtime" : "constructor";
    },
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
    setFormula: (state, action) => {
      state.formula = action.payload;
    },
    setEvaluation: (state, action) => {
      state.evaluation = action.payload;
    },
  },
});

export const { toggleMode, setDisplay, setFormula, setEvaluation } =
  calculatorSlice.actions;

export const selectDisplay = (state) => state.calculator.display;
export const selectFormula = (state) => state.calculator.formula;
export const selectEvaluation = (state) => state.calculator.evaluation;
export const selectMode = (state) => state.calculator.mode;

const isNumber = (str) =>
  str.length === str.trim().length && str.length > 0 && Number(str) >= 0;

export const calculate = (btnValue) => (dispatch, getState) => {
  const display = selectDisplay(getState());
  const evaluation = selectEvaluation(getState());
  const formula = selectFormula(getState());

  switch (btnValue) {
    case "=":
      if (formula.includes("=")) break;
      if (!/\d/.test(formula)) break;
      let cleanFormula = formula.replace(/\D+([+*/])/g, "$1");
      cleanFormula = cleanFormula.replace(/-*(-\d)/g, "$1");
      cleanFormula = cleanFormula.replace(/(?<![\.\d])0+([1-9]+)/g, "$1");
      const result = eval(cleanFormula).toString();
      dispatch(setDisplay(result.replace(".", ",")));
      dispatch(setFormula(cleanFormula + "=" + result));
      dispatch(setEvaluation(result));
      break;
    case "c":
      dispatch(setDisplay("0"));
      dispatch(setFormula(""));
      dispatch(setEvaluation(""));
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (evaluation !== "") {
        dispatch(setFormula(btnValue));
        dispatch(setDisplay(btnValue));
        dispatch(setEvaluation(""));
      } else if (isNumber(display.replace(",", ".")) && display !== "0") {
        dispatch(setDisplay(display + btnValue));
        dispatch(setFormula(formula + btnValue));
      } else {
        dispatch(setDisplay(btnValue));
        dispatch(setFormula(formula + btnValue));
      }

      break;
    case ",":
      if (isNumber(display.replace(",", "."))) {
        if (!/^-?(0|[1-9]\d*)$/.test(display.replace(",", "."))) break;
        dispatch(setDisplay(display + ","));
        dispatch(setFormula(formula + "."));
      } else {
        dispatch(setDisplay(display + "0,"));
        dispatch(setFormula(formula + "0."));
      }
      break;
    default:
      if (evaluation !== "") {
        dispatch(setDisplay(btnValue));
        dispatch(setFormula(evaluation + btnValue));
        dispatch(setEvaluation(""));
      } else {
        dispatch(setFormula(formula.replace(/\D+([+*/])/g, "$1") + btnValue));
        dispatch(setDisplay(btnValue));
      }
  }
};

export default calculatorSlice.reducer;
