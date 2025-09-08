exports.fooRenamed = function () {
  return "Function from module.cjs";
};

exports.BarRenamed = class {
  bazRenamed() {
    return "Class method from module.cjs";
  }
};
