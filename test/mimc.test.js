const chai = require("chai");

const Scalar = require("ffjavascript").Scalar;

const mimc = require("circomlib").mimc7;

const assert = chai.assert;

const SEED = "mimc";

function testvector(method, x, k) {
    console.log(method);
    console.log("input:", x, k);
    console.log("output:", method(x, k));
}

describe("MiMC7 javascript testvectors", function () {
    this.timeout(100000);
    before( async () => {
    });
    it("MiMC7 Constants", async () => {
        let cts = mimc.getConstants(SEED, 91);
        console.log(cts[1]);
    });
    it("MiMC7", async () => {
        testvector(mimc.hash, 1, 2);
        testvector(mimc.multiHash,[Scalar.e(1), Scalar.e(2), Scalar.e(3)], Scalar.e(0));
        testvector(mimc.hash, 12, 45);
    });

});
