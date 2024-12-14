import React from "react";
import "./InputFieldForm.css";

export default function InputFieldForm({ label, type, placeholder, required }) {
    return (
        <label className="input-form">
            {label}
            <input type={type} placeholder={placeholder} required={required} />
        </label>
    );
}