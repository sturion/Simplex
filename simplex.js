import {table, checkLen} from './table.js';
import {verifyAll} from './verifyFields.js';


const checkZ = (table) => {
   let tableLen = checkLen(table);
   return table[tableLen-1].some(v => v < 0);
}

const findPivoColumn = (table) => {
   let tableLen = checkLen(table);
   let tableVetLen = checkLen(table[0]);
   var biggestNegative = 0

   for(let i = 0 ; i < tableVetLen ; i++){
      if(table[tableLen-1][i] < biggestNegative){
         biggestNegative = table[tableLen-1][i];
      }
   }
   for(let i = 0 ; i < tableVetLen ; i++){
      if(table[tableLen-1][i] == biggestNegative){
         return i
      }
   }
}



function simplexMain(){
   if(verifyAll){
      const myTable = table()[0];
      const vetLen = table()[1];
      runMethod(myTable,vetLen);
   }
}

const runMethod = (myTable,vetLen) => {
   var table = myTable;
   //mostrar solução (vb,vnb,z)
   //1-verifica se tem negatividade na max(z)
   if(!checkZ(table) == true){
      console.log('n tem negativo');
      return 0;//resposta final
   }
   //2-loop para achar coluna pivo(maior negativo)
   var pivoColumn = findPivoColumn(myTable);
   //3-achar linha pivo, dividingo o resultado pela coluna pivo de cada um, o menr resultado positivo segue
   
   //4-calcular nova linha pivo
   //5-calcular linhas restantes
   //6-juntar linhas em uma tabela
   //recurssiva
}

export {simplexMain};