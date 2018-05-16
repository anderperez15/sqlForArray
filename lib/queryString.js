const queryString = sql => {
  let query = {};
  sql = sql.replace(/(!=)/g," <> ");
  if (/( and )|( or )/.test(sql)) {
    sql = sql.replace(/( and )/g," && ");
    sql = sql.replace(/( or )/g," || ");
  };
  if (/(==|=)/) {
    sql = sql.replace(/(==|=)/g," == ");
    sql = sql.replace(/(== >)/g,"=>");
  };
  sql = sql.replace(/(<>)/g," != ");
  sql = sql.replace(/(~>)/g,".some");
  sql = sql.replace(/(->)/g,".every");
  sql = sql.replace(/(< ==)/g,"<=");
  sql = sql.replace(/(> ==)/g,">=");
  let ok;
  sql = sql.trim();
  ok = sql.split("from");
  query.select = ok[0].replace(/(select)/,"");
  if (/( where )/.test(ok[1])) {
    let x;
    x = ok[1].split(" where");
    query.alias = x[0].trim();
    query.condiciones = x[1].trim();
  } else {
    query.alias = ok[1].trim();
    query.condiciones = "1==1";
  };
  query.select = query.select.split(",").map(o=>o.trim())
  return query;
};

module.exports = queryString;
