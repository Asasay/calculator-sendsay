import React from "react";
import styles from "./Slider.module.scss";
import eye from "../../images/eye.svg";

function Slider(props) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={props.className}>
      <div className={styles.switchButton}>
        <input
          className={styles.switchButtonCheckbox}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        ></input>
        <label className={styles.switchButtonLabel} for="">
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
