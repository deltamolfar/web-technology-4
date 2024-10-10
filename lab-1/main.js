function triangle(value1, type1, value2, type2) {
    // Інструкція з використання
    console.log("Інструкція з використання функції triangle:");
    console.log("Виклик функції: triangle(значення1, 'тип1', значення2, 'тип2');");
    console.log("Типи: 'leg' (катет), 'hypotenuse' (гіпотенуза), 'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (гострий кут).");
    
    // Перевірка на наявність всіх аргументів
    if (arguments.length !== 4) {
        console.log("Помилка: необхідно ввести 4 аргументи.");
        return "failed";
    }

    // Створення об'єктів для легшого доступу
    const inputs = [
        { value: value1, type: type1.toLowerCase() },
        { value: value2, type: type2.toLowerCase() }
    ];

    // Визначення змінних
    let a, b, c, alpha, beta;

    // Функція для конвертації градусів в радіани
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    // Функція для конвертації радіанів в градуси
    const toDegrees = (radians) => radians * (180 / Math.PI);

    // Перевірка коректності типів
    const validTypes = ['leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'];
    for (let input of inputs) {
        if (!validTypes.includes(input.type)) {
            console.log(`Помилка: невідомий тип '${input.type}'. Будь ласка, перевірте інструкцію.`);
            return "failed";
        }
    }

    // Перевірка на унікальність типів (неможливо мати два гіпотенузи, наприклад)
    const typesSet = new Set(inputs.map(input => input.type));
    // Додаткові перевірки можуть бути додані за потребою

    // Обробка випадків залежно від типів аргументів
    // Приклад: один катет і гіпотенуза
    if ((inputs[0].type === 'leg' && inputs[1].type === 'hypotenuse') ||
        (inputs[1].type === 'leg' && inputs[0].type === 'hypotenuse')) {
        let leg = inputs.find(input => input.type === 'leg').value;
        let hypotenuse = inputs.find(input => input.type === 'hypotenuse').value;

        // Перевірка коректності значень
        if (leg <= 0 || hypotenuse <= 0) {
            console.log("Помилка: значення сторін повинні бути додатніми числами.");
            return "failed";
        }
        if (leg >= hypotenuse) {
            console.log("Помилка: катет не може бути більшим або рівним гіпотенузі.");
            return "failed";
        }

        // Обчислення іншого катета
        b = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(leg, 2));
        a = leg;
        c = hypotenuse;

        // Обчислення кутів
        alpha = toDegrees(Math.asin(a / c));
        beta = toDegrees(Math.asin(b / c));

    }
    // Інші комбінації типів можна обробити аналогічно
    // Наприклад: два катети
    else if (inputs[0].type === 'leg' && inputs[1].type === 'leg') {
        a = inputs[0].value;
        b = inputs[1].value;

        // Перевірка коректності значень
        if (a <= 0 || b <= 0) {
            console.log("Помилка: значення катетів повинні бути додатніми числами.");
            return "failed";
        }

        // Обчислення гіпотенузи
        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        // Обчислення кутів
        alpha = toDegrees(Math.atan(a / b));
        beta = toDegrees(Math.atan(b / a));
    }
    // Наприклад: катет і прилеглий кут
    else if ((inputs[0].type === 'leg' && inputs[1].type === 'adjacent angle') ||
             (inputs[1].type === 'leg' && inputs[0].type === 'adjacent angle')) {
        let leg = inputs.find(input => input.type === 'leg').value;
        let adjacentAngle = inputs.find(input => input.type === 'adjacent angle').value;

        // Перевірка коректності значень
        if (leg <= 0) {
            console.log("Помилка: значення катета повинно бути додатнім числом.");
            return "failed";
        }
        if (adjacentAngle <= 0 || adjacentAngle >= 90) {
            console.log("Помилка: прилеглий кут повинен бути гострим (менше 90°).");
            return "failed";
        }

        // Обчислення інших сторін та кутів
        alpha = adjacentAngle;
        beta = 90 - alpha;
        a = leg;
        b = a / Math.tan(toRadians(alpha));
        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
    // Інші комбінації можна додати за потребою
    else {
        console.log("Помилка: невідома або несумісна комбінація типів аргументів.");
        return "failed";
    }

    // Вивід результатів
    console.log(`Сторони трикутника:`);
    console.log(`a (катет) = ${a.toFixed(2)}`);
    console.log(`b (катет) = ${b.toFixed(2)}`);
    console.log(`c (гіпотенуза) = ${c.toFixed(2)}`);
    console.log(`Кути трикутника:`);
    console.log(`alpha (протилежний до a) = ${alpha.toFixed(2)}°`);
    console.log(`beta (протилежний до b) = ${beta.toFixed(2)}°`);

    return "success";
}

// Приклади тестових запусків:

// 1. Катет і гіпотенуза
console.log(triangle(4, "leg", 8, "hypotenuse"));

// 2. Гіпотенуза і катет
console.log(triangle(8, "hypotenuse", 4, "leg"));

// 3. Два катети
console.log(triangle(3, "leg", 4, "leg"));

// 4. Катет і прилеглий кут
console.log(triangle(5, "leg", 30, "adjacent angle"));

// 5. Невірний тип
console.log(triangle(5, "leg", 30, "adjacent_angle")); // Помилка

// 6. Несумісна комбінація
console.log(triangle(5, "hypotenuse", 30, "adjacent angle")); // Помилка
