const isTrue = (obj,condiciones,alias) => {
  let x = "var "+alias+"= obj;";
  let r = eval(x+condiciones);
  return r;
};

module.exports = isTrue;
