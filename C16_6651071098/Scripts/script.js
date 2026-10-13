$(document).ready(function () {
    // Khởi tạo datepicker cho ô Birthdate
    if ($.fn.datepicker) {
        $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            yearRange: "1950:2026"
        });
    }

    // Xử lý khi nhấn nút Add Row
    $(".add-row").click(function () {
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var birthdate = $("#datepicker").val().trim();

        if (name === "" || email === "" || birthdate === "") {
            alert("Vui lòng nhập đầy đủ thông tin Name, Email và Birthdate!");
            return;
        }

        // Kiểm tra định dạng email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng! Vui lòng nhập lại (ví dụ: example@gmail.com).");
            $("#email").focus();
            return;
        }

        // Kiểm tra định dạng ngày tháng (dd/mm/yyyy, mm/dd/yyyy hoặc dd-mm-yyyy)
        var dateRegex = /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/;
        if (!dateRegex.test(birthdate)) {
            alert("Ngày sinh không đúng định dạng ngày tháng (dd/mm/yyyy)!");
            $("#datepicker").focus();
            return;
        }

        var markup =
            "<tr>" +
            "<td><input type='checkbox' name='record'></td>" +
            "<td>" + name + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + birthdate + "</td>" +
            "</tr>";

        $("table tbody").append(markup);

        // Xóa dữ liệu trên các ô input sau khi thêm
        $("#name").val("");
        $("#email").val("");
        $("#datepicker").val("");
    });

    // Xử lý khi nhấn nút Delete Row
    $(".delete-row").click(function () {
        $("table tbody").find('input[name="record"]').each(function () {
            if ($(this).is(":checked")) {
                $(this).parents("tr").remove();
            }
        });
    });
});
