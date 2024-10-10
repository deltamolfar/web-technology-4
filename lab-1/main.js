// Helper function to convert degrees to radians
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

// Helper function to convert radians to degrees
function radToDeg(rad) {
    return rad * (180 / Math.PI);
}

// Helper function: given two legs, calculates all sides and angles
function calcFromTwoLegs(a, b) {
    if (a <= 0 || b <= 0) return null;
    let c = Math.sqrt(a * a + b * b);  // Pythagorean theorem
    let alpha = radToDeg(Math.atan(a / b)); // Opposite angle to a
    let beta = 90 - alpha; // The other acute angle
    return { a, b, c, alpha, beta };
}

// Helper function: given a leg and the hypotenuse, calculates all sides and angles
function calcFromLegAndHypotenuse(a, c) {
    if (a <= 0 || c <= a) return null;
    let b = Math.sqrt(c * c - a * a);  // Pythagorean theorem
    let alpha = radToDeg(Math.asin(a / c)); // Opposite angle to a
    let beta = 90 - alpha; // The other acute angle
    return { a, b, c, alpha, beta };
}

// Helper function: given a leg and an opposite angle, calculates all sides and angles
function calcFromLegAndOppositeAngle(a, alpha) {
    if (a <= 0 || alpha <= 0 || alpha >= 90) return null;
    let c = a / Math.sin(degToRad(alpha));  // Hypotenuse from sine rule
    let b = Math.sqrt(c * c - a * a);  // Pythagorean theorem
    let beta = 90 - alpha; // The other acute angle
    return { a, b, c, alpha, beta };
}

// Helper function: given a leg and an adjacent angle, calculates all sides and angles
function calcFromLegAndAdjacentAngle(a, beta) {
    if (a <= 0 || beta <= 0 || beta >= 90) return null;
    let c = a / Math.cos(degToRad(beta));  // Hypotenuse from cosine rule
    let b = Math.sqrt(c * c - a * a);  // Pythagorean theorem
    let alpha = 90 - beta; // The other acute angle
    return { a, b, c, alpha, beta };
}

// Helper function: given a hypotenuse and an angle, calculates all sides and angles
function calcFromHypotenuseAndAngle(c, alpha) {
    if (c <= 0 || alpha <= 0 || alpha >= 90) return null;
    let a = c * Math.sin(degToRad(alpha));  // Opposite side (a) from sine rule
    let b = Math.sqrt(c * c - a * a);  // Pythagorean theorem
    let beta = 90 - alpha; // The other acute angle
    return { a, b, c, alpha, beta };
}

// Main function that figures out the right combination
function triangle(value1, type1, value2, type2) {
    let a, b, c, alpha, beta;

    // Normalize inputs: ensure we process leg + angle, hypotenuse + angle, etc.
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
        } else if (type2 === combo.firstType && type2 === combo.secondType ){
            result = combo.calc(value2, value1);
        } else{
            console.log("Error: невідома або несумісна комбінація типів аргументів.");
            return "failed";
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
}

// Test examples
triangle(60, "opposite angle", 5, "leg"); // Works regardless of order
triangle(5, "leg", 60, "opposite angle"); // Also works in reverse order
triangle(10, "hypotenuse", 30, "angle");  // Works for hypotenuse + angle
triangle(5, "leg", 5, "leg");  // Works for two legs
