const NORMALISED_NAME_PREFIX = "usrconfig_";

function normalisePackageName(name) {
    const normalised = name
        .split("")
        .map(char =>
            /^[a-z0-9_]$/i.test(char) ?
                char :
                "_"
        )
        .join("");
    return `${NORMALISED_NAME_PREFIX}${normalised}`;
}

module.exports = {
    normalisePackageName
};
