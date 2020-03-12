module.exports = app => {
    const { router, controller } = app;

    router.post('/restart', controller.project.restart);
};