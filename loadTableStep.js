import {checkLen} from './table.js';
import {setVetAux} from './solution.js';

function loadTable(table){
    var nVar = document.getElementById("numVar").value;
    var nConstraints = document.getElementById("numConstraints").value;
    let vetAux = setVetAux(nVar,nConstraints);
    let resultTable = table;
    resultTable.unshift(vetAux)

    
    var tableDiv = document.getElementById("steps");
    const myDiv = document.createElement('div');
    let tableLen = checkLen(resultTable);

    let tbody = document.createElement('table');
    

    for(let i = 0 ; i < tableLen ; i++){
        let trAux = document.createElement('tr');
        for(let j = 0 ; j < vetAux.length ; j++){
            trAux.innerHTML += `
                <td>${resultTable[i][j]}</td>
            `;
        }
        tbody.appendChild(trAux);
    } 
        
    myDiv.appendChild(tbody);
    tableDiv.appendChild(myDiv);

}

export {loadTable};