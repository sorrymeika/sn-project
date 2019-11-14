module.exports = app => {
    const { router, controller } = app;

    router.all('/', controller.test.home);

    router.post('/project/getGits', controller.project.getGits);
    router.post('/project/createGit', controller.project.createGit);

    router.post('/project/getProjects', controller.project.getProjects);
    router.post('/project/buildProject', controller.project.buildProject);
    router.post('/project/getBuildingInfo', controller.project.getBuildingInfo);
};