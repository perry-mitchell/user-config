const path = require("path");
const sinon = require("sinon");
const { expect } = require("chai");

const SOURCE = path.resolve(__dirname, "../../source");

Object.assign(
    global,
    {
        SOURCE,
        sinon,
        expect
    }
);
