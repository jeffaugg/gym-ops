import React from "react";

import "./InputField.css";  

export default function InputField({ type, id, placeholder, label }) {
    return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <input type={type} id={id} placeholder={placeholder} />
        </div>
      );
    }