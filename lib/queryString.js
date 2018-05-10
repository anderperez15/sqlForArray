const objLogicosExternos = [
    ["and","&&"],
    ["or","||"]
];

const queryString = sql => {
    let query = {};
    let condiciones = [];
    sql = sql.trim();
    let myquery = sql.split("from");
    query.select = myquery[0].slice(6).trim().split(",");
    let other = myquery[1].trim().split("where")
    query.aliasTabla = other[0].trim();
    query.condiciones=other[1].trim();
    if (objLogicosExternos[1].some(obj => -1 != query.condiciones.indexOf(obj))){
        condiciones = (query.condiciones.split(objLogicosExternos[1].filter(obj => -1 != query.condiciones.indexOf(obj))[0]));
        console.log(condiciones)
    }else{
        condiciones.push(query.condiciones)
    };
    var ok = [];
        for(var i = 0; i < condiciones.length; i++ ){
            if(objLogicosExternos[0].some(obj => -1 != condiciones[i].indexOf(obj))){
                ok.push(condiciones[i].split(objLogicosExternos[0].filter(obj => -1 != condiciones[i].indexOf(obj))));
            }else{
                ok.push(new Array(condiciones[i]))
            }
        }
    query.condiciones = ok;
    return query;
};

module.exports = queryString;
