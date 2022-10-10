import {checkLen} from './table.js';


const checkVb = (currentSol, tableLen) => {
    let count = 0;

    for(let i = 0 ; i < tableLen-1 ; i++){
        if(currentSol[i] > 1 || currentSol < 0){
            return false;
        }
        else if(currentSol[i] == 1){
            count++;
        }
    }
    if(count == 1) return true;
    
}

const checkVbPosition = (currentSol, tableLen) => {
    for(let i = 0 ; i < tableLen-1 ; i ++){
        if(currentSol[i] == 1){
            return i;
        }
    }
}

function setVetAux (nVar, nConstraints) {
    let aux = new Array();
    aux.push('Z');
    for(let i = 1 ; i <= (nVar) ; i++){
        let str = 'X'+i;
        aux.push(str);
    }
    for(let i = 1 ; i <= (nConstraints) ; i++){
        let str = 'xF'+i;
        aux.push(str);
    }
    aux.push('b');
    return aux;
}


function setSolution(table){
    var nVar = document.getElementById("numVar").value;
    var nConstraints = document.getElementById("numConstraints").value;
    
    const varAux = setVetAux(2, 4);
    const tableVetLen = checkLen(table[0]);
    const tableLen = checkLen(table);
    let solution =[
       
    ]
    
    for(let i = 1 ; i < tableVetLen-1 ; i++){
        let currentSol = new Array();
        for(let j = 0 ; j < tableLen-1 ; j++){
            currentSol.push(table[j][i]);
        }
        if(checkVb(currentSol, tableLen)){
            let vbPosition = checkVbPosition(currentSol, tableLen);
            let vb = {
                "tipo": "VB",
                "variavel": varAux[i],
                "solucao": table[vbPosition][tableVetLen-1]
            }
            solution.push(vb);
        }
        else{
            let vnb = {
                "tipo": "VNB",
                "variavel": varAux[i],
                "solucao": 0
            }
            solution.push(vnb);
        }
        
    }
    let vz = {
        "tipo": "Z",
        "variavel": 'Z',
        "solucao": table[tableLen-1][tableVetLen-1]
    }
    solution.push(vz);
    return solution;
}

export {setSolution, setVetAux};