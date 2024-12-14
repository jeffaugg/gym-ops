// import React from "react";
// import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
// import "./AdminWarnings.css";

// function AdminWarnings() {
//   return (
//     <div className="warnings">
//       <Sidebar />
//     </div>
//   );
// }

// export default AdminWarnings;

import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./AdminWarnings.css";
import WarningForm from "../../../components/Admin/WarningForm/WarningForm";
import WarningTable from "../../../components/Admin/WarningTable/WarningTable";

function AdminWarnings() {
  return (
    <div className="warnings">
      <Sidebar />
      <div className="mensagens-page">
        <header className="mensagens-header">
          <h1>Escreva uma mensagem</h1>
        </header>

          <form>
            <WarningForm />
          </form>

          <WarningTable />
      </div>
    </div>

  );
}

export default AdminWarnings;