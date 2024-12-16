// import React from "react";
// import "./InputFieldForm.css";

// export default function InputFieldForm({ type, id, placeholder, label, value, onChange }) {
//     return (
//         <label className="input-form">
//             {label}
//             <input 
//             type={type} 
//             id={id} 
//             placeholder={placeholder} 
//             value={value} 
//             onChange={onChange} 
//             required
//           />
//         </label>
//     );
// }

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
  mask 
}) {
  return (
    <label className="input-form">
      {label}
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
    </label>
  );
}
