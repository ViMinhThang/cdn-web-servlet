$(document).ready(function () {
        let dropdown = $(".search-dropdown");
        let productList = $("#list__product__row");
        dropdown.removeClass("show");

        function showDropdown(query) {
            productList.empty();

            if (query.length > 0) {
                dropdown.addClass("show");
                $.ajax({
                    url: `/search?q=${query}`,
                    method: "GET",
                    success: function (data) {
                        productList.empty();

                        if (data.length > 0) {
                            data.forEach(belt => {
                                if (belt.beltVariants && belt.beltVariants.length > 0) {
                                    belt.beltVariants.forEach(variant => {
                                        productList.append(`
                                    <div class="col-2">
                                        <a href="/productDetails?beltId=${belt.id}&variantId=${variant.id}" 
                                           class="text-decoration-none text-dark">
                                            <div class="text-center hover--black border border-white">
                                                <img src="${variant.images && variant.images.length > 0 ? variant.images[0] : '/default-image.jpg'}"
                                                     class="img-fluid w-100 rounded shadow-sm" 
                                                     alt="${belt.name}" style="height: 10rem; object-fit: cover;"/>
                                                <div class="mt-2 text-start ps-3 pb-3">
                                                    <p class="fw-bold fs-5 mb-1">${belt.price} VNĐ</p>
                                                    <h4 class="text-muted mb-1">${belt.name}</h4>
                                                    <p class="badge bg-secondary">${belt.discountRate}%</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                `);
                                    });
                                }
                            });
                        }
                    },
                    error: function () {
                        dropdown.append(`<div class="dropdown-item text-danger">Lỗi khi lấy dữ liệu</div>`);
                    }
                });
            }
        }


        $(".search__input").on("input click", function () {
            showDropdown($(this).val().trim());
            $(".dimmer").addClass("active");
            $(".search_container").css("z-index", "1");
        });

        $(document).on("click", function (e) {
            if (!$(e.target).closest(".search__input, .search-dropdown").length) {
                dropdown.removeClass("show");
                $(".dimmer").removeClass("active");

            }
        });
    }
)
;