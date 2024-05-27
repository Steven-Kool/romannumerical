const input = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('output');
let convertedText = "";
let isError = false;

const matching = [{
  type: 1,
  1: "I",
  2: "IV",
  3: "V",
  4: "IX",
}, {
  type: 2,
  1: "X",
  2: "XL",
  3: "L",
  4: "XC",
}, {
  type: 3,
  1: "C",
  2: "CD",
  3: "D",
  4: "CM",
}, {
  type: 4,
  1: "M",
}]

const checking = (number, array) => {
  for(let i = 0; i < array.length; i++) {
    number--;
    if (array[i] >= 1 && array[i] < 4) {
      convertedText += matching[number][1].repeat(array[i]);
    } else if (array[i] == 4) {
      convertedText += matching[number][2];
    } else if (array[i] == 5) {
      convertedText += matching[number][3];
    } else if (array[i] > 5 && array[i] < 9) {
      convertedText += matching[number][3] + matching[number][1].repeat(array[i] - 5);
    } else if (array[i] == 9) {
      convertedText += matching[number][4];
    }
  }
}

const converting = (event) => {
  event.preventDefault();
  convertedText = "";
  const number = input.value;
  result.style.display = 'block';

  if(!number || !/^[+-]?\d+$/.test(number) || number > 3999 || number < 1) {
    isError = true;
    if(!number || !/^[+-]?\d+$/.test(number)) {
      result.innerText = "Please enter a valid number";
    } else {
      result.innerText = number > 3999 ? "Please enter a number less than or equal to 3999" : "Please enter a number greater than or equal to 1";
    }
  } else {
    isError = false;
    result.classList.remove('output-error');
    result.classList.add('box');

    checking(number.length, number);

    result.innerText = convertedText;
  }

  if(isError) {
    result.classList.remove('box');
    result.classList.add('output-error');
  } else {
    result.classList.remove('output-error');
    result.classList.add('box');
  }
}

convertBtn.addEventListener('click', converting);
