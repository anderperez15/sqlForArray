const comparadores = ["=","<>","!=","=>","~>",">=","<=",">","<"];

const objLogicosInternos = ["&","|"];

const pruebaFinal = (arg,ope) => {
    switch(ope[0]){
        case "=":
            return arg[0]  == arg[1];
        case ("<>" || "!="):
             return arg[0]  != arg[1];
        case ">=":
            return arg[0] >= arg[1];
        case "<=":
            return arg[0] <= arg[1];
        case ">":
            return arg[0] > arg[1];
        case "<":
            return arg[0] < arg[1];
    }
};

const argumentoTransf = (arg,props,obj) => {
    var x = [];
    for(var  i=0; i < arg.length; i++){
        if(props.some(obj => -1 != arg[i].indexOf(obj))){
            x[i] = Object.getOwnPropertyDescriptor(obj,props.filter(obj => -1 != arg[i].indexOf(obj))).value
        }else{
            x[i] = JSON.parse(arg[i]);
        }
    }
    return x;
};

const isTrue = (condiciones,obj,props) => {
    var test = [];
    for (var i = 0; i < condiciones.length; i++){
        var x = {};
        var d = [];
        for (var n =  0; n < condiciones[i].length; n++){
            x.operador = comparadores.filter(obj => -1 != condiciones[i][n].indexOf(obj));
            x.argumentos = condiciones[i][n].split(x.operador[0]).map(obj => obj.trim());
            var m = pruebaFinal(argumentoTransf (x.argumentos,props,obj),x.operador);
            console.log(m)
            if(m){
                d.push(true)
            }else{
                d.push(false)
            }
        }
        test.push(d.every(o => o ==true));
    }
    return test.some(obj => obj == true);
}

module.exports = isTrue;
