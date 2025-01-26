import React from "react";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import Dashboard from "../../../components/Admin/Home/Dashboard/Dashboard";
import "./AdminHome.css";

function AdminHome() {
  return (
    <Layout>
        <Dashboard />
    </Layout>
  );
}

export default AdminHome;
