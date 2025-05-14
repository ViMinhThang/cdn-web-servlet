$(document).ready(function () {
  $(".filter__title").on("click", function () {
    $("#dimmer3").toggleClass("active");
    $("#overlay3").toggleClass("active");

  });

  $(document).ready(function () {
    $(".apply__button").on("click", function () {
      $("#dimmer3").toggleClass("active");
      $("#overlay3").toggleClass("active");

    });
  })


  $(document).on("click", function (event) {
    if (!$(event.target).closest("#overlay, #menuButton").length) {
      $("#overlay").removeClass("active");
      $("#dimmer").removeClass("active");
    }
  });
  $("#closeButton").click(function () {
    console.log(1);
    $("#overlay3").removeClass("active");
    $("#dimmer3").removeClass("active");
  });
})


