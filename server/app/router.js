module.exports = app => {
    const { router, controller } = app;

    router.all('/', controller.test.home);

    router.post('/project/getProjects', controller.project.getProjects);
};