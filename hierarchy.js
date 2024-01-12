class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}

class Car2 extends Car {
  constructor(name, year) {
    super(name, year);
    this.c2 = true;
  }
}

const c1 = new Car('marcelo', 2023);
const c2 = new Car2('roberto', 2020);
