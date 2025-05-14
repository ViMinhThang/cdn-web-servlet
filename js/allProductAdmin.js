$(document).ready(function () {
    $(".fa-trash-can").on("click", function () {
        const beltId = $(this).closest("tr").find(".beltId").text();
        $(".modal-body").text(`Xóa sản phẩm #${beltId}`);
        // Xóa các input cũ trước khi thêm mới
        // Xóa các input cũ (nếu có) nhưng giữ lại nút "Xóa"
        $(".deleteBtn input[name='beltId']").remove();
        $(".deleteBtn input[name='message']").remove();

        // Thêm input ẩn vào form nút delete
        $(".deleteBtn").prepend(`
            <input type="hidden" name="beltId" value="${beltId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    // (Tùy chọn) Xóa các input khi modal đóng
    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='beltId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });
});

