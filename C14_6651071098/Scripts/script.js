$(document).ready(function () {
    $(".toggle-switch-2").change(function () {
        if ($(this).is(":checked")) {
            // Toggle thành "On" -> chuyển sang theme nền sáng (on.png)
            $("#image-effect-2 img[src$='on.png']").addClass("fadeEffect");
            $("#image-effect-2 img[src$='off.png']").removeClass("fadeEffect");
        } else {
            // Toggle thành "Off" -> chuyển sang theme nền tối (off.png)
            $("#image-effect-2 img[src$='off.png']").addClass("fadeEffect");
            $("#image-effect-2 img[src$='on.png']").removeClass("fadeEffect");
        }
    });
});
