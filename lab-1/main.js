function triangle(value1, type1, value2, type2) {
    if (arguments.length !== 4) {
        console.log("Помилка: необхідно ввести 4 аргументи.");
        return "failed";
    }

    const inputs = [
        { value: value1, type: type1.toLowerCase() },
        { value: value2, type: type2.toLowerCase() }
    ];

    let a, b, c, alpha, beta;

    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const toDegrees = (radians) => radians * (180 / Math.PI);

    const validTypes = ['leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'];
    for (let input of inputs) {
        if (!validTypes.includes(input.type)) {
            console.log(`Помилка: невідомий тип '${input.type}'. Будь ласка, перевірте інструкцію.`);
            return "failed";
        }
    }

    // Перевірка на унікальність типів (неможливо мати два гіпотенузи, наприклад)
    const typesSet = new Set(inputs.map(input => input.type));

    if ((inputs[0].type === 'leg' && inputs[1].type === 'hypotenuse') ||
        (inputs[1].type === 'leg' && inputs[0].type === 'hypotenuse')) {
        let leg = inputs.find(input => input.type === 'leg').value;
        let hypotenuse = inputs.find(input => input.type === 'hypotenuse').value;

        if (leg <= 0 || hypotenuse <= 0) {
            console.log("Помилка: значення сторін повинні бути додатніми числами.");
            return "failed";
        }
        if (leg >= hypotenuse) {
            console.log("Помилка: катет не може бути більшим або рівним гіпотенузі.");
            return "failed";
        }

        b = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(leg, 2));
        a = leg;
        c = hypotenuse;

        alpha = toDegrees(Math.asin(a / c));
        beta = toDegrees(Math.asin(b / c));

    } else if (inputs[0].type === 'leg' && inputs[1].type === 'leg') {
        a = inputs[0].value;
        b = inputs[1].value;

        if (a <= 0 || b <= 0) {
            console.log("Помилка: значення катетів повинні бути додатніми числами.");
            return "failed";
        }

        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        alpha = toDegrees(Math.atan(a / b));
        beta = toDegrees(Math.atan(b / a));
    } else if ((inputs[0].type === 'leg' && inputs[1].type === 'adjacent angle') ||
             (inputs[1].type === 'leg' && inputs[0].type === 'adjacent angle')) {
        let leg = inputs.find(input => input.type === 'leg').value;
        let adjacentAngle = inputs.find(input => input.type === 'adjacent angle').value;

        if (leg <= 0) {
            console.log("Помилка: значення катета повинно бути додатнім числом.");
            return "failed";
        }
        if (adjacentAngle <= 0 || adjacentAngle >= 90) {
            console.log("Помилка: прилеглий кут повинен бути гострим (менше 90°).");
            return "failed";
        }

        alpha = adjacentAngle;
        beta = 90 - alpha;
        a = leg;
        b = a / Math.tan(toRadians(alpha));
        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    } else {
        console.log("Помилка: невідома або несумісна комбінація типів аргументів.");
        return "failed";
    }

    console.log(`Сторони трикутника:`);
    console.log(`a (катет) = ${a.toFixed(2)}`);
    console.log(`b (катет) = ${b.toFixed(2)}`);
    console.log(`c (гіпотенуза) = ${c.toFixed(2)}`);
    console.log(`Кути трикутника:`);
    console.log(`alpha (протилежний до a) = ${alpha.toFixed(2)}°`);
    console.log(`beta (протилежний до b) = ${beta.toFixed(2)}°`);

    return "success";
}


console.log(triangle(4, "leg", 8, "hypotenuse"));
console.log(triangle(8, "hypotenuse", 4, "leg"));
console.log(triangle(3, "leg", 4, "leg"));
console.log(triangle(5, "leg", 30, "adjacent angle"));
console.log(triangle(5, "leg", 30, "adjacent_angle")); // Помилка очікувана
console.log(triangle(5, "hypotenuse", 30, "adjacent angle")); // Помилка очікувана
