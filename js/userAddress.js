$(document).ready(function () {
    // Event listener for the "Chỉnh sửa" button
    $(".custom_popup").on("click", function () {
        // Get the parent element containing address information
        const parent = $(this).closest(".address__info_div");

        // Retrieve address details from the parent element
        const userId = parent.find(".userInfo").val();
        const addressId = parent.find(".userAddressId").val();
        const userName = parent.find(".custom_name_display").text().trim();
        const addressStreet = parent.find(".custom_address_detail_display").text().trim();
        const addressCity = parent.find(".custom_address").text().trim();
        const phoneNumber = parent.find(".custom_phoneNumber_display").text().trim();
        console.log(userName);
        console.log(addressId);
        console.log(addressStreet);
        console.log(addressCity);
        console.log(phoneNumber);
        console.log(addressStreet);
        console.log(userId);
        // Populate modal fields with the retrieved data
        const modal = $("#editaddressModal");
        $("#updateButton").prepend(`
            <input type="hidden" name="userId" value="${userId}">
            <input type="hidden" name="userAddressId" value="${addressId}">
            <input type="hidden" name="message" value="updateAddress">
        `);
        modal.find("input[name='userAddressId']").val(addressId);
        modal.find(".address_detail").val(addressStreet);
        modal.find(".custom_province option").filter(function () {
            return $(this).text() === addressCity;
        }).prop("selected", true);
        $('#updateButton').on('hidden.bs.modal', function () {
            $("#updateButton input[name='userId']").remove();
            $("#updateButton input[name='userAddressId']").remove();
            $("#updateButton input[name='message']").remove();

        });
    });
    $(".deleteAddress").on("click", function () {
        const parent = $(this).closest(".address__info_div");
        const userId = parent.find(".userInfo").val();
        const addressId = parent.find(".userAddressId").val();
        console.log(userId);
        console.log(addressId);
        const deleteForm = $(".custom_delete_address");
        deleteForm.append(`
        <input type="hidden" name="userId" value="${userId}">
        <input type="hidden" name="userAddressId" value="${addressId}">
        <input type="hidden" name="message" value="delete">
    `);

        $('#deleteModal').on('hidden.bs.modal', function () {
            deleteForm.find("input[name='userId']").remove();
            deleteForm.find("input[name='userAddressId']").remove();
            deleteForm.find("input[name='message']").remove();
        });
    });
});
