const isTrue = (obj,condiciones,alias) => {
  let x = "var "+alias+"= obj"
  eval(x);
  return eval(condiciones);
};

module.exports = isTrue;
