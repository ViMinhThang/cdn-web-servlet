$(document).ready(function () {
    $(".fa-trash-can").on("click", function () {
        const purchaseId = $(this).closest("tr").find(".purchaseId").text();
        console.log(purchaseId);
        $(".removeModalBody").text(`Xóa phiếu nhập #${purchaseId}`);
        // Xóa các input cũ trước khi thêm mới
        // Xóa các input cũ (nếu có) nhưng giữ lại nút "Xóa"
        $(".deleteBtn input[name='purchaseId']").remove();
        $(".deleteBtn input[name='message']").remove();

        // Thêm input ẩn vào form nút delete
        $(".deleteBtn").prepend(`
            <input type="hidden" name="purchaseId" value="${purchaseId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='purchaseId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });
    $(".fa-pen-to-square").on("click", function () {
        const purchaseId = $(this).closest("tr").find(".purchaseId").text();

        $.ajax({
            url: "http://localhost:8080/admin/inventory/purchases",
            method: "GET",
            data: {
                message: "takePurchase",
                purchaseId: purchaseId,
            },
            dataType: "json",
            success: function (data, textStatus, xhr) {
                console.log('AJAX Success:', data);
                console.log('Response Status:', textStatus);
                $(".modal-title").text(`Sửa phiếu nhập #${purchaseId}`);
                $(".messageCreateOrUpdate").val("update");
                $("input[name='name']").val(data.supplierName);
                $("input[name='productName']").val(data.beltName);
                $("input[name='purchaseDate']").val(data.purchaseDate);
                $("input[name='createdAt']").val(data.createdAt);
                $("input[name='updatedAt']").val(data.updatedAt);
                $("input[name='quantity']").val(data.quantity);
                // Change button text to 'Cập nhật'
                $(".createOrUpdate").text("Cập nhật").prepend(`
                    <input type="hidden" name="purchaseId" value="${purchaseId}">
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
        $(".modal-title").text("Tạo phiếu nhập");
        $(".createOrUpdate").text("Tạo");
        $(".createOrUpdate input[name='purchaseId']").remove();
    });
});