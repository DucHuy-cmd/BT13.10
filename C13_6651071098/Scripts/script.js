$(document).ready(function () {
    $(".password-show").click(function () {
        $(this).toggleClass("fa-eye-slash");
        var input = $(".input-control");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
});
