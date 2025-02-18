import React, { useState } from "react";
import "./PresencePage.css";
import Layout from "../../components/Instructor/LayoutPages/Layout";
import PresenceForm from "../../components/PresenceForm/PresenceForm";
import PresenceTable from "../../components/PresenceTable/PresenceTable";

function PresencePage() {
    const [reload, setReload] = useState(false);
    const [filters, setFilters] = useState({
        searchTerm: "",
        sortBy: "data",
        sortOrder: "asc",
        itemsPerPage: 5,
    });

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
                <PresenceTable
                    reload={reload}
                    onPresenceDeleted={handleRefresh}
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>
        </Layout>
    );
}

export default PresencePage;
