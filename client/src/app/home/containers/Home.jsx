import React from "react";
import { NCMain, NCBreadcrumb, NCCard } from "nuclear";
import ProjectList from "../components/ProjectList";

export default function Home() {
    return (
        <NCMain>
            <NCBreadcrumb items={['项目管理']}></NCBreadcrumb>
            <NCCard>
                <ProjectList></ProjectList>
            </NCCard>
        </NCMain>
    );
}
