$(document).ready(function () {
    $(".fa-trash-can").on("click", function () {
        const reviewId = $(this).closest("tr").find(".reviewId").text();
        console.log(reviewId);
        $(".removeModalBody").text(`Xóa review #${reviewId}`);
        // Xóa các input cũ trước khi thêm mới
        // Xóa các input cũ (nếu có) nhưng giữ lại nút "Xóa"
        $(".deleteBtn input[name='reviewId']").remove();
        $(".deleteBtn input[name='message']").remove();

        // Thêm input ẩn vào form nút delete
        $(".deleteBtn").prepend(`
            <input type="hidden" name="reviewId" value="${reviewId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='reviewId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });

});