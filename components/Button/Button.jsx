import React from "react";
import Style from "./Button.module.css";
const Button = ({btnName,handleClick,classStyles}) => {
  return(
    <button
      type="button"
      className={Style.button}
      onClick={handleClick}
    >
      {btnName}
    </button>
  )
};

export default Button;
