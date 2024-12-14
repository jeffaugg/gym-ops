import React from "react";
import "./Icon.css";

function Icon({ name }) {
  return <i className={`icon-${name}`}></i>;
}

export default Icon;
