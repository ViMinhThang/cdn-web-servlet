$(document).ready(function () {
  $(".custom_default").on("click", function () {
    $(".address__info").css("border", "2px solid white");
    $(this).closest(".address__info").css("border", "2px solid black");
  });

});

