const {
    normalisePackageName
} = require(`${SOURCE}/format.js`);

describe("normalisePackageName", function() {

    it("normalises complex names", function() {
        const normalised = normalisePackageName("my complex App!");
        expect(normalised).to.contain("my_complex_App_");
    });

});