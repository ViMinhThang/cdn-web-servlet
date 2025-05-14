$(document).ready(function () {
    $(".fa-pen-to-square").on("click", function () {
        const userId = $(this).closest("tr").find(".userId").text();

        // Make AJAX request to fetch user data
        $.ajax({
            url: "http://localhost:8080/admin/table/users",
            method: "GET",
            data: {
                message: "update",
                userId: userId
            },
            dataType: "json",
            success: function (data, textStatus, xhr) {
                console.log('AJAX Success:', data);
                console.log('Response Status:', textStatus);
                $(".modal-title").text(`Sửa user #${userId}`);
                $(".messageCreateOrUpdate").val("update");
                $("input[name='userName']").val(data.userName);
                $("input[name='Email']").val(data.email);
                $("input[name='gender'][value='" + data.gender + "']").prop("checked", true);
                $("select[name='role']").val(data.role);
                $("input[name='birthDate']").val(data.birthDate);
                $("input[name='phoneNumber']").val(data.phoneNumber);
                $("input[name='showDeleted']").val(data.isDeleted);
                $(".createOrUpdate").text("Cập nhật").prepend(`
                    <input type="hidden" name="userId" value="${userId}">
                `);

                $("#createModal").modal("show");
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('AJAX Error:', textStatus, errorThrown);
                alert("Lỗi không lấy được dữ liệu , thử lại sau.");
            }
        });
    });
    $(".fa-trash-can").on("click", function () {
        console.log(1)
        const userId = $(this).closest("tr").find(".userId").text();
        $(".removeModalBody").text(`Xóa người dùng #${userId}`);
        // Xóa các input cũ trước khi thêm mới
        // Xóa các input cũ (nếu có) nhưng giữ lại nút "Xóa"
        $(".deleteBtn input[name='userId']").remove();
        $(".deleteBtn input[name='message']").remove();

        // Thêm input ẩn vào form nút delete
        $(".deleteBtn").prepend(`
            <input type="hidden" name="userId" value="${userId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='userId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });

    // Reset modal to initial state when hidden
    $('#createModal').on('hidden.bs.modal', function () {
        $("#createUserForm")[0].reset();
        $(".messageCreateOrUpdate").val("create");
        $(".modal-title").text("Tạo người dùng");
        $(".createOrUpdate").text("Tạo");
        $(".createOrUpdate input[name='userId']").remove();
        $(".password-fields").show();
    });
    $('#createModal').on('shown.bs.modal', function () {
        const message = $(".messageCreateOrUpdate").val();
        console.log(message)
        if (message === "update") {
            $(".password-fields").removeClass("d-flex").hide();
        } else {
            $(".password-fields").addClass("d-flex").show();
        }
    });
});
