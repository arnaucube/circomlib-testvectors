const chai = require("chai");

const Scalar = require("ffjavascript").Scalar;

const mimc = require("../../iden3/circomlib/src/mimc7.js");

const assert = chai.assert;

const SEED = "mimc";

describe("MiMC7 javascript testvectors", function () {
    this.timeout(100000);
    before( async () => {
    });
    it("MiMC7 Constants", async () => {
        let cts = mimc.getConstants(SEED, 91);
        console.log(cts[1]);
    });
    it("MiMC7", async () => {
        let res = mimc.hash(1, 2, 91);
        console.log("mimc.hash(1,2,91)", res);

        res = mimc.multiHash([Scalar.e(1), Scalar.e(2), Scalar.e(3)], Scalar.e(0));
        console.log("mimc.multiHash([1,2,3], 0)", res);

        res = mimc.hash(12, 45, 91);
        console.log("mimc.hash(12,45,91)", res);
    });

});
