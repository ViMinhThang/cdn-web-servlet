$(document).ready(function () {
    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });
    let isFavoriteUpdated = false;
    $(".favorite-button").on('click', function () {
        const beltId = $(this).closest(".card").find(".beltId").val();
        const variantId = $(this).closest(".card").find(".variantId").val();
        const userId = $(this).closest(".card").find(".userId").val();
        if (userId === "") {
            $(".custom_toast_text").text("Bạn chưa đăng nhập")
            $("#liveToast").removeClass("hide").addClass("show")
            return;
        }
        $("#liveToast").removeClass("hide").addClass("show")
        console.log(beltId);
        console.log(userId);
        $.ajax({
            url: `/favorite`,
            type: "POST",
            data: {
                userId: userId,
                beltId: beltId,
                variantId: variantId,
                message: "addFavorite"
            },
            success: function () {
                $("#liveToast").removeClass("hide").addClass("show")
                if (!isFavoriteUpdated && !$(this).hasClass("active")) {
                    const favoriteCount = parseInt($("#favorite_receive").text(), 10) + 1
                    $("#favorite_receive").text(favoriteCount)
                    isFavoriteUpdated = true;
                }
            },
            error: function (xhr) {
                $(".custom_toast_text").text("Thêm vào yêu thích thất bại")
                $("#liveToast").removeClass("hide").addClass("show")
            }
        })
    })
    $(".favorite_button").on('click', function () {
        const $button = $(this);
        const originalContent = $button.html();
        const loadingSpinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

        $button.html(loadingSpinner).prop("disabled", true);

        const beltId = $(this).closest(".beltProp").find(".beltId").val();
        const variantId = $(this).closest(".beltProp").find(".variantId").val();
        const userId = $(this).closest(".beltProp").find(".userId").val();

        console.log(beltId);
        console.log(userId);
        if (userId === "") {
            $(".custom_toast_text").text("Bạn chưa đăng nhập")
            $("#liveToast").removeClass("hide").addClass("show")
            $button.html(originalContent).prop("disabled", false);
            return;
        }
        $.ajax({
            url: `/favorite`,
            type: "POST",
            data: {
                userId: userId,
                beltId: beltId,
                variantId: variantId,
                message: "addFavorite"
            },
            success: function () {
                $("#liveToast").removeClass("hide").addClass("show");

                if (!isFavoriteUpdated && !$button.hasClass("active")) {
                    const favoriteCount = parseInt($("#favorite_receive").text(), 10) + 1;
                    $("#favorite_receive").text(favoriteCount);
                    isFavoriteUpdated = true;
                }

                $button.addClass("active");
            },
            error: function (xhr) {
                $(".custom_toast_text").text("Thêm vào yêu thích thất bại");
                $("#liveToast").removeClass("hide").addClass("show");
            },
            complete: function () {
                $button.html(originalContent).prop("disabled", false);
            }
        });
    });

})