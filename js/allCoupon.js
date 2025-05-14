$(document).ready(function () {
    $(".fa-trash-can").on("click", function () {
        const couponId = $(this).closest("tr").find(".couponId").text();
        console.log(couponId);
        $(".removeModalBody").text(`Xóa coupon #${couponId}`);
        // Xóa các input cũ trước khi thêm mới
        // Xóa các input cũ (nếu có) nhưng giữ lại nút "Xóa"
        $(".deleteBtn input[name='couponId']").remove();
        $(".deleteBtn input[name='message']").remove();

        // Thêm input ẩn vào form nút delete
        $(".deleteBtn").prepend(`
            <input type="hidden" name="couponId" value="${couponId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='couponId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });
    $(".fa-pen-to-square").on("click", function () {
        const couponId = $(this).closest("tr").find(".couponId").text();

        // Make AJAX request to fetch user data
        $.ajax({
            url: "http://localhost:8080/admin/table/coupons",
            method: "GET",
            data: {
                message: "update",
                couponId: couponId,
            },
            dataType: "json",
            success: function (data, textStatus, xhr) {
                console.log('AJAX Success:', data);  // Logs the data
                console.log('Response Status:', textStatus);  // Logs the success status
                // Populate modal fields with fetched data
                $(".modal-title").text(`Sửa coupon #${couponId}`);
                $(".messageCreateOrUpdate").val("update");
                $("input[name='couponCode']").val(data.code);
                $("input[name='discountPercentage']").val(data.discountPercentage);
                $("input[name='startDate']").val(data.startDate);
                $("input[name='endDate']").val(data.endDate);
                $("input[name='showActive']").val(data.isActive);
                // Change button text to 'Cập nhật'
                $(".createOrUpdate").text("Cập nhật").prepend(`
                    <input type="hidden" name="couponId" value="${couponId}">
                `);

                // Show the modal
                $("#createModal").modal("show");
            },
            error: function (xhr, textStatus, errorThrown) {
                // Log the error details
                console.error('AJAX Error:', textStatus, errorThrown);  // Logs the error
                alert("Lỗi không lấy được dữ liệu , thử lại sau.");
            }
        });
    });
    $('#createModal').on('hidden.bs.modal', function () {
        $("#createCouponForm")[0].reset();
        $(".messageCreateOrUpdate").val("create");
        $(".modal-title").text("Tạo Coupon");
        $(".createOrUpdate").text("Tạo");
        $(".createOrUpdate input[name='couponId']").remove();
    });
});