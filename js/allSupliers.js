$(document).ready(function () {
    $(".fa-trash-can").on("click", function () {
        const supplierId = $(this).closest("tr").find(".supplierId").text();
        console.log(supplierId);
        $(".removeModalBody").text(`Xóa nhà cung cấp #${supplierId}`);
        // Xóa các input cũ trước khi thêm mới
        // Xóa các input cũ (nếu có) nhưng giữ lại nút "Xóa"
        $(".deleteBtn input[name='supplierId']").remove();
        $(".deleteBtn input[name='message']").remove();

        // Thêm input ẩn vào form nút delete
        $(".deleteBtn").prepend(`
            <input type="hidden" name="supplierId" value="${supplierId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='supplierId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });
    $(".fa-pen-to-square").on("click", function () {
        const supplierId = $(this).closest("tr").find(".supplierId").text();

        $.ajax({
            url: "http://localhost:8080/admin/inventory/suppliers",
            method: "GET",
            data: {
                message: "takeSupplier",
                supplierId: supplierId,
            },
            dataType: "json",
            success: function (data, textStatus, xhr) {
                console.log('AJAX Success:', data);
                console.log('Response Status:', textStatus);
                $(".modal-title").text(`Sửa nhà cung cấp #${supplierId}`);
                $(".messageCreateOrUpdate").val("update");
                $("input[name='name']").val(data.name);
                $("input[name='contactInfo']").val(data.contactInfo);
                $("input[name='createdAt']").val(data.createdAt);
                $("input[name='updatedAt']").val(data.updatedAt);
                // Change button text to 'Cập nhật'
                $(".createOrUpdate").text("Cập nhật").prepend(`
                    <input type="hidden" name="supplierId" value="${supplierId}">
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
        $(".modal-title").text("Tạo nhà cung cấp");
        $(".createOrUpdate").text("Tạo");
        $(".createOrUpdate input[name='supplierId']").remove();
    });
});