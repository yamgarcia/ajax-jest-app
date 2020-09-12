$(function ready() {
  $("#submitForm").submit(function (event) {
    event.preventDefault();
    // alert - won't show if validation doesn't pass
    if (confirm("Confirm your Order") === true) {
      let toppings = [];

      let pizzaSize;
      let pizzaCrust;

      // pizzaSize: String,
      $.each($("input[name='pizzaSize']:checked"), function () {
        pizzaSize = $(this).val();
      });
      // pizzaCrust: String,
      $.each($("input[name='pizzaCrust']:checked"), function () {
        pizzaCrust = $(this).val();
      });
      //toppings: [String],
      $.each($("input[name='toppings']:checked"), function () {
        toppings.push($(this).val());
      });

      const orderInfo = JSON.stringify({
        customerName: $("#customerName").val(),
        phoneNumber: $("#phoneNumber").val(),
        address: $("#address").val(),
        pizzaSize: pizzaSize,
        pizzaCrust: pizzaCrust,
        toppings: toppings,
        quantity: parseInt($("#quantity").val()),
      });

      $.ajax({
        url: "/api/orders",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: orderInfo,
        success: function (json, status, request) {
          $("#statusMsg").removeClass();
          $("#statusMsg").addClass("alert alert-success");
          $("#statusMsg").html("Order submitted");
        },
        error: function (request, status) {
          $("#statusMsg").removeClass();
          $("#statusMsg").addClass("alert alert-danger");
          $("#statusMsg").html("Error create order");
          console.log("Request failed : ", status);
        },
      });
      window.location.href = "/confirmation.html";
    } else {
      // The reload() method does the same as the reload button in your browser.
      location.reload();
    }
  });
});
