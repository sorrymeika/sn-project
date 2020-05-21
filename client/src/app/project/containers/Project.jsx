import React from "react";
import { Button } from "antd";
import { NCMain, NCBreadcrumb, NCCard, NCToolbar } from "nuclear";

import ProjectList from "../components/ProjectList";
import { inject, autowired } from "snowball/app";

function Home({ onToEdit }) {
    return (
        <NCMain>
            <NCBreadcrumb items={['项目管理']}></NCBreadcrumb>
            <NCCard>
                <NCToolbar>
                    <Button
                        className="mr_l"
                        onClick={() => onToEdit()}
                    >新增项目</Button>
                </NCToolbar>
                <ProjectList></ProjectList>
            </NCCard>
        </NCMain>
    );
}

export default inject(() => {
    const projectListViewModel = autowired('projectListViewModel');
    return {
        onToEdit: projectListViewModel.onToEdit
    };
})(Home);
