module.exports = app => {
    const { router, controller } = app;

    router.post('/project/getProjects', controller.project.getProjects);
};