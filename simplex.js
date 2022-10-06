import {table, checkLen} from './table.js';
import {verifyAll} from './verifyFields.js';


const checkZ = (table) => {
   let tableLen = checkLen(table);
   return table[tableLen-1].some(v => v < 0);
}

const findPivoColumn = (table) => {
   let tableLen = checkLen(table);
   let tableVetLen = checkLen(table[0]);
   var biggestNegative = Number.POSITIVE_INFINITY;
   var pivoColumn;

   for(let i = 0 ; i < tableVetLen ; i++){
      if(table[tableLen-1][i] < biggestNegative){
         biggestNegative = table[tableLen-1][i];
         pivoColumn = i;
      }
   }
   return pivoColumn;
}

const findPivoRow = (table, pivoColumn) => {
   let tableLen = checkLen(table);
   let tableVetLen = checkLen(table[0]);
   var minorPositive = Number.POSITIVE_INFINITY;
   var pivoRow;
   
   for(let i = 0 ; i < tableLen-1 ; i++){
      if(table[i][tableVetLen-1]/table[i][pivoColumn] < minorPositive){
         minorPositive = table[i][tableVetLen-1]/table[i][pivoColumn];
         pivoRow = i;
      }
   }
   return pivoRow;
}

const newRowPivo = (table, pivoColumn, pivoRow) => {
   var nrP = new Array();

   table[pivoRow].forEach(element => {
      let newEl = element/table[pivoRow][pivoColumn];
      nrP.push(newEl);
   });
   return nrP;
}

const newRows = (table, nrP, pivoColumn) => {
   console.log('passo2');
   var newRows = new Array();
   let tableLen = checkLen(table);
   let tableVetLen = checkLen(table[0]);
   let nlCoef = new Array();
   console.log(table);

   for(let i = 0 ; i < tableLen-1 ; i++){
      newRows[i] = new Array();
      let coef = (table[i][pivoColumn])*-1;

      //table => pegar o coef(*-1) e multiplicar pela nrP
      nrP.forEach(element => {
         nlCoef.push(coef*element);
      });

      table[i].forEach(element => {
         newRows[i].push(element+nlCoef[i]);
      });
   }
   return newRows;
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
   const pivoColumn = findPivoColumn(myTable);
   //3-achar linha pivo, dividingo o resultado pela coluna pivo de cada um, o menr resultado positivo segue
   const pivoRow = findPivoRow(myTable, pivoColumn);
   //4-calcular nova linha pivo
   const nrP = newRowPivo(myTable, pivoColumn, pivoRow);
   //5-calcular linhas restantes
   const nlX = newRows(myTable, nrP, pivoColumn);
   console.log(nlX);
   //6-juntar linhas em uma tabela
   //recurssiva
   // console.log(myTable);
   // console.log(pivoColumn);
   // console.log(pivoRow);
}

export {simplexMain};