console.clear();

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function radToDeg(rad) {
    return rad * (180 / Math.PI);
}

function calcFromTwoLegs(a, b) {
    if (a <= 0 || b <= 0) return null;
    let c = Math.sqrt(a * a + b * b);
    let alpha = radToDeg(Math.atan(a / b));
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function calcFromLegAndHypotenuse(a, c) {
    if (a <= 0 || c <= a) return null;
    let b = Math.sqrt(c * c - a * a);
    let alpha = radToDeg(Math.asin(a / c));
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function calcFromLegAndOppositeAngle(a, alpha) {
    if (a <= 0 || alpha <= 0 || alpha >= 90) return null;
    let c = a / Math.sin(degToRad(alpha));
    let b = Math.sqrt(c * c - a * a);
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function calcFromLegAndAdjacentAngle(a, beta) {
    if (a <= 0 || beta <= 0 || beta >= 90) return null;
    let c = a / Math.cos(degToRad(beta));
    let b = Math.sqrt(c * c - a * a);
    let alpha = 90 - beta;
    return { a, b, c, alpha, beta };
}

function calcFromHypotenuseAndAngle(c, alpha) {
    if (c <= 0 || alpha <= 0 || alpha >= 90) return null;
    let a = c * Math.sin(degToRad(alpha));
    let b = Math.sqrt(c * c - a * a);
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function triangle(value1, type1, value2, type2) {
    if( value1 === undefined || type1 === undefined || value2 === undefined || type2 === undefined) {
        console.log("Error: не всі аргументи були передані.");
        return "failed";
    }

    if( typeof value1 !== "number" || typeof value2 !== "number") {
        console.log("Error: аргументи value1 та/або value2 повинні бути числами.");
        return "failed";
    }

    if( typeof type1 !== "string" || typeof type2 !== "string") {
        console.log("Error: аргументи type1 та/або type2 повинні бути рядками.");
        return "failed";
    }

    if( value1 <= 0 || value2 <= 0) {
        console.log("Error: аргументи value1 та/або value2 повинні бути додатніми числами.");
        return "failed";
    }

    let a, b, c, alpha, beta;

    const combinations = [
        { firstType: "leg", secondType: "leg", calc: calcFromTwoLegs },
        { firstType: "leg", secondType: "hypotenuse", calc: calcFromLegAndHypotenuse },
        { firstType: "leg", secondType: "opposite angle", calc: calcFromLegAndOppositeAngle },
        { firstType: "leg", secondType: "adjacent angle", calc: calcFromLegAndAdjacentAngle },
        { firstType: "hypotenuse", secondType: "angle", calc: calcFromHypotenuseAndAngle },
    ];

    for (const combo of combinations) {
        let result = undefined;
        if (type1 === combo.firstType && type2 === combo.secondType) {
            result = combo.calc(value1, value2);
        } else if (type1 === combo.secondType && type2 === combo.firstType ){
            result = combo.calc(value2, value1);
        }

        if (result) {
            ({ a, b, c, alpha, beta } = result);
            console.log(`a = ${a.toFixed(2)}`);
            console.log(`b = ${b.toFixed(2)}`);
            console.log(`c = ${c.toFixed(2)}`);
            console.log(`alpha = ${alpha.toFixed(2)}°`);
            console.log(`beta = ${beta.toFixed(2)}°`);
            return "success";
        }
    }

    console.log("Error: невідома або несумісна комбінація типів аргументів.");
    return "failed";
}

console.log('triangle(7, "leg", 18, "hypotenuse");');
triangle(7, "leg", 18, "hypotenuse");

console.log('triangle(60, "opposite angle", 5, "leg");');
triangle(60, "opposite angle", 5, "leg");

console.log('triangle(43.13, "angle", -2, "hypotenuse");');
triangle(43.13, "angle", -2, "hypotenuse");