import { configuration } from "snowball/app";
import { Server } from 'sn-cornerstone';

import ProjectApiService from "./services/ProjectApiService";

export const AppConfiguration = configuration({
    modules: {
        projectApiService: ProjectApiService,
        server: () => new Server({
            baseUrl: '/server'
        }),
        watcherServer: () => new Server({
            baseUrl: '/watcher'
        })
    }
});