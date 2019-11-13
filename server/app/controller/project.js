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
}

module.exports = ProjectController;
