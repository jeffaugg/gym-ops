import React from "react";
import "./InputFieldForm.css";

export default function InputFieldForm({ type, id, placeholder, label, value, onChange }) {
    return (
        <label className="input-form">
            {label}
            <input 
            type={type} 
            id={id} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            required
          />
        </label>
    );
}