import React from "react";
import InputMask from "react-input-mask";
import "./InputField.css";

export default function InputField({
  type,
  id,
  placeholder,
  label,
  value,
  onChange,
  mask
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {mask ? (
        <InputMask
          mask={mask}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        >
          {(inputProps) => <input {...inputProps} type={type} id={id} required />}
        </InputMask>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
}
