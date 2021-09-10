import React from "react";
import "./InputOptions.css";
function InputOptions({ Icon, title, color, onClick }) {
  return (
    <div className="inputOption" onClick={onClick}>
      {Icon && <Icon className="inputOption__icon" style={{ color: color }} />}
      <h4 style={{ color: color, fontWeight: "600" }}>{title}</h4>
    </div>
  );
}

export default InputOptions;
