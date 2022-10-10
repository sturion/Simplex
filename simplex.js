import {table, checkLen} from './table.js';
import {verifyAll} from './verifyFields.js';
import {setSolution} from './solution.js';
import {loadTable} from './loadTableStep.js';
import { simplexAnswer } from './loadSimplexAnswer.js';

var mock = [[0,2,1,1,0,0,0,1000],
            [0,1,1,0,1,0,0,800],
            [0,1,0,0,0,1,0,400],
            [0,0,1,0,0,0,1,700],
            [1,-4,-3,0,0,0,0,0]
         ];


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
      if(table[i][tableVetLen-1]/table[i][pivoColumn] < minorPositive && table[i][tableVetLen-1]/table[i][pivoColumn] > 0){
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

const newRows = (table, pivoColumn, pivoRow, nrP) => {
   var newRows = new Array();
   let tableLen = checkLen(table);
   let tableVetLen = checkLen(table[0]);

   for(let i = 0 ; i < tableLen ; i++){
      if(i == pivoRow) continue;

      let nlCoef = new Array();
      
      //pega o coef(*-1)
      let coef = (table[i][pivoColumn])*-1;

      // multiplicar o coef pela nrP
      nrP.forEach(element => {
         nlCoef.push(coef*element);
      });

      //soma a row antiga com a do coeficiente 
      let nRowAux = new Array();
      for(let j = 0 ; j < tableVetLen ; j++){
         
         nRowAux.push(table[i][j]+nlCoef[j])
      }
      newRows.push(nRowAux);  
   }

   return newRows;
}

const regroupRows = (nrP, nlX, pivoRow) => {
   var newTable = nlX;
   newTable.splice(pivoRow, 0, nrP);
   return newTable;
}


function simplexMain(){
   
   if(verifyAll()){
      const myTable = table()[0];
      runMethod(myTable);
   }
}


const runMethod = (myTable) => {
   
   var table = myTable;
   
   
   //mostrar solução (vb,vnb,z)
   //1-verifica se tem negatividade na max(z)
   if(!checkZ(table) == true){
      console.log('n tem negativo');
      let solution = setSolution(table);
      simplexAnswer(table,solution);
      return table;//resposta final
   }
   //2-loop para achar coluna pivo(maior negativo)
   const pivoColumn = findPivoColumn(myTable);
   //3-achar linha pivo, dividingo o resultado pela coluna pivo de cada um, o menr resultado positivo segue
   const pivoRow = findPivoRow(myTable, pivoColumn);
   
   //4-calcular nova linha pivo
   const nrP = newRowPivo(myTable, pivoColumn, pivoRow);
   //5-calcular linhas restantes
   const nlX = newRows(myTable, pivoColumn, pivoRow, nrP);
   //6-juntar linhas em uma tabela
   const newTable = regroupRows(nrP, nlX, pivoRow);
   loadTable(table);
   runMethod(newTable);
}

export {simplexMain};