$(document).ready(function () {
    $(".fa-trash-can").on("click", function () {
        const orderId = $(this).closest("tr").find(".orderId").text();
        console.log(orderId);
        $(".removeModalBody").text(`Xóa order #${orderId}`);
        $(".deleteBtn input[name='orderId']").remove();
        $(".deleteBtn input[name='message']").remove();

        $(".deleteBtn").prepend(`
            <input type="hidden" name="orderId" value="${orderId}">
            <input type="hidden" name="message" value="delete">
        `);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $(".deleteBtn input[name='orderId']").remove();
        $(".deleteBtn input[name='message']").remove();
    });
    $('#createModal').on('hidden.bs.modal', function () {
        $("#createCouponForm")[0].reset();
        $(".messageCreateOrUpdate").val("create");
        $(".modal-title").text("Tạo Đơn hàng mới");
        $(".createOrUpdate").text("Tạo");
        $(".createOrUpdate input[name='orderId']").remove();
    });
    const $userId = $('#userId');
    const $suggestionList = $('#suggestionList');
    $userId.on('input', function () {
        const query = $(this).val();

        if (query.length >= 2) {
            $.ajax({
                url: '/search-users',
                method: 'GET',
                data: {query: query},
                dataType: 'json',
                success: function (users) {
                    $suggestionList.empty().show();

                    if (users.length > 0) {
                        $.each(users, function (index, user) {
                            const listItem = `<li class="list-group-item">${user.id} - ${user.name}</li>`;
                            $suggestionList.append(listItem);
                        });
                    } else {
                        $suggestionList.append('<li class="list-group-item">Không tìm thấy kết quả</li>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi khi tìm kiếm người dùng:', error);
                    $suggestionList.hide();
                },
            });
        } else {
            $suggestionList.hide();
        }
    });
    $suggestionList.on('click', 'li', function () {
        const selectedUser = $(this).text().split(' - ')[0];
        $userId.val(selectedUser);
        $suggestionList.hide();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#userId, #suggestionList').length) {
            $suggestionList.hide();
        }
    });
});