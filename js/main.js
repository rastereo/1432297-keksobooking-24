// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (max < min) {
        return 'Max меньше min'
    }
    if (max === min) {
        return 'Max равен min'
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomFloat(min, max, maxDigits) {
    if (max < min) {
        return 'Max меньше min'
    }
    if (max === min) {
        return 'Max равен min'
    }
    const digitsDegree = 10 ** maxDigits
    return ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}

if (getRandomFloat < 0) {
    console.log('Отрицательное число!')
}

console.log('Cлучайное целое число: ' + getRandomIntInclusive(0, 100))
console.log('Cлучайное число с плавающей точкой: ' + getRandomFloat(1.1, 1.2, 3))

// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Источник "Количество знаков после запятой" https://qna.habr.com/q/999157