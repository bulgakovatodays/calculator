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
    console.log(target.classList[1]);
    string = (Number(string) / 100);
    display.textContent = string;
  }
    //---------- Плюс/Минус ----------
  if (target.classList[1] === 'switchPlusMin') {
    if (string.startsWith('-')){
      console.log('del minus')
      string = string.slice(1, string.length);
    } else {
      string = '-' + string;
    }
    display.textContent = string;
  }

    //---------- DELETE ----------
    if (target.classList[1] === 'buttonAC') { //полное обнуление
      previosNum = '';
      string = '0';
      symbl = '';
      display.textContent = string;
    }

    if (target.classList[1] === 'buttonCE') { //сброс последнего набранного числа
      string = '0';
      display.textContent = string;
    }

    if (target.classList[1] === 'buttonSumb') { //удаление одного элемента
      string = string.slice(0,(string.length - 1));
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
    fractionalMult(previosNum,string);
  } else if (symbl === '/'){
    result = (Number(previosNum)) / (Number(string));
  } 
  console.log('result ' + result);
}

//---------- возведение в степень ----------
const exponetion = document.querySelector('.buttonExpo');
exponetion.onclick = function(event) {
  let target = event.target;
  console.log(target.classList[1]);
  if (string !== '0') {
  string = (Number(string)) * (Number(string));
  console.log(string);
  display.textContent = string;
  console.log('previosNum: ' + previosNum + '; string: ' + string + '; symbl: ' + symbl);
  } else {
    string = previosNum;
    previosNum = '';
    symbl = '';
    string = (Number(string)) * (Number(string));
    console.log(string);
    display.textContent = string;
    console.log('previosNum: ' + previosNum + '; string: ' + string + '; symbl: ' + symbl);
  }
}
        
//---------- КОРЕНЬ ----------
const squareRoot = document.querySelector('.buttonRad');
squareRoot.onclick = function(event) {
  let target = event.target;
  console.log(target.classList[1]);
  if (Number(string) >= 0) {
    string = String(Math.sqrt(Number(string)));
    display.textContent = string;
    console.log('previosNum: ' + previosNum + '; string: ' + string + '; symbl: ' + symbl);
    } else {
      string = '0';
      previosNum = '';
      symbl= '';
      display.textContent = 'EROR!';
    }
}

// умножение на дробь
function fractionalMult(a,b) {
  console.log(previosNum + '*' + string);
  //console.log(previosNum.includes('.'));
  //console.log(string.includes('.'));
  result = '';

  if (!a.includes('.') && !b.includes('.')) {
    console.log('simple mult');
    result = (Number(previosNum)) * (Number(string));
  } else  { //if (!a.includes('.') || !b.includes('.'))
    let aArr = [];
    let bArr = [];

    if (a.includes('.')) {
      aArr = a.split('.');
      if (Number(aArr[0]) < 0) {
        aArr[1] = '-' + aArr[1];
      }
      let devided = 10 ** aArr[1].length;
      aArr.push(devided);
    } else {
      aArr = [a, 0, 1];
    }
    if (b.includes('.')) {
      bArr = b.split('.');
      if (Number(bArr[0]) < 0) {
        bArr[1] = '-' + bArr[1];
      }
      let devided = 10 ** bArr[1].length;
      bArr.push(devided);
    } else {
      bArr = [b, 0, 1];
    }
    console.log(aArr);
    console.log(bArr);
    let arr = [];
    arr.push(aArr[0]*bArr[0]);
    arr.push(aArr[0]*bArr[1]/bArr[2]);
    arr.push(aArr[1]*bArr[0]/aArr[2]);
    arr.push(aArr[1]*bArr[1]/(bArr[2]*aArr[2]));
    console.log(arr);
    result = arr[0];
    for (let i = 1; i < arr.length; i++){
      result = result + arr[i];
    }
  }
  return result;
}


// деление на дробь
function fractionalDiv(a,b) {
  console.log(previosNum + ' / ' + string);
  console.log(previosNum.includes('.'));
  console.log(string.includes('.'));
  result = '';

  if (!a.includes('.') && !b.includes('.')) {
    console.log('simple mult');
    result = (Number(previosNum)) / (Number(string));
  } else if (b.includes('.'))  { //if (!a.includes('.') || 
    let bArr = [];
    bArr = b.split('.');
    let devided = 10 ** bArr[1].length;
    result = Number(previosNum) / (Number(string) * devided) / devided;
    console.log(result);
  return result;
  }
}
