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
    $('input[name="name"]').on('blur', function () {
        const name = $(this).val().trim();
        if (name) {
            $.ajax({
                url: '/getColorsAndSizes', method: 'GET', data: {name}, success: function (response) {
                    populateSelect('select[name="coloSelect"]', response.colors);
                    populateSelect('select[name="sizeSelect"]', response.sizes);
                }
            });
        }
    });
    $('input[name="name"]').on('input', function () {
        const keyword = $(this).val().trim();
        if (keyword.length === 0) {
            $('#beltSuggestions').hide();
            return;
        }

        $.ajax({
            url: '/searchBeltNames', method: 'GET', data: {keyword}, success: function (response) {
                const suggestionBox = $('#beltSuggestions');
                suggestionBox.empty();
                if (response.names && response.names.length > 0) {
                    response.names.forEach(name => {
                        suggestionBox.append(`<div class="suggestion-item">${name}</div>`);
                    });
                    suggestionBox.show();
                } else {
                    suggestionBox.hide();
                }
            }
        });
    });

    $('#beltSuggestions').on('click', '.suggestion-item', function () {
        const selected = $(this).text();
        $('input[name="name"]').val(selected);
        $('#beltSuggestions').hide();

        $('input[name="name"]').trigger('blur');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#beltSuggestions, input[name="name"]').length) {
            $('#beltSuggestions').hide();
        }
    });

    $('select[name="coloSelect"]').on('change', function () {
        const name = $('input[name="name"]').val().trim();
        const size = $(this).val();
        const color = $('select[name="coloSelect"]').val();
        if (!color && name && size) {
            $.ajax({
                url: '/getColorsByNameAndSize', method: 'GET', data: {name, size}, success: function (response) {
                    populateSelect('select[name="coloSelect"]', response.colors);
                }
            });
        }
        checkQuantity();
    });

    $('select[name="sizeSelect"]').on('change', function () {
        const name = $('input[name="name"]').val().trim();
        const color = $(this).val();
        const size = $('select[name="sizeSelect"]').val();
        if (!size && name && color) {
            $.ajax({
                url: '/getSizesByNameAndColor', method: 'GET', data: {name, color}, success: function (response) {
                    populateSelect('select[name="sizeSelect"]', response.sizes);
                }
            });
        }
        checkQuantity();
    });

    function checkQuantity() {
        const name = $('input[name="name"]').val().trim();
        const color = $('select[name="coloSelect"]').val();
        const size = $('select[name="sizeSelect"]').val();
        if (name && color && size) {
            $.ajax({
                url: '/getQuantity', method: 'GET', data: {name, color, size}, success: function (response) {
                    $('input[name="quantity"]').val(response.quantity);
                }
            });
        }
    }

    function populateSelect(selector, items) {
        const select = $(selector);
        select.empty();
        select.append(`<option value="">--Chọn--</option>`);
        items.forEach(item => {
            select.append(`<option value="${item}">${item}</option>`);
        });
    }

    $(".submitQuantity").on("submit", function () {
        const color = $('select[name="colorSelect"]').val().trim()
        const size = $('select[name="sizeSelect"]').val().trim()
        const name = $('input[name="name"]').val().trim()
        const quantity = $(`.input[name="quantity"]`).val()
        const submitForm = $(".submitQuantity");
        submitForm.append(`
            <input type="hidden" name="color" value="${color}"/>
             <input type="hidden" name="size" value="${size}"/>
            <input type="hidden" name="name" value="${name}"/>
            <input type="hidden" name="quantity" value="${quantity}"/>
            `)
    })
});
