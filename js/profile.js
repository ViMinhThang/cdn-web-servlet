$(document).ready(function() {
    $('#openFormButton').click(function() {
        console.log('openFormButton clicked');
        $('#popupForm').fadeIn(); 
    });

    $('#closeFormButton').click(function() {
        $('#popupForm').fadeOut(); 
    });

    $('#submitButton').click(function() {
        const newText = $('#newText').val();
        if (newText) {
            $('.dynamic__text').text(newText); 
            $('#popupForm').fadeOut(); 
            $('#newText').val(''); 
        } else {
            alert('Please enter some text'); 
        }
    });

    $(window).click(function(event) {
        if ($(event.target).is('#popupForm')) {
            $('#popupForm').fadeOut();
        }
    });
});