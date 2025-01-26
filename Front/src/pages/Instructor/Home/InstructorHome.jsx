import React from "react";
import Layout from "../../../components/Instructors/LayoutPages/Layout";
import Dashboard from "../../../components/Instructors/Home/Dashboard/Dashboard";
import "./InstructorHome.css";

function AdminHome() {
  return (
    <Layout>
        <Dashboard />
    </Layout>
  );
}

export default AdminHome;
