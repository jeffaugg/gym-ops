import React from "react";
import "./AdminPayments.css";
import Layout from "../../../components/LayoutPages/Layout";
import PayForm from "../../../components/PayForm/PayForm";
import PaymentsTable from "../../../components/Admin/PaymentsTable/PaymentsTable";

function AdminPayments() {
  return (
    <Layout>
        <div className="payments-content">
            <header className="payments-header">
              <h1>Pagamentos</h1>
            </header>
            <PayForm/>
            <PaymentsTable/>
          </div>
    </Layout>
  );
}

export default AdminPayments;
