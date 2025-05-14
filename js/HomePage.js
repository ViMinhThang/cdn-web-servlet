$(document).ready(function () {
  $("#menuButton").on("click", function () {
    $("#dimmer").toggleClass("active");
    $("#overlay").toggleClass("active");
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest("#overlay, #menuButton").length) {
      $("#overlay").removeClass("active");
      $("#dimmer").removeClass("active");
    }
  });
  $("#closeButton").click(function () {
    $("#overlay").removeClass("active");
    $("#dimmer").removeClass("active");
  });
  $(".product").hover(console.log("hovered"), function () {
    $(this).toggleClass("active");
  });
  $(".custom_toggle").on("click",function(){
    $("#liveToast").addClass("hide");
    $("#liveToast").addClass("toast");
    $(".custom_show").addClass("hide");
    $(".custom_show").addClass("toast ");
  })

  $.ajax({
    type: "GET",
    url: 'IndexServlet',
    success(res) {
      if($("#is_reloaded").length === 0) {
        document.location.reload();
      }
    }
  });

});

