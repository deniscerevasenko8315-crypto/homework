// // Задание 1
// for (let i = 1; i <= 20; i++) {
//   if (i % 4 === 0) {
//     continue;
//   } else {
//     console.log(i);
//   }
// }

// // Задача 2
// const number = +prompt("Введите число", 1);
// let factorial = 1;
// for (let i = 1; i <= number; i++) {
//   factorial = factorial * i;
// }
// console.log(factorial);

// Задача 3
let board = "";

for (let i = 1; i <= 8; i++) {
  let r = "";
  board += " ";
  r += "\n";
  for (let j = 1; j <= 8; j++) {
    let r = "";
    board += "# ";
    r += "\n";
  }
  board = board + r;
}
console.log(board);
