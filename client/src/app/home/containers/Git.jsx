import React from "react";
import { NCMain, NCBreadcrumb, NCCard } from "nuclear";
import GitList from "../components/GitList";

export default function Git() {
    return (
        <NCMain>
            <NCBreadcrumb items={['Git管理']}></NCBreadcrumb>
            <NCCard>
                <GitList />
            </NCCard>
        </NCMain>
    );
}
