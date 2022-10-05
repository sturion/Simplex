function generate(nVar,nConstraints){
    const tbody = document.getElementsByTagName('tbody')[0];
    const maxZtr = document.createElement('tr');
    //Cria a row da Max Z
    //Insere a op de max ou min
    maxZtr.innerHTML = `
        <select>
            <option>Max</option>
            <option>Min</option>
        </select>
        Z =
    `;
    //Insere os campos de acordo com a quantidade requisitada de variaveis
    for(let i = 0 ; i < nVar ; i++){
        maxZtr.innerHTML += `<input type="text" id="var${i}"> x${i+1}`;
        if(i != nVar-1){
            maxZtr.innerHTML += ` + `;
        }
    }
    //insere no html a F max/min
    tbody.appendChild(maxZtr);

    //Cria as restrições
    

    for(let i = 0 ; i < nConstraints ; i++){
        const constraintTr = document.createElement('tr');
        constraintTr.setAttribute('id', "constraint" + `${i}`)
        for(let j = 0 ; j < nVar ; j++){
            constraintTr.innerHTML += `
                <input type="text" id="${i}x${j}"> x${j+1}
            `;
            if(j != nVar-1){
                constraintTr.innerHTML += ` + `;
            }
        }
        constraintTr.innerHTML += `
            <select>
                <option><=</option>
            </select>
            <input type="text" id="constraintResult${i}">
        `;
        tbody.appendChild(constraintTr);
    }

    const simplexButton = document.createElement('tr');
    simplexButton.innerHTML += `<button type="button" id="simplexMain-Button">Rodar metodo</button>`;
    document.getElementById('simplexMain-Button').addEventListener('click',simplexMain);
    tbody.appendChild(simplexButton);
    
}

function checkFields(){
    const nVar = document.getElementById("numVar").value;
    const nConstraints = document.getElementById("numConstraints").value;
    
    if(nVar != '' && nConstraints != ''){
        generate(nVar,nConstraints);
    }
}

export {checkFields};