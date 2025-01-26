import React from "react";
import InputMask from "react-input-mask";
import "./InputFieldForm.css";

export default function InputFieldForm({ 
  type, 
  id, 
  placeholder, 
  label, 
  value, 
  onChange, 
  mask,
  title,
  required = true 
}) {
  return (
    <label className="input-form" title={title}>
      {label}
      {mask ? (
        <InputMask 
          mask={mask} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
        >
          {(inputProps) => (
            <input 
              {...inputProps} 
              type={type} 
              id={id} 
              required={required} 
            />
          )}
        </InputMask>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required} 
          title={title}
        />
      )}
    </label>
  );
}
