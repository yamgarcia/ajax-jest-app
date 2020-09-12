const Calculator = require("../../models/calculator");

// constructor(pizzaSize, toppings, qty)

describe("The calculator", () => {
  const PriceCalculator1 = new Calculator(10, 10, 3);
  const PriceCalculator2 = new Calculator(12, 9, 1);

  it("returns the subTotal", () => {
    expect(PriceCalculator1.getTotal()).toBe(94.5);
  });

  it("returns the Calculator's pizzaSize", () => {
    expect(PriceCalculator1.pizzaSize).toBe(10);
  });

  it("returns the Calculator's toppings", () => {
    expect(PriceCalculator1.toppings).toBe(10);
  });
  it("returns the Calculator's qty", () => {
    expect(PriceCalculator1.qty).toBe(3);
  });

  it("returns the returns the subTotal", () => {
    expect(PriceCalculator2.getTotal()).toBe(31.5);
  });

  it("returns the Calculator's pizzaSize", () => {
    expect(PriceCalculator2.pizzaSize).toBe(12);
  });

  it("returns the Calculator's toppings", () => {
    expect(PriceCalculator2.toppings).toBe(9);
  });
  it("returns the Calculator's qty", () => {
    expect(PriceCalculator2.qty).toBe(1);
  });
});
