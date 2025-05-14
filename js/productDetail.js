$(document).ready(function () {

    var currentPage = 1;
    var reviewsPerPage = 5;
    window.loadReviews = function (page) {
        var beltId = $("#beltIdReviews").val();
        var variantId = $("#variantIdReviews").val()
        $.ajax({
            url: '/getReviews', type: 'GET', data: {
                beltId: beltId, variantId: variantId, page: page, size: reviewsPerPage
            }, success: function (response) {
                $('#reviewsContainer').html(response.reviewsHTML);

                updatePagination(response.totalPages, page);
            }, error: function () {
                alert('Error loading reviews.');
            }
        });


    };
    $(".addToCart__button").on("click", function () {
        const $button = $(this);
        const originalContent = $button.html();
        const loadingSpinner = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Đang xử lý...
    `;

        $button.html(loadingSpinner).prop("disabled", true);

        const beltName = $(".product_detail--name").text();
        const quantity = $("#quantity").val();
        const fullText = $(".belts-price").clone().children().remove().end().text().trim();
        const beltId = $("#beltIdReviews").val();
        const price = fullText.replace('VNĐ', '').trim();
        const variantId = $("#variantIdReviews").val();
        $.ajax({
            url: `/Cart?message=add&beltName=${beltName}`,
            type: 'POST',
            data: {
                message: "add",
                beltId: beltId,
                beltName: beltName,
                quantity: quantity,
                variantId: variantId,
                price: price,
            },
            success: function (response) {
                if (response.status === 'error') {
                    $(".custom_toast_text").text(`${response.message}`);
                    $("#liveToast").removeClass("hide").addClass("show");
                } else {
                    $("#liveToast").removeClass("hide").addClass("show");
                    console.log(response);
                    let cartCount = parseInt($("#cart_received").text(), 10) + 1;
                    $("#cart_received").text(cartCount);
                    $button.html(originalContent).prop("disabled", false);
                }
            },
            error: function (xhr) {
                $(".custom_toast_text").text("Thêm vào giỏ hàng thất bại");
                $("#liveToast").removeClass("hide").addClass("show");

                $button.html(originalContent).prop("disabled", false);
            }
        });

    })
    ;

    function updatePagination(totalPages, currentPage) {
        var paginationHtml = '';

        for (var i = 1; i <= totalPages; i++) {
            paginationHtml += '<li class="page-item ' + (i === currentPage ? 'active' : '') + '">';
            paginationHtml += '<a class="page-link text-dark" onclick="loadReviews(' + i + ')">' + i + '</a>';
            paginationHtml += '</li>';
        }

        paginationHtml = ` 
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link text-dark"  onclick="loadReviews(${currentPage - 1})">&laquo;</a>
            </li>
            ${paginationHtml}
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link text-dark" onclick="loadReviews(${currentPage + 1})">&raquo;</a>
            </li>
        `;

        $('#pagination__bar .pagination').html(paginationHtml);
    }

    window.toggleImage = function (index) {
        const wrapper = $(`.image-wrapper[data-index='2']`);


        const button = $(`.see-more-btn[data-index='${index}']`);


        const expanded = wrapper.toggleClass("expanded").hasClass("expanded");
        wrapper.css("max-height", expanded ? "1000px" : "300px");

        button.text(expanded ? "See Less" : "See More");
    };

    $(".see-more-btn").on("click", function () {
        const index = $(this).data("index");
        window.toggleImage(index);
    });
    loadReviews(currentPage)

});
