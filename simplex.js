import {table, checkLen} from './table.js';
import {verifyAll} from './verifyFields.js';

const checkZ = (table) => {
   let tableLen = checkLen(table);
   console.log(table);
   console.log(tableLen);
   for(let i = 0 ; i < vetLen ; i++){
      if(table[tableLen][i] < 0){
         return false;
      }
      return true;
   }
}

function simplexMain(){
   if(verifyAll){
      const myTable = table();
      runMethod(myTable);
   }
}

const runMethod = (myTable) => {
   var table = myTable;
   
   //mostrar solução (vb,vnb,z)
   //1-verifica se tem negatividade na max(z)
   if(!checkZ(table)){
      
   }
   
   //2-loop para achar coluna pivo(maior negativo)
   //3-achar linha pivo, dividingo o resultado pela coluna pivo de cada um, o menr resultado positivo segue
   //4-calcular nova linha pivo
   //5-calcular linhas restantes
   //6-juntar linhas em uma tabela
   //recurssiva
}

export {simplexMain};