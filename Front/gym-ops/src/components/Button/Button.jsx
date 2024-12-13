import React from "react";
import "./Button.css";

// export default function Button({type, onClick, children}) {
//   return (
//     <button type={type} onClick={onClick} className="button">
//       {children}
//     </button>
//   );
// }

export default function Button({type, children}) {
    return (
      <button type={type} className="button">
        {children}
      </button>
    );
  }