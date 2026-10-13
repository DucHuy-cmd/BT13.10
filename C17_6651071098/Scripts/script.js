$(document).ready(function () {
    $("h3").click(function () {
        // Ẩn tất cả các nội dung (.box) khác ngoại trừ div tiếp theo của tiêu đề đang click
        $(".box").not($(this).next(".box")).slideUp();

        // Hiển thị (hoặc ẩn nếu đang mở) nội dung div tiếp theo ngay sau tiêu đề được click
        $(this).next(".box").slideToggle();
    });
});
