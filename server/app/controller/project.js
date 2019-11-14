const { Controller } = require("egg");

class ProjectController extends Controller {
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
