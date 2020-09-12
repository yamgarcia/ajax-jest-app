module.exports = class PriceCalculator {
  //   constructor() {};

  constructor(pizzaSize, toppings, qty) {
    this.pizzaSize = parseInt(pizzaSize);
    this.toppings = toppings;
    this.qty = qty;
  }

  getSubTotal() {
    return (this.pizzaSize + this.toppings * 2) * this.qty;
  }
  getTaxes() {
    return (this.pizzaSize + this.toppings * 2) * this.qty * 0.05;
  }
  getTotal() {
    return (this.pizzaSize + this.toppings * 2) * this.qty * 1.05;
  }
};
