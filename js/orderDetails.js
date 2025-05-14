$(document).ready(function () {
    $(".custom_button").on("click", function () {
        const orderItemId = $(this).closest("tr").find(".orderItemId").text();
        console.log(orderItemId);
        $(".removeModalBody").text(`Xóa mục đơn hàng #${orderItemId}`);
        // Xóa các input cũ trước khi thêm mới
        // Xóa các input cũ (nếu có) nhưng giữ lại nút "Xóa"
        $(".deleteBtn input[name='couponId']").remove();
        $(".deleteBtn input[name='message']").remove();

        $(".deleteBtn").prepend(`
            <input type="hidden" name="orderItemId" value="${orderItemId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    $('#deleteModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='couponId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });
    $('#addOrderForm').submit(function (e) {
        e.preventDefault();  // Prevent the default form submission

        // Get form data
        const formData = {
            orderId: $('#orderId').val(),
            productName: $('#productName').val(),
            quantity: $('#quantity').val(),
            price: $('#price').val()
        };

        $.ajax({
            url: '/add-Order-details',
            type: 'POST',
            data: formData,
            success: function (response) {
                console.log(response);
                let sanitizedPrice = response.price.replace(',', '.');
                console.log(sanitizedPrice);
                const newRow = `
                    <tr>
                        <th class="p-4 fs-5">${response.id}</th>
                        <td class="p-4 fs-5">${response.beltName}</td>
                        <td class="p-4 fs-5">${response.quantity}</td>
                        <td class="p-4 fs-5">${parseFloat(sanitizedPrice).toFixed(2)}</td>
                        <td class="p-4 fs-5">
                            <button class="custom_button custom_click" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                <img src="../../../assets/icons/delete.svg" width="24px"/>
                            </button>
                        </td>
                    </tr>
                `;
                $('table tbody').append(newRow);

                $('#productName').val('');
                $('#quantity').val('');
                $('#price').val('');
            }, error: function (xhr, status, error) {
                console.error('AJAX Error:', status, error);
            }
        });
    });
});