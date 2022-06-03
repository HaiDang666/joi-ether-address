'use strict';

const assert = require("assert");
const Joi = require("joi");
const joiEthereumAddress = require("./");

describe("joi-ether-address", function () {
  it("exports a function", function (done) {
    assert.strictEqual("function", typeof joiEthereumAddress);
    done();
  });

  it("expects to receive a Joi module", function (done) {
    assert.throws(joiEthereumAddress, /must pass Joi/);
    done();
  });

  it("returns a validator function", function (done) {
    const fn = joiEthereumAddress(Joi);
    assert.strictEqual("function", typeof fn);
    done();
  });

  it("requires an ether address", function (done) {
    const oid = joiEthereumAddress(Joi);

    const tests = [
      { val: "0x1284214b9b9c85549ab3d2b972df0deef66ac2c9", pass: true },
      { val: "0x1284214b9b9c85549ab3d2b972df", pass: false },
      { val: "0x0000000000000000000000000000000000001000", pass: true },
      { val: "abcd56789012345678901234", pass: false },
    ];

    const schema = oid();

    tests.forEach(function (test) {
      const res = schema.validate(test.val);
      assert(test.pass === !res.error, res.error);
    });

    done();
  });

  it("expects to receive a default error message passing invalid value", function (done) {
    const etherJoi = joiEthereumAddress(Joi);
    const schema = etherJoi();
    const result = schema.validate("blah");

    assert(result.error);
    console.log(result.error.message);
    assert(result.error.message.indexOf("ethereum address") >= 0);
    done();
  });

  it("expects to receive a default error message passing array in message parameter", function (done) {
    const etherJoi = joiEthereumAddress(Joi, []);
    const schema = etherJoi();
    const result = schema.validate("blah");

    assert(result.error);
    assert(result.error.message.indexOf("ethereum address") >= 0);
    done();
  });

  it("expects to receive a default error message passing object in message parameter", function (done) {
    const etherJoi = joiEthereumAddress(Joi, {});
    const schema = etherJoi();
    const result = schema.validate("blah");

    assert(result.error);
    assert(result.error.message.indexOf("ethereum address") >= 0);
    done();
  });

  it("expects to receive a default error message passing number in message parameter", function (done) {
    const etherJoi = joiEthereumAddress(Joi, 123456);
    const schema = etherJoi();
    const result = schema.validate("blah");

    assert(result.error);
    assert(result.error.message.indexOf("ethereum address") >= 0);
    done();
  });

  it("includes custom error message for invalid value", function (done) {
    const etherJoi = joiEthereumAddress(Joi, null, "custom error message");
    const schema = etherJoi();
    const result = schema.validate("blah");

    assert(result.error);
    assert(result.error.message.indexOf("custom error message") >= 0);
    done();
  });
});
