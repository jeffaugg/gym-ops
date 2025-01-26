import React, { useEffect, useState } from "react";
import "./PresencePage.css";
import Layout from "../../components/LayoutPages/Layout";
import PresenceForm from "../../components/PresenceForm/PresenceForm";

function PresencePage() {
    return (
        <Layout>
            <div className="assessments-content">
                <header className="assessments-header">
                    <h1>Presenças</h1>
                </header>

                <PresenceForm />

            </div>
        </Layout>
    );
}

export default PresencePage;
