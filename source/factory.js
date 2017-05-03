const dotProp = require("dot-prop");
const {
    getStorageVehicle
} = require("./storage.js");

function createStore(packageName, storageOverride) {
    const storage = storageOverride || getStorageVehicle(packageName);
    let store = storage.read();
    return {

        get raw() {
            return store;
        },

        set raw(newStoreObj) {
            store = newStoreObj;
        },

        get(name) {
            return dotProp.get(store, name);
        },

        set(name, value) {
            dotProp.set(store, name, value);
        },

        save() {
            storage.write(store);
        }

    };
}

module.exports = {
    createStore
};
