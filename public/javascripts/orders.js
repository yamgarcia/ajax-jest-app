$(function ready() {
  $.getJSON("/api/orders", function (data) {
    if (data !== null) {
      $("#orders").append(
        "<thead><tr><th>Customer Name</th>" +
          "<th>Phone number</th>" +
          "<th>Address</th>" +
          "<th>Pizza size</th>" +
          "<th>Pizza crust</th>" +
          "<th>Toppings</th>" +
          "<th>Quantity</th>" +
          "<th>Price</th>" +
          "<th>Created Date</th></tr></thead>"
      );
      data.forEach(function (item) {
        $("#orders").append(
          "<tr><td>" +
            item.customerName +
            "</td><td>" +
            item.phoneNumber +
            "</td><td>" +
            item.address +
            "</td><td>" +
            item.pizzaSize +
            "</td><td>" +
            item.pizzaCrust +
            "</td><td>" +
            item.toppings +
            "</td><td>" +
            item.quantity +
            "</td><td>" +
            item.price +
            "</td><td>" +
            item.createdDate +
            "</td></tr>"
        );
      });
    }
  });
});
