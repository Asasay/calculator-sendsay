import React from "react";
import styles from "./Slider.module.scss";
import eye from "../../images/eye.svg";
import { toggleMode, selectMode } from "../../calculator/calculatorSlice";
import { useDispatch, useSelector } from "react-redux";

function Slider(props) {
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(toggleMode());
  };

  return (
    <div className={props.className}>
      <div className={styles.switchButton}>
        <input
          className={styles.switchButtonCheckbox}
          type="checkbox"
          checked={mode === "constructor"}
          onChange={handleChange}
        ></input>
        <label className={styles.switchButtonLabel} htmlFor="">
          <span className={styles.switchButtonLabelSpan}>
            <img src={eye} alt="slider icon" />
            Runtime
          </span>
        </label>
      </div>
    </div>
  );
}

export default Slider;
