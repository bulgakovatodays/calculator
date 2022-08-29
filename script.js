const button = document.querySelectorAll('.button');
const mathSimbols = document.querySelectorAll('.massSimbol');
let string = '0';
let previosNum = '';
let symbl= '';

for (let i = 0; i < mathSimbols.length; i++) {
  console.log(i + ' ' + mathSimbols[i].classList[1]);
}

const display = document.querySelector('.display');

let result;

display.textContent = string;

const numbers = document.querySelector('.basic');
numbers.onclick = function(event) {
  let target = event.target;

  //---------- ЦИФРЫ ---------- 
  if (target.id !== '') { 
    if (string !== '0') {
      string = string + String(target.id);
    } else {
      string = String(target.id);
    }
   // console.log('previosNum: ' + previosNum + '; string: ' + string + '; symbl: ' + symbl);
    display.textContent = string;
  }

    //---------- ТОЧКА ----------
  if (target.classList[1] === 'buttonPoint') {
    if (!string.includes('.')){
      console.log('point');
      string = string + '.';  
    } else return}
   
  //вывод арифметических символов
  if (target.classList[4] === 'massSimbol') {

    if (previosNum !== '0' && string !== '0' && symbl !== '') {
      doneFunc(previosNum, string, symbl);
      previosNum = String(result);
      string = '0';
      symbl = target.textContent;
    } else if (previosNum === '0' && string !== '0' && symbl === '') {
      previosNum = string;
      string = '0';
      symbl = target.textContent;
    } else if (previosNum !== '0' && string === '0' && symbl === '') {
      symbl = target.textContent;
      doneFunc(previosNum, string, symbl);
      previosNum = String(result);
      string = '0';
    } else if (previosNum !== '0' && string === '0' && symbl !== '') {
      symbl = target.textContent;
    } else if (previosNum !== '0' && string !== '0' && symbl === '') {
      previosNum = string;
      string = '0';
      symbl = target.textContent;
    }
    //console.log('previosNum: ' + previosNum + '; string: ' + string + '; symbl: ' + symbl);
    display.textContent = previosNum;
  }

    //---------- ЗНАК РАВЕНСТВА ----------
  if (target.classList[1] === 'buttonEquals'){
    console.log(target.classList[1]);
    doneFunc(previosNum, string, symbl);
    previosNum = result;
    string = '0';
    symbl= '';
    display.textContent = previosNum;
  }

    //---------- ПРОЦЕНТЫ ----------
  if (target.classList[1] === 'buttonPerc'){
    string = String(Number(string) / 100);
    display.textContent = string;
  }

  if (target.classList[1] === 'switchPlusMin') {
    if (string.startsWith('-')){
      string.slice(1, string.length);
    } else {
      string = '-' + string;
    }
    display.textContent = string;
  }
  console.log('previosNum: ' + previosNum + '; string: ' + string + '; symbl: ' + symbl);
}


  //---------- АРИФМЕТИКА ----------
function doneFunc(previosNum, string, symbl) {
  if (symbl === '+'){
    result = (Number(previosNum)) + (Number(string)); //.toFixed(2);
  } else if (symbl === '-'){
    result = (Number(previosNum)) - (Number(string));
  } else if (symbl === 'x'){
    result = (Number(previosNum)) * (Number(string));
  } else if (symbl === '/'){
    result = (Number(previosNum)) / (Number(string));
  } 
  console.log('result ' + result);
}
/*
let equation = {
  'string': string,
  'previosNum': previosNum,
  'symbl': symbl,
}
sessionStorage.setItem(equation.symbl, symbl);
sessionStorage.setItem(equation.previosNum, previosNum);
sessionStorage.setItem(equation.symbl, symbl);

// Получение данных из sessionStorage
var data = sessionStorage.getItem('key');
*/