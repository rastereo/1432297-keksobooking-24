// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (min < 0 || max < 0) {
        throw 'Отрицательное число!';
    }
    if (max < min) {
        throw 'Max меньше min!'
    }
    if (max === min) {
        throw 'Max равен min!'
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomFloat(min, max, maxDigits) {
    if (min < 0 || max < 0) {
        throw 'Отрицательное число!';
    }
    if (max < min) {
        throw 'Max меньше min!'
    }
    if (max === min) {
        throw 'Max равен min!'
    }
    
    const digitsDegree = 10 ** maxDigits;
    let result = ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
    
    return result;
}

console.log('Cлучайное целое число: ' + getRandomIntInclusive(0, 100))
console.log('Cлучайное число с плавающей точкой: ' + getRandomFloat(1.1, 1.2, 4))

// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Источник "Количество знаков после запятой" https://qna.habr.com/q/999157