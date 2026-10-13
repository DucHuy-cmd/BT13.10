$(document).ready(function () {
    $(".checkme").click(function () {
        var isChecked = $(this).is(":checked");
        if (isChecked) {
            $(this).parents(".checkbox-card").find(".passport-box").show();
            $(this).parents(".checkbox-card").find(".apply-box").hide();
        } else {
            $(this).parents(".checkbox-card").find(".passport-box").hide();
            $(this).parents(".checkbox-card").find(".apply-box").show();
        }
    });
});
