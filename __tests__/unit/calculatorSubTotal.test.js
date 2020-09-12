const Calculator = require("../../models/calculator");

// constructor(pizzaSize, toppings, qty)

describe("The calculator", () => {
  const PriceCalculator1 = new Calculator(15, 3, 2);
  const PriceCalculator2 = new Calculator(10, 2, 1);

  it("returns the subTotal", () => {
    expect(PriceCalculator1.getSubTotal()).toBe(42);
  });

  it("returns the Calculator's pizzaSize", () => {
    expect(PriceCalculator1.pizzaSize).toBe(15);
  });

  it("returns the Calculator's toppings", () => {
    expect(PriceCalculator1.toppings).toBe(3);
  });
  it("returns the Calculator's qty", () => {
    expect(PriceCalculator1.qty).toBe(2);
  });

  it("returns the subTotal", () => {
    expect(PriceCalculator2.getSubTotal()).toBe(14);
  });

  it("returns the Calculator's pizzaSize", () => {
    expect(PriceCalculator2.pizzaSize).toBe(10);
  });

  it("returns the Calculator's toppings", () => {
    expect(PriceCalculator2.toppings).toBe(2);
  });
  it("returns the Calculator's qty", () => {
    expect(PriceCalculator2.qty).toBe(1);
  });
});
