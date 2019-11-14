const { Controller } = require("egg");

class ProjectController extends Controller {
    async getGits() {
        const { ctx } = this;
        const gits = await ctx.service.project.getGits();

        ctx.body = {
            success: true,
            data: gits
        };
    }

    async createGit() {
        const { ctx } = this;
        const payloadRule = {
            name: { type: 'string', required: true },
            gitUrl: { type: 'string', required: true },
            rootPath: { type: 'string', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.project.createGit(ctx.request.body);

        ctx.body = {
            success: true,
            data: res
        };
    }

    async getProjects() {
        const { ctx } = this;
        const projects = await ctx.service.project.getProjects();

        ctx.body = {
            success: true,
            data: projects
        };
    }

    async buildProject() {
        const { ctx } = this;

        const payloadRule = {
            projectId: { type: 'number', required: false },
        };
        ctx.validate(payloadRule);

        await ctx.service.project.buildProject(ctx.request.body.projectId);

        ctx.body = {
            success: true,
        };
    }

    async getBuildingInfo() {
        const { ctx } = this;

        const payloadRule = {
            projectId: { type: 'number', required: false },
        };
        ctx.validate(payloadRule);

        const data = await ctx.service.project.getBuildingInfo(ctx.request.body.projectId);

        ctx.body = {
            success: true,
            data
        };
    }
}

module.exports = ProjectController;
