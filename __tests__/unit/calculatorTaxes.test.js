const Calculator = require("../../models/calculator");

// constructor(pizzaSize, toppings, qty)

describe("The calculator", () => {
  const PriceCalculator1 = new Calculator(12, 4, 1);
  const PriceCalculator2 = new Calculator(15, 2, 3);

  it("returns the getTaxes", () => {
    expect(PriceCalculator1.getTaxes()).toBe(1);
  });

  it("returns the pizzaSize", () => {
    expect(PriceCalculator1.pizzaSize).toBe(12);
  });

  it("returns the toppings", () => {
    expect(PriceCalculator1.toppings).toBe(4);
  });
  it("returns the quatity", () => {
    expect(PriceCalculator1.qty).toBe(1);
  });

  it("returns the getTaxes", () => {
    expect(PriceCalculator2.getTaxes()).toBe(2.85);
  });

  it("returns the pizzaSize", () => {
    expect(PriceCalculator2.pizzaSize).toBe(15);
  });

  it("returns the toppings", () => {
    expect(PriceCalculator2.toppings).toBe(2);
  });
  it("returns the quatity", () => {
    expect(PriceCalculator2.qty).toBe(3);
  });
});
