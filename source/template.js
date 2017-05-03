const deepmerge = require("deepmerge");

function templateObject(obj, template = {}) {
    return deepmerge(
        template,
        obj
    );
}

module.exports = {
    templateObject
};
