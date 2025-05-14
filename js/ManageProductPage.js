$(document).ready(function(){
    $(".custom_click").on("click",function(){
        $(this).closest("tr").remove();
    })
})