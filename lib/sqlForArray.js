const queryString = require("./queryString");
const isTrue = require("./isTrue");

const sqlForArray = (sql,Array_1) => {
  var driver = {};
  driver.tabla = Array_1;
  driver.response = [];
  let query = queryString(sql);
  let propiedades = Object.getOwnPropertyNames(Array_1[0]);
  if (query.select[0] == "*") {
    query.select = propiedades.map(o=>query.alias+"."+o);
  };
  console.log(query.condiciones);
  for (var i = 0; i < Array_1.length; i++) {
    var json = [];
    if(isTrue(driver.tabla[i], query.condiciones, query.alias)){
      for (var _n = 0; _n < query.select.length; _n++){
        eval("var "+query.alias+"=Array_1[i]")
        json[_n] = '"'+query.select[_n]+'":'+JSON.stringify(eval(""+query.select[_n]));
      };
      driver.response.push( JSON.parse('{'+json.join(',')+'}'));
    };
  };
  return driver.response;
};

module.export = sqlForArray;
