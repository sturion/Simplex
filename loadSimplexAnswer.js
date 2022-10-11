import {loadTable} from './loadTableStep.js';
import {checkLen} from './table.js';
//salve léo

function simplexAnswer(table, solution){
    loadTable(table);
    const solutionLen = checkLen(solution);
    console.log(solution);

    var tableDiv = document.getElementById("result");

    var tbody = document.createElement('table');
    
    var vbTd = document.createElement('td');
    let vbTrTitle = document.createElement('tr');
    vbTrTitle.innerHTML = `VB`;
    vbTd.appendChild(vbTrTitle);

    var vNbTd = document.createElement('td');
    let vNbTrTitle = document.createElement('tr');
    vNbTrTitle.innerHTML = `VNB`;
    vNbTd.appendChild(vNbTrTitle);

    var zTd = document.createElement('td');
    let zTrTitle = document.createElement('tr');
    zTrTitle.innerHTML = `Z`;
    zTd.appendChild(zTrTitle);

    for(let i = 0 ; i < solutionLen ; i++){
        if(solution[i].tipo == 'VB'){
            let vbTr = document.createElement('tr');
            vbTr.innerHTML += `
                <td>${solution[i].variavel} = ${solution[i].solucao}</td>
            `;
            vbTd.appendChild(vbTr);
        }
        else if(solution[i].tipo == 'VNB'){
            let vNbTr = document.createElement('tr');
            vNbTr.innerHTML += `
                <td>${solution[i].variavel} = ${solution[i].solucao}</td>
            `;
            vNbTd.appendChild(vNbTr);
        }
        else{
            let zTr = document.createElement('tr');
            zTr.innerHTML += `
                <td>${solution[i].variavel} = ${solution[i].solucao}</td>
            `;
            zTd.appendChild(zTr);
        }
        
    } 
    tbody.appendChild(vbTd);
    tbody.appendChild(vNbTd);
    tbody.appendChild(zTd);
    tableDiv.appendChild(tbody);
    return null;
}

export {simplexAnswer};