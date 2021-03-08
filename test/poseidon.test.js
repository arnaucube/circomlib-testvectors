const chai = require("chai");

const poseidon = require("circomlib").poseidon;

const assert = chai.assert;

function testvector(method, inputs) {
    console.log(method);
    console.log("input:", inputs);
    console.log("output:", method(inputs));
}

describe("Poseidon javascript testvectors", function () {
    this.timeout(100000);
    before( async () => {
    });
    it("Poseidon t=6", async () => {
        testvector(poseidon, [1]);
        testvector(poseidon, [1,2]);
        testvector(poseidon, [1,2,0,0,0]);
        testvector(poseidon, [1,2,0,0,0,0]);
        testvector(poseidon, [3,4,0,0,0,]);
        testvector(poseidon, [3,4,0,0,0,0]);
        testvector(poseidon, [1,2,3,4,5,6]);
    });

});
