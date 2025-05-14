$(document).ready(function () {
    const options = $.map(
        Array.from({length: 30}, (_, i) => i + 1),
        function (num) {
            return `<option value="${num}">${num}</option>`;
        }
    );

    $(".number-select").append(options);


    const popUpUpdateInfo = () =>
        function () {
            const name__field1 = $(this)
                .closest(".popup--content--userInfo--action")
                .find(".name__field1")
                .text();
            const address__field1 = $(this)
                .closest(".popup--content--userInfo--action")
                .find(".address__field1")
                .text();
            const city__field1 = $(this)
                .closest(".popup--content--userInfo--action")
                .find(".city__field1")
                .text();
            const number__field1 = $(this)
                .closest(".popup--content--userInfo--action")
                .find(".number__field1")
                .text();

            console.log(name__field1, address__field1, city__field1, number__field1);

            if (name__field1 && address__field1 && city__field1 && number__field1) {
                $(".userInfo__name").text(name__field1);
                $(".userInfo__number").text(number__field1);
                $(".userInfo__address").text(city__field1 + ", " + address__field1);

                $("#popupForm").fadeOut();
            } else {
                alert("Please complete all fields.");
            }
        };
    const showApplyCoupon = () =>
        function () {
            $(this).next(".cart__container_coupon--submit").animate(
                {
                    opacity: "toggle",
                    height: "toggle",
                },
                400
            );
        };
    const showPopUp = () =>
        function () {
            $("#popupForm").fadeIn();
        };
    const showPopUpPay = () =>
        function () {
            $("#popUpPayment").fadeIn();
        };
    const closePopUp = () =>
        function () {
            $("#popupForm").fadeOut();
        };
    const closePopUpPay = () => {
        $("#popUpPayment").fadeOut();
    };

    const handleChoosePayment = function () {
        console.log(1)

        const paymentMethod = $(this)
            .closest(".popup--content--userInfo--action")
            .find(".paymentMethod")
            .text().trim();
        console.log(paymentMethod);
        if (paymentMethod === "GooglePay") {
            $("#openFormButtonPayment").text("Thanh toán bằng Google Pay");
            $(".method-image-display").attr("src", "/assets/icons/GooglePay.svg");
            $(".submitPaymentMethod").val("GooglePay")
            $("#popUpPayment").fadeOut();
        } else if (paymentMethod === "Bank") {
            $("#openFormButtonPayment").text("Thanh toán bằng Ngân hàng");
            $(".method-image-display").attr("src", "/assets/icons/Bank.svg");
            $(".submitPaymentMethod").val("Bank")
            $("#popUpPayment").fadeOut();
        } else if (paymentMethod === "Thanh toán khi nhận hàng") {
            $("#openFormButtonPayment").text("Thanh toán khi nhận hàng");
            $(".method-image-display").attr("src", "/assets/icons/COD.svg");
            $(".submitPaymentMethod").val("Delivery")
            $("#popUpPayment").fadeOut();
        }
    };
    const handlePayment = () =>
        function () {
            if ($("#openFormButtonPayment").text() == "Thanh toán bằng Ngân hàng") {
                $("#popUpPaymentQR").fadeIn();
                handleCountDown();
            }
        };
    const handleCountDown = () => {
        let timeLeft = 300;

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secondsLeft = seconds % 60;
            return (
                (minutes < 10 ? "0" : "") +
                minutes +
                ":" +
                (secondsLeft < 10 ? "0" : "") +
                secondsLeft
            );
        }

        const countdownTimer = setInterval(function () {
            timeLeft--;

            $("#countdown").text(formatTime(timeLeft));

            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                $("#countdown").text("Time's up!");
                $("#popUpPaymentQR").fadeOut();
            }
        }, 1000);
    };

    const closePopUpPayment = () => {
        $("#popUpPaymentQR").fadeOut();
    };

    const groupPopup = ["popupForm", "popUpPayment", "popUpPaymentQR"];
    $(".popup--content--submit").click(popUpUpdateInfo());
    $(".cart__container--coupon").click(showApplyCoupon());
    $("#openFormButton").click(showPopUp());
    $("#closeFormButton").click(closePopUp());
    $(".openFormButtonPay").click(showPopUpPay());
    $("#closeFormButtonPay").click(closePopUpPay);
    $(".popup--content--submitPayment").on("click", handleChoosePayment);
    $(".btn-dark").click(handlePayment());
    $("#closeFormButtonPayment").click(closePopUpPayment);
    $(window).click(function (event) {
        groupPopup.forEach((popup) => {
            if (event.target.id == popup) {
                $("#" + popup).fadeOut();
            }
        });
    });
    $(".custom_delete").on("click", function () {
        console.log("1");
        const $item = $(this).closest(".custom_item");
        $item.remove();
    });
    $(".custom_input--btn-group__btn").on("click", function () {
        const couponCode = $(".couponValue").val();
        const cartReceived = $("#cart_received").text()
        $(".custom_insert").remove(".custom_alert")
        if (couponCode === "") {
            $(".custom_insert").append("<p class='text-danger custom_alert w-100'>Chưa nhập coupon</p>")
            return;
        } else if (cartReceived === "0") {
            $(".custom_insert").append("<p class='text-danger custom_alert w-100'>Chưa có sản phẩm</p>")
            return;

        } else {
            $.ajax({
                url: `/coupon?code=${couponCode}`,
                type: "GET",
                data: {
                    couponCode: couponCode,
                    message: `getCoupon`,
                },
                success(responseData) {
                    const data = responseData;
                    $(".totalCostDisplay").text((data.grandTotal) + "VNĐ");
                },
                error(responseData) {
                    $(".custom_input_group").append("<p class='text-danger custom_alert w-100'>Coupon không tồn tại</p>")

                }
            })
        }
    })
});
