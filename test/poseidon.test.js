const chai = require("chai");

const poseidon = require("../../iden3/circomlib/src/poseidon.js");

const assert = chai.assert;

describe("Poseidon javascript testvectors", function () {
    this.timeout(100000);
    before( async () => {
    });
    it("Poseidon t=6", async () => {
        let res = poseidon([1]);
        console.log(res);

        res = poseidon([1,2]);
        console.log(res);

        res = poseidon([1,2, 0, 0, 0]);
        console.log(res);

        res = poseidon([1,2, 0, 0, 0, 0]);
        console.log(res);

        res = poseidon([3,4, 0, 0, 0]);
        console.log(res);
        res = poseidon([3,4, 0, 0, 0, 0]);
        console.log(res);

        res = poseidon([1,2,3,4,5,6]);
        console.log(res);

    });

});
