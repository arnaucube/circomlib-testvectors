const chai = require("chai");

const Fr = require("ffjavascript").bn128.Fr;

const smt = require("circomlib").smt;

const assert = chai.assert;

describe("SMT javascript testvectors", function () {
    this.timeout(100000);
    before( async () => {
    });

    it("Should insert 2 elements and empty them", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Fr.e(1);
        let v = Fr.e(2);
        await tree.insert(k,v);
        console.log(tree.root);

        k = Fr.e(33);
        v = Fr.e(44);
        await tree.insert(k,v);
        console.log(tree.root);

        k = Fr.e(1234);
        v = Fr.e(9876);
        await tree.insert(k,v);
        console.log(tree.root);

        await tree.delete(Fr.e(33));
        console.log(tree.root);

        await tree.delete(Fr.e(1234));
        await tree.delete(Fr.e(1));
        console.log(tree.root);

        assert(Fr.isZero(tree.root));
    });
    it("TestDelete3", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Fr.e(1);
        let v = Fr.e(1);
        await tree.insert(k,v);

        k = Fr.e(2);
        v = Fr.e(2);
        await tree.insert(k,v);
        console.log(tree.root);

        console.log("TestDelete3", tree.root);
        await tree.delete(Fr.e(1));
        console.log("TestDelete3", tree.root);
    });
    it("TestDelete4", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Fr.e(1);
        let v = Fr.e(1);
        await tree.insert(k,v);

        k = Fr.e(2);
        v = Fr.e(2);
        await tree.insert(k,v);
        console.log(tree.root);

        k = Fr.e(3);
        v = Fr.e(3);
        await tree.insert(k,v);
        console.log(tree.root);

        console.log("TestDelete4", tree.root);
        await tree.delete(Fr.e(1));
        console.log("TestDelete4", tree.root);
    });
    it("TestDelete5", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        let k = Fr.e(1);
        let v = Fr.e(2);
        await tree.insert(k,v);

        k = Fr.e(33);
        v = Fr.e(44);
        await tree.insert(k,v);
        console.log(tree.root);


        console.log("TestDelete5", tree.root);
        await tree.delete(Fr.e(1));
        console.log("TestDelete5", tree.root);
    });

    it("TestAddAndGetCircomProof", async () => {
        const tree = await smt.newMemEmptyTrie();

        let key = Fr.e(1);
        let value = Fr.e(2);

        let res = await tree.insert(key,value);
        res = fixRes(res);
        console.log(res);

        key = Fr.e(33);
        value = Fr.e(44);
        res = await tree.insert(key,value);
        res = fixRes(res);
        console.log(res);

        key = Fr.e(55);
        value = Fr.e(66);
        res = await tree.insert(key,value);
        res = fixRes(res);
        console.log(res);
    });

    it("TestUpdateAndCircomProcessorProof", async () => {
        const tree = await smt.newMemEmptyTrie();
        console.log(tree);

        for (let i=0; i<16; i++) {
            let k = Fr.e(i);
            let v = Fr.e(i*2);
            await tree.insert(k,v);
        }
        console.log(tree.root);
        k = Fr.e(10);
        v = Fr.e(1024);
        let res = await tree.update(k, v)
        console.log(res);

    });
})

function fixRes(res) {
    while (res.siblings.length<10) res.siblings.push(Fr.e(0));
    res.oldKey = res.isOld0 ? 0 : res.oldKey;
    res.oldValue = res.isOld0 ? 0 : res.oldValue;
    res.isOld0 = res.isOld0 ? 1 : 0;
    return res;
}
