import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import "./AdminPlans.css";
import Layout from "../../../components/LayoutPages/Layout";
import PlansForm from "../../../components/Admin/PlansForm/PlansForm";
import PlansTable from "../../../components/Admin/PlansTable/PlansTable";

function AdminPlans() {
  return (

    <Layout>
      <div className="plans-content">
        <header className="plans-header">
          <h1>Planos</h1>
        </header>
        <PlansForm />
        <PlansTable />
      </div>
    </Layout >
  );
}

export default AdminPlans;
