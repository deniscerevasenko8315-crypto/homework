// Задача 1

let number = 2;

if (number % 2 === 0) {
  console.log(number + " Четное число");
} else {
  console.log(number + " Нечетное число");
}

//задание 2
let age = 30;
let discount = age < 18 ? 10 : age <= 65 ? 20 : 30;
console.log(discount + "%");

let a = 90;
let b;
switch (true) {
  case a < 18:
    b = 10;
    break;
  case a <= 65:
    b = 20;
    break;
  default:
    b = 30;
}
console.log(b + "%");

// //задача 3
// let username = prompt("Имя пользователя");
// let password = prompt("Пороль");
// if ((username === "admin" || "user") && password === "123456") {
//   console.log("Доступ разрешён");
// } else {
//   console.log("Доступ запрещен");
// }

// Задача 4
let weight = prompt("Вес посылки (в килограммах) ");
let type = prompt("Тип доставки (Стандарт, экспресс, премиум");
let coff;
switch (type) {
  case "Стандарт":
    coff = 1;
    break;
  case "Экспресс":
    coff = 1.5;
    break;
  case "Премиум":
    coff = 2;
    break;
}
if (weight <= 0) {
  alert("Некорректный вес посылки");
} else if (coff === undefined) {
  alert("Неверный тип доставки");
}
