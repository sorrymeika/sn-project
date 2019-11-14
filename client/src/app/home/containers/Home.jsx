import React from "react";
import { Button } from "antd";
import { NCMain, NCBreadcrumb, NCCard, NCToolbar } from "nuclear";

import ProjectList from "../components/ProjectList";
import { inject } from "snowball/app";

function Home({ onToGit }) {
    return (
        <NCMain>
            <NCBreadcrumb items={['项目管理']}></NCBreadcrumb>
            <NCCard>
                <NCToolbar>
                    <Button
                        className="mr_l"
                        onClick={onToGit}
                    >GIT管理</Button>
                </NCToolbar>
                <ProjectList></ProjectList>
            </NCCard>
        </NCMain>
    );
}

export default inject(({ homeService }) => {
    return {
        onToGit: homeService.onToGit.emit
    };
})(Home);
