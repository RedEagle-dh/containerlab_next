import React from "react";
import IssuesCard from "../components/cards/IssuesCard";
import DevicesCard from "../components/cards/DevicesWithAlertsCard";
import AlertSummaryCard from "../components/cards/AlertSummaryCard";
import NetworkCard from "../components/cards/NetworkCard";

const DashboardPage = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="px-20 py-4 overflow-auto">
                <div className="flex gap-4 mt-4">
                    <NetworkCard />
                    <IssuesCard />
                    <DevicesCard />

                </div>
                <div className="flex gap-4 mt-4">

                    <AlertSummaryCard />
                </div>
            </div>
        </div>
    )
}


export default DashboardPage;