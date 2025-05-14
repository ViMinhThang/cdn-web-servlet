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

    const userId = $(".userId").val();
    if (userId) {
        console.log(userId);
        $.ajax({
                url: `favorite?userId=${userId}`,
                type: "GET",
                data: {
                    message: "getAllFavorites",
                    userId: userId,
                },
                success(res) {
                    console.log(res);
                    $("#favorite_receive").text(res);

                }
            }
        )
        $.ajax({
                url: `Cart`,
                type: "GET",
                data: {
                    message: "getCartSize",
                },
                success(res) {
                    console.log(res);
                    $("#cart_received").text(res);
                }
            }
        )
    }


});


function toggleSearch() {
    const container = document.querySelector(".search-container");
    container.classList.toggle("active");
    const input = container.querySelector(".search-input");

    if (container.classList.contains("active")) {
        input.focus();
    }
}