import React from "react";
import Layout from "../../../components/Instructor/LayoutPages/Layout";
import Dashboard from "../../../components/Instructor/Home/Dashboard/Dashboard";
import "./InstructorHome.css";

function InstructorHome() {
  return (
    <Layout>
        <Dashboard />
    </Layout>
  );
}

export default InstructorHome;
