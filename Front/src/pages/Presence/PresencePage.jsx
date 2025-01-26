import React, { useState } from "react";
import "./PresencePage.css";
import Layout from "../../components/Instructor/LayoutPages/Layout";
import PresenceForm from "../../components/PresenceForm/PresenceForm";
import PresenceTable from "../../components/PresenceTable/PresenceTable";

function PresencePage() {
    const [reload, setReload] = useState(false);

    const handleRefresh = () => {
        setReload((prev) => !prev);
    };

    return (
        <Layout>
            <div className="assessments-content">
                <header className="assessments-header">
                    <h1>Frequência</h1>
                </header>

                <PresenceForm onPresenceCreated={handleRefresh} />
                <PresenceTable reload={reload} onPresenceDeleted={handleRefresh} />
            </div>
        </Layout>
    );
}

export default PresencePage;
