import { configuration } from "snowball/app";
import ProjectApiService from "./services/ProjectApiService";

export const AppConfiguration = configuration({
    modules: {
        projectApiService: ProjectApiService
    }
});