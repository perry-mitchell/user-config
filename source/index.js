const {
    createStore
} = require("./factory.js");
const {
    templateObject
} = require("./template.js");

function createUserConfig(packageName, template = {}) {
    const store = createStore(packageName);
    store.raw = templateObject(store.raw, template);
    return store;
}

module.exports = createUserConfig;
