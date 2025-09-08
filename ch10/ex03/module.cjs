exports.foo = function () {
  return "Function from module.cjs";
};

exports.Bar = class {
  baz() {
    return "Class method from module.cjs";
  }
};
