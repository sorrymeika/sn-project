import { configuration } from "snowball/app";
import ProjectListViewModel from "./view-models/ProjectListViewModel";
import ProjectLogViewModel from "./view-models/ProjectLogViewModel";
import projectModalViewModel from "./view-models/ProjectModalViewModel";

export const ProjectConfiguration = configuration({
    modules: {
        projectListViewModel: ProjectListViewModel,
        projectLogViewModel: ProjectLogViewModel,
        projectModalViewModel: projectModalViewModel
    }
});