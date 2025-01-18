import React from "react";
import Layout from "../../../components/LayoutPages/Layout";
import Dashboard from "../../../components/Admin/Home/Dashboard/Dashboard";
import "./InstructorHome.css";

function AdminHome() {
  return (
    <Layout>
        <Dashboard />
    </Layout>
  );
}

export default AdminHome;
