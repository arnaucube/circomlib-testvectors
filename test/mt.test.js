const chai = require("chai");

const Scalar = require("ffjavascript").Scalar;

const smt = require("circomlib").smt;
// const smt = require("../../iden3/circomlib/src/smt.js");

const assert = chai.assert;

describe("SMT javascript testvectors", function () {
    this.timeout(100000);
    before( async () => {
    });

    it("Should insert 2 elements and empty them", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Scalar.e(1);
        let v = Scalar.e(2);
        await tree.insert(k,v);
        console.log("insert(1,2)", tree.root);

        k = Scalar.e(33);
        v = Scalar.e(44);
        await tree.insert(k,v);
        console.log("insert(33, 44)", tree.root);

        k = Scalar.e(1234);
        v = Scalar.e(9876);
        await tree.insert(k,v);
        console.log("insert(1234, 9876)", tree.root);

        await tree.delete(Scalar.e(33));
        console.log("delete(33)", tree.root);

        await tree.delete(Scalar.e(1234));
        await tree.delete(Scalar.e(1));
        console.log("delete(1234 & 1)", tree.root);

        assert(Scalar.isZero(tree.root));
    });
    it("TestDelete3", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Scalar.e(1);
        let v = Scalar.e(1);
        await tree.insert(k,v);

        k = Scalar.e(2);
        v = Scalar.e(2);
        await tree.insert(k,v);
        console.log("insert(2,2)", tree.root);

        console.log("TestDelete3", tree.root);
        await tree.delete(Scalar.e(1));
        console.log("TestDelete3", tree.root);
    });
    it("TestDelete4", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Scalar.e(1);
        let v = Scalar.e(1);
        await tree.insert(k,v);

        k = Scalar.e(2);
        v = Scalar.e(2);
        await tree.insert(k,v);
        console.log(tree.root);

        k = Scalar.e(3);
        v = Scalar.e(3);
        await tree.insert(k,v);
        console.log(tree.root);

        console.log("TestDelete4", tree.root);
        let res = await tree.delete(Scalar.e(1));
        console.log("TestDelete4 res", res);
        console.log("TestDelete4", tree.root);
    });
    it("TestDelete5", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Scalar.e(1);
        let v = Scalar.e(2);
        await tree.insert(k,v);

        k = Scalar.e(33);
        v = Scalar.e(44);
        await tree.insert(k,v);
        console.log(tree.root);


        console.log("TestDelete5", tree.root);
        await tree.delete(Scalar.e(1));
        console.log("TestDelete5", tree.root);
    });

    it("TestAddAndGetCircomProof", async () => {
        const tree = await smt.newMemEmptyTrie();

        let key = Scalar.e(1);
        let value = Scalar.e(2);

        let res = await tree.insert(key,value);
        res = fixRes(res);
        console.log(res);

        key = Scalar.e(33);
        value = Scalar.e(44);
        res = await tree.insert(key,value);
        res = fixRes(res);
        console.log(res);

        key = Scalar.e(55);
        value = Scalar.e(66);
        res = await tree.insert(key,value);
        res = fixRes(res);
        console.log(res);
    });

    it("TestUpdateAndCircomProcessorProof", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        for (let i=0; i<16; i++) {
            let k = Scalar.e(i);
            let v = Scalar.e(i*2);
            await tree.insert(k,v);
        }
        console.log(tree.root);
        k = Scalar.e(10);
        v = Scalar.e(1024);
        let res = await tree.update(k, v)
        console.log(res);

    });
})

function fixRes(res) {
    while (res.siblings.length<10) res.siblings.push(Scalar.e(0));
    res.oldKey = res.isOld0 ? 0 : res.oldKey;
    res.oldValue = res.isOld0 ? 0 : res.oldValue;
    res.isOld0 = res.isOld0 ? 1 : 0;
    return res;
}
