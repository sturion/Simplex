function table(){
    var nVar = document.getElementById("numVar").value;
    var nConstraints = document.getElementById("numConstraints").value;
    var vetLen = parseInt(nVar) + parseInt(nConstraints) + 2;
    //pegar as formulas iniciais e inserir as folgas
    //f1 = Fo max
    const f1 = newArray('fomax');
    const table = newArray();

    for(let i = 0 ; i < vetLen-1 ; i++){
        let el = document.getElementById('var' +  `${i}`);
        if(el){
            f1.push(-parseInt(el.value));
        }
        else{
            f1.push(0);
        }
    }

    
    for(let i = 0 ; i < nConstraints ; i++){
        table[i] = newArray('constraint');
        for(let j = 0 ; j < vetLen-1 ; j++){
            let actualNum = document.getElementById(`${i}` + 'x' + `${j}`);
            
            if(actualNum  != null){
                table[i].push(parseInt(actualNum.value));
                
            }else if(parseInt(nVar)+i+1 == checkLen(table[i])){
                table[i].push(1);
                
            }else if(checkLen(table[i] ) == vetLen-1){
                actualNum = document.getElementById('constraintResult' + `${i}`);
                table[i].push(parseInt(actualNum.value));
            }else{
                table[i].push(0);
            }
        }
    }
    table.push(f1);
    
    return table;
  
}

const newArray = (type) => {
    const vet = new Array();
    if(type == 'fomax'){
        vet.push(1);
        return vet;
    }
    else if(type == 'constraint'){
        vet.push(0);
        return vet;
    }
    else{
        return vet;
    }
}



function checkLen(obj){
    let c = 0;
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            c++;
        }
    }
    return c;
}

export {table, checkLen};