$(document).ready(function () {

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
                    $(".totalCostDisplay").text((data.grandTotal) + " VNĐ");
                },
                error(responseData) {
                    $(".custom_input_group").append("<p class='text-danger custom_alert w-100'>Coupon không tồn tại</p>")

                }
            })
        }
    })
    $(".remove_button").on("click", function () {
        const $this = $(this);
        const beltId = $(this).closest(".cart-item").find(".beltId").val();
        const variantId = $(this).closest(".cart-item").find(".variantId").val();
        $.ajax({
            url: `/Cart`,
            method: "POST",
            data: {
                message: `remove`,
                beltId: beltId,
                variantId: variantId,
            },
            success(responseData) {
                const data = responseData;
                $this.closest(".cart-item").fadeOut(300, function () {
                    $(this).remove();
                });
                let totalQuantity = 0;
                let totalPrice = 0;
                data.forEach(item => {
                    totalQuantity += item.quantity;
                    totalPrice += item.quantity * item.price;
                });
                $(".totalOrdersCountDisplay").text(`Tổng [${totalQuantity} đơn hàng]`);
                $(".totalOrdersDisplayBelts").text(`${totalQuantity} sản phẩm`);
                $(".totalPriceDisplay").text(totalPrice.toLocaleString("vi-VN") + " VNĐ");
                $(".totalCostDisplay").text(totalPrice.toLocaleString("vi-VN") + " VNĐ");
                $("#cart_received").text(cartCount)
            },
            error(responseData) {
                console.log(responseData);
            }
        })
    })


    $(".quantitySelectCart").on("change", function () {
        const selectedQuantity = $(this).val();
        const beltId = $(this).closest(".cart-item").find(".beltId").val();
        const variantId = $(this).closest(".cart-item").find(".variantId").val();

        $.ajax({
            url: '/Cart',
            type: 'POST',
            data: {
                message: "update",
                beltId: beltId,
                variantId: variantId,
                quantity: selectedQuantity,
            },
            success: function (response) {
                console.log("Quantity updated successfully!");
                const data = response;
                let totalQuantity = 0;
                let totalPrice = 0;
                data.forEach(item => {
                    totalQuantity += item.quantity;
                    totalPrice += item.quantity * item.price;
                });
                $(".totalOrdersCountDisplay").text(`Tổng [${totalQuantity} đơn hàng]`);
                $(".totalOrdersDisplayBelts").text(`${totalQuantity} sản phẩm`);
                $(".totalPriceDisplay").text(totalPrice.toLocaleString("vi-VN") + " VNĐ");
                $(".totalCostDisplay").text(totalPrice.toLocaleString("vi-VN") + " VNĐ");
            },
            error: function (xhr, status, error) {
                console.error("Error while updating quantity:", error);
            }
        });
    });
});
