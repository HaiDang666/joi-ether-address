'use strict';

var assert = require('assert');

module.exports = function joiEthereumAddress(Joi, name, errorMessage) {
  assert(Joi && Joi.object, "you must pass Joi as an argument");
  if (!name || !(typeof name === "string")) {
    name = "ethereum address";
  }
  if (!errorMessage || !(typeof errorMessage === "string")) {
    errorMessage = "must be a valid ethereum address";
  }
  return function ethereumAddress() {
    return Joi.string()
      .alphanum()
      .min(40)
      .max(42)
      .regex(/^0x[a-fA-F0-9]{40}$/, name)
      .error(new Error(errorMessage));
  };
};

