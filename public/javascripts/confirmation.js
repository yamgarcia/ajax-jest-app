$(function ready() {
  $.getJSON("/api/confirmation", function (data) {
    if (data !== null) {
      $("#toConfirm").append(
        "<thead><tr><th>Customer Name</th>" +
          "<th>Phone number</th>" +
          "<th>Address</th>" +
          "<th>Pizza size</th>" +
          "<th>Pizza crust</th>" +
          "<th>Toppings</th>" +
          "<th>Quantity</th>" +
          "<th>Price</th>" +
          "<th>Delivery Time</th></tr></thead>"
      );
      data.forEach(function (item) {
        $("#toConfirm").append(
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
            "Aproximatelly 35 minutes" +
            "</td></tr>"
        );
      });
    }
  });
});
