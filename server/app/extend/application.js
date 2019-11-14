const { createBuilder } = require('../shared/builder');
const BUILDER = Symbol('Application#builder');

module.exports = {
    getBuilder(project) {
        const builder = this[BUILDER] || (this[BUILDER] = {});
        const buildingProj = builder[project.path] || (builder[project.path] = {});

        if (buildingProj.instance) {
            return buildingProj.instance;
        } else {
            return buildingProj.instance = createBuilder(project, this);
        }
    },
};