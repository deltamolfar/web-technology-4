// 1.2.3 Створити об'єкт car1 за допомогою new Object()
const car1 = new Object();
car1.color = "blue";
car1.maxSpeed = 180;
car1.driver = {
  name: "Ім'я Прізвище",
  category: "C",
  personalLimitations: "No driving at night"
};
car1.tuning = true;
car1.numberOfAccidents = 0;
console.log("1.2.3", JSON.stringify(car1));

// 1.2.4 Створити об'єкт car2 за допомогою літерального синтаксису
const car2 = {
  color: "red",
  maxSpeed: 160,
  driver: {
    name: "Ім'я Прізвище",
    category: "B",
    personalLimitations: null
  },
  tuning: false,
  numberOfAccidents: 2
};
console.log("1.2.4", JSON.stringify(car2));

// 1.2.5 Додати метод drive для car1
car1.drive = function() {
  console.log("I am not driving at night");
};
car1.drive();

// 1.2.6 Додати метод drive для car2
car2.drive = function() {
  console.log("I can drive anytime");
};
car2.drive();

// 1.2.7 Конструктор Truck
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;
}

// 1.2.8 Статичний метод AssignDriver для Truck
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience
  };
};

// 1.2.9 Метод trip для Truck
Truck.prototype.trip = function() {
  if (!this.driver) {
    console.log("No driver assigned");
  } else {
    const nightDrive = this.driver.nightDriving ? "drives at night" : "does not drive at night";
    console.log(`Driver ${this.driver.name} ${nightDrive} and has ${this.driver.experience} years of experience.`);
  }
};

// 1.2.10 Створити 2 об’єкти Truck та додати водія
const truck1 = new Truck("green", 3000, 80.5, "Volvo", "FMX");
const truck2 = new Truck("blue", 3500, 90.5, "Mercedes", "Actros");

console.log("1.2.10", JSON.stringify(truck1));

truck1.AssignDriver("Ім'я Прізвище", true, 5);
truck2.AssignDriver("Ім'я Прізвище", false, 3);

truck1.trip();
truck2.trip();

// 1.2.12 Створення класу Square
class Square {
  constructor(a) {
    this.a = a;
  }

  static help() {
    console.log("A square is a quadrilateral with four equal sides and four right angles.");
  }

  length() {
    console.log(`Perimeter: ${this.a * 4}`);
  }

  square() {
    console.log(`Area: ${this.a * this.a}`);
  }

  info() {
    console.log(`Sides: ${this.a}, Angles: 90 degrees each, Perimeter: ${this.a * 4}, Area: ${this.a * this.a}`);
  }
}

// 1.2.16 Клас Rectangle, успадкований від Square
class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }

  static help() {
    console.log("A rectangle is a quadrilateral with opposite sides equal and four right angles.");
  }

  length() {
    console.log(`Perimeter: ${2 * (this.a + this.b)}`);
  }

  square() {
    console.log(`Area: ${this.a * this.b}`);
  }

  info() {
    console.log(`Sides: ${this.a}, ${this.b}, Angles: 90 degrees each, Perimeter: ${2 * (this.a + this.b)}, Area: ${this.a * this.b}`);
  }

  getA() {
    return this.a;
  }

  getB() {
    return this.b;
  }

  setA(N) {
    if( N<=0 ){ console.error("Side can't be less or equal to zero!"); return; }
    this.A = N;
  }

  setB(N) {
    if( N<=0 ){ console.error("Side can't be less or equal to zero!"); return; }
    this.B = N;
  }
}

// 1.2.18 Клас Rhombus, успадкований від Square
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this.alpha = alpha;
    this.beta = beta;
  }

  static help() {
    console.log("A rhombus is a quadrilateral with all sides equal in length but not all angles are 90 degrees.");
  }

  length() {
    console.log(`Perimeter: ${4 * this.a}`);
  }

  square() {
    console.log(`Approximate area: ${this.a * this.a * Math.sin((this.alpha * Math.PI) / 180)}`);
  }

  info() {
    console.log(`Sides: ${this.a}, Angles: ${this.alpha} and ${this.beta} degrees, Perimeter: ${4 * this.a}`);
  }
}

// 1.2.20 Клас Parallelogram, успадкований від Rhombus
class Parallelogram extends Rhombus {
  constructor(a, b, alpha, beta) {
    super(a, alpha, beta);
    this.b = b;
  }

  static help() {
    console.log("A parallelogram is a quadrilateral with opposite sides equal and opposite angles equal.");
  }

  length() {
    console.log(`Perimeter: ${2 * (this.a + this.b)}`);
  }

  square() {
    console.log(`Approximate area: ${this.a * this.b * Math.sin((this.alpha * Math.PI) / 180)}`);
  }

  info() {
    console.log(`Sides: ${this.a}, ${this.b}, Angles: ${this.alpha} and ${this.beta} degrees, Perimeter: ${2 * (this.a + this.b)}`);
  }
}

// 1.2.23
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24
const square = new Square(4);
square.info();

const rectangle = new Rectangle(4, 5);
rectangle.info();

const rhombus = new Rhombus(6, 120, 60);
rhombus.info();

const parallelogram = new Parallelogram(5, 6, 110, 70);
parallelogram.info();

// 1.2.25
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

// 1.2.26 - Створення 3 об'єктів за допомогою Triangular
const triangle1 = Triangular();
const triangle2 = Triangular(6, 8, 10);
const triangle3 = Triangular(5, 12, 13);

console.log(triangle1); // { a: 3, b: 4, c: 5 }
console.log(triangle2); // { a: 6, b: 8, c: 10 }
console.log(triangle3); // { a: 5, b: 12, c: 13 }

// 1.2.27
function PiMultiplier(multiplier) {
    return function() {
        return Math.PI * multiplier;
    };
}

// 1.2.28 - Створення функцій
const multiplyBy2 = PiMultiplier(2);
const multiplyBy1_5 = PiMultiplier(1.5);
const divideBy2 = PiMultiplier(0.5);

console.log(multiplyBy2());   // Результат π * 2
console.log(multiplyBy1_5()); // Результат π * 1.5
console.log(divideBy2());     // Результат π / 2

// 1.2.29
function Painter(color) {
    return function(object) {
        if (object.type) {
            console.log(`Color: ${color}, Type: ${object.type}`);
        } else {
            console.log("No ‘type’ property occurred!");
        }
    };
}

// 1.2.30 - Створення функцій PaintBlue, PaintRed та PaintYellow
const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

// 1.2.31
const object1 = { maxSpeed: 280, type: "Truck" };
const object2 = { maxSpeed: 180, type: "Sportcar", avgSpeed: 90, color: "purple" };
const object3 = { color: "magenta", loadCapacity: 2400, isCar: true };

PaintBlue(object1);  // Color: blue, Type: Truck
PaintRed(object2);   // Color: red, Type: Sportcar
PaintYellow(object3); // No ‘type’ property occurred!
