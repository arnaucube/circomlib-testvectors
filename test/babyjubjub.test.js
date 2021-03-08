const chai = require("chai");

const Scalar = require("ffjavascript").Scalar;
const utils = require("ffjavascript").utils;

// const babyjub = require("../../iden3/circomlib/src/babyjub.js");
const eddsa = require("circomlib").eddsa;
const babyjub = require("circomlib").babyJub;

const assert = chai.assert;

describe("BabyJubJub EDDSA javascript testvectors", function () {
    it("BabyJubJub Keys test", async () => {
	let sk = Buffer.from("0001020304050607080900010203040506070809000102030405060708090001", "hex");
	let pk = eddsa.prv2pub(sk);
	assert.equal(pk.toString("hex"), "13277427435165878497778222415993513565335242147425444199013288855685581939618,13622229784656158136036771217484571176836296686641868549125388198837476602820");
        assert.equal(pk[0].toString(),
            "13277427435165878497778222415993513565335242147425444199013288855685581939618");
        assert.equal(pk[1].toString(),
            "13622229784656158136036771217484571176836296686641868549125388198837476602820");

	const msgBuf = Buffer.from("00010203040506070809", "hex");
	const msg = utils.leBuff2int(msgBuf);

        const signature = eddsa.signPoseidon(sk, msg);
        assert.equal(signature.R8[0].toString(),
            "11384336176656855268977457483345535180380036354188103142384839473266348197733");
        assert.equal(signature.R8[1].toString(),
            "15383486972088797283337779941324724402501462225528836549661220478783371668959");
        assert.equal(signature.S.toString(),
            "1672775540645840396591609181675628451599263765380031905495115170613215233181");

        const pkPacked = babyjub.packPoint(pk);
	assert.equal(pkPacked.toString("hex"), "c433f7a696b7aa3a5224efb3993baf0ccd9e92eecee0c29a3f6c8208a9e81d9e");
    });
});
