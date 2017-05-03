const path = require("path");
const fs = require("graceful-fs");
const isNode = require("detect-node");
const writeFileAtomic = require("write-file-atomic");
const xdgBaseDir = require("xdg-basedir");
const {
    normalisePackageName
} = require("./format.js");

const FILE_WRITE_OPS = { /* user only (no group/other) */ mode: 0o600 };

function getLocalStorage() {
    return window.localStorage;
}

function getStoragePath(name) {
    if (isNode) {
        return path.resolve(xdgBaseDir.config, `./${name}`);
    }
    return name;
}

function getStorageVehicle(packageName) {
    const name = normalisePackageName(packageName);
    const storagePath = getStoragePath(name);
    return {

        read() {
            if (isNode) {
                try {
                    const readData = fs.readFileSync(storagePath, "utf8");
                    return JSON.parse(readData);
                } catch (err) {
                    if (err.code === "EACCES") {
                        throw new Error(`Error accessing file for reading: ${storagePath}`);
                    }
                    if (err.code === "ENOENT" || err.name === "SyntaxError") {
                        // JSON parsing error
                        writeFileAtomic.sync(
                            storagePath,
                            JSON.stringify({}),
                            FILE_WRITE_OPS
                        );
				        return {};
                    }
                    throw err;
                }
            }
            try {
                const storedRaw = getLocalStorage().getItem(storagePath);
                return JSON.parse(storedRaw);
            } catch (err) {
                if (err.name === "SyntaxError") {
                    getLocalStorage().setItem(storagePath, JSON.stringify({}));
                    return {};
                }
                throw err;
            }
        },

        write(data) {
            if (isNode) {
                writeFileAtomic.sync(
                    storagePath,
                    JSON.stringify(data),
                    FILE_WRITE_OPS
                );
                return;
            }
            getLocalStorage().setItem(storagePath, JSON.stringify(data));
        }

    };
}

module.exports = {
    getStorageVehicle
};
