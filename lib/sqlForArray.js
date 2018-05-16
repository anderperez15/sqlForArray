"use strict";

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
  query.select = query.select
  .map(
    o =>{
      if(/( as )/.test(o)){
        return o.split(" as ").map(a=>a.trim());
      } else {
        return [o.trim(),o.slice(query.alias.length+1).trim()];
      }
    }
  );
  for (var i = 0; i < Array_1.length; i++) {
    var json = [];
    if(isTrue(driver.tabla[i], query.condiciones, query.alias)){
      for (var _n = 0; _n < query.select.length; _n++){
        let s ="var "+query.alias+"=Array_1[i];";
        json[_n] = '"'+query.select[_n][1]+'":'+JSON.stringify(eval(s+query.select[_n][0]));
      };
      driver.response.push( JSON.parse('{'+json.join(',')+'}'));
    };
  };
  return driver.response;
};

module.exports = sqlForArray;
