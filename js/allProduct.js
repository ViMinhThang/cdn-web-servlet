$(document).ready(function () {
    $(document).on("click", ".fa-trash-can", function () {
        const row = $(this).closest("tr");

        const productId = row.find(".productId").text().trim()
        const variantId = row.find(".variantId").text().trim()

        console.log(productId)
        console.log(variantId)

        $("#removeModalBody").text(`Xóa sản phẩm này #${productId} #${variantId} `);
        $(".deleteBtn input").remove();

        $(".deleteBtn").prepend(`
        <input type="hidden" name="productId" value="${productId}">
        <input type="hidden" name="variantId" value="${variantId}">
        <input type="hidden" name="message" value="delete">
    `);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='variantId']").remove();
        $(".deleteBtn input[name='productId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });
});
