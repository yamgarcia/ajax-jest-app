$(function ready() {
  $("#register").submit(function (event) {
    event.preventDefault();
    if (confirm("Register User?") === true) {
      const user = JSON.stringify({
        username: $("#username").val(),
        password: $("#password").val(),
        email: $("#email").val(),
      });

      $.ajax({
        url: "/api/signup",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: user,
        success: function (json, status, request) {
          $("#statusMsg").removeClass();
          $("#statusMsg").addClass("alert alert-success");
          $("#statusMsg").html("User Registered");
        },
        error: function (request, status) {
          $("#statusMsg").removeClass();
          $("#statusMsg").addClass("alert alert-danger");
          $("#statusMsg").html("Error creating user");
          console.log("Request failed : ", status);
        },
      });
      window.location.href = "/signin.html";
    }
  });
});
