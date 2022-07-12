# Nếu trên button không sử dụng seletor + hàm on() được -> dùng onlick = "hàm đã khai báo"
# Phải luôn đảm bảo các custom script đặt dưới script của jquery  
# Chỉ sử document ready khi cần, không dùng bậy bạ
# Xử lý content được tải lên bởi ajax với hàm nằm ngoài ajax  
    1. https://learn.jquery.com/events/event-delegation/  
    2. https://api.jquery.com/on/#direct-and-delegated-events  

# Pagination docs: https://esimakin.github.io/twbs-pagination/  
# Jquery cookie cdn: https://cdnjs.com/libraries/jquery-cookie

# Jquery cdn: https://releases.jquery.com/

# Hiện tại đang dùng Boostrap 4.6: https://getbootstrap.com/docs/4.6/getting-started/introduction/  
    1. Theme: https://bootswatch.com/zephyr/  
    2. https://getbootstrap.com/docs/4.6/components/  
# Bootstrap 5.2
    1. Install icons: https://icons.getbootstrap.com/#install  
    2. Install css-js: https://getbootstrap.com/docs/5.2/getting-started/introduction/

# File tự động là index.html -> nếu không có file này thì server sẽ trả về thông tin cây thư mục FCMS  

# Nếu chạy folder FCMS trên các bộ như XAMPP thì không cần configure như bên dưới

# Configure để apache server dùng DocumentRoot là folder FCMS  
    1. Trong windows 11, vào C:/Apache24/conf và mở file httpd.conf = vscode - tương tự với các OS khác.  
    2. Tim "DocumentRoot" là thay đổi giá trị trong cặp nháy bên trái thành đường dẫn tới folder mong muốn - ví dụ:  
        ** c:/Users/war4m/OneDrive/Desktop/SourceRepos/Hcmus/UngDungPhanTan/ONha/FCMS **  

# Chạy apache server như một service trong windows
    a. bật powershell - admin trong apache\bin  
    b. gõ .\httpd.exe -k install  để cài -> install -> uninstall để gỡ cài đặt
    c. vào control panel  
    d. tìm "services" -> view local services -> chọn start/stop để mở/đóng service.   
    e. chọn start để chạy server / net start apache2.4 trong cmdline  
    f. chọn stop để tắt server / net stop apache2.4 trong cmdline  

#Nguồn tham khảo  
    1. Nên để script tag ở đâu trong file html: https://stackoverflow.com/questions/19985457/where-can-i-put-a-script-tag/19985528#19985528  
    2. Khi nào sử dụng var / let trong js: https://www.jstips.co/en/javascript/keyword-var-vs-let/  
    3. Trong php include thì nều phần được include bị lỗi các phần khác vẫn chạy, còn require thì nếu phần được require bị lỗi -> không chạy các phần còn lại  
    4. Vòng lặp với mảng chuỗi trong js: https://stackoverflow.com/questions/14777030/iterate-over-a-list-of-values-using-javascript  
    5. Thêm items vào danh sách trong html: https://stackoverflow.com/questions/48521180/appending-bootstrap-list-group-item-to-list-group-with-jquery  
    6. Thêm chuỗi vào chuỗi rỗng có sẵn: https://stackoverflow.com/questions/16243870/concatenating-an-empty-string  
    7. Nối chuỗi trong js: https://stackoverflow.com/questions/16696632/most-efficient-way-to-concatenate-strings-in-javascript  
    8. Cách tốt nhất để lặp: https://stackoverflow.com/questions/5349425/whats-the-fastest-way-to-loop-through-an-array-in-javascript  
    9. Banner (breadcrumb): https://stackoverflow.com/questions/38699010/dynamic-breadcrumb-based-on-current-page-list-using-javascript-jquery  
    10. Tránh reload form ngay lập tức khi submit: https://stackoverflow.com/questions/45634088/how-to-prevent-page-from-reloading-after-form-submit-jquery  
    11. Lấy giá trị của input field: https://www.geeksforgeeks.org/how-to-get-the-value-in-an-input-text-box-using-jquery/  
    12. Gọi script từ source trong file html: https://stackoverflow.com/questions/35606147/how-to-call-javascript-function-from-script-tag  
    13. Chèn clickable button vào bảng trong bootstrap: https://stackoverflow.com/questions/32888916/click-event-on-button-inside-table  
    14. Chế độ !important trong css display: https://stackoverflow.com/questions/11890739/can-i-use-jquery-to-remove-negate-css-important-rule  
    15. Chống conflict trong jquery: https://learn.jquery.com/using-jquery-core/avoid-conflicts-other-libraries/  
    16. Gửi get request với authorization header với ajax: https://stackoverflow.com/questions/10113911/sending-authorization-headers-with-jquery-and-ajax  
    15 Lấy error response với php, đổi Text -> JSON: https://stackoverflow.com/questions/1637019/how-to-get-the-jquery-ajax-error-response-text  
    16 Ẩn bootstrap element:  
        https://getbootstrap.com/docs/4.6/utilities/visibility/  + chú ý class "collapse"  
        https://stackoverflow.com/questions/54796644/jquery-show-hide-not-working-after-upgrade-to-bootstrap-4-jquery-3-3-1  
    17 Đọc kĩ phần modal: https://getbootstrap.com/docs/4.6/components/modal/  
    18 Trigger modal: https://stackoverflow.com/questions/29159315/how-to-open-bootstrap-modal-without-button-click  
    18. Chọn element liền sau - ko phải con: https://way2tutorial.com/css/css_next_sibling_selector.php  
    19. Validator với regex: https://stackoverflow.com/questions/21727456/jquery-value-match-regex  
    20. alert text with bootstrap: https://getbootstrap.com/docs/4.6/components/alerts/  
    21. Phải convert js object to json trước khi gửi ajax post request:  
        https://stackoverflow.com/questions/51269925/jquery-how-to-send-json-data-in-ajax-post  
        https://www.geeksforgeeks.org/how-to-convert-js-object-to-json-string-in-jquery-javascript/  
    22. Xóa element với jquery: https://stackoverflow.com/questions/35098005/how-to-remove-button-with-jquery   
    23. Ẩn modal: https://stackoverflow.com/questions/29754902/close-bootstrap-modal-after-submit  
    24. Lấy value từ td element: https://stackoverflow.com/questions/3378272/to-get-a-value-of-a-td-using-jquery/3378279#3378279
    25. Set giá trị cho div trong jquery: https://stackoverflow.com/questions/1570905/use-jquery-to-set-value-of-div-tag  
    26. Hàm chèn element trước một element khác với hàm before trong jquery: https://api.jquery.com/before/#before-content-content  
    27. Check hàm underined: https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript  
    28. Sử dụng cookie trong jquery:  
        https://www.aspsnippets.com/Articles/Send-Pass-Data-Values-from-one-page-to-another-using-jQuery.aspx  
        https://stackoverflow.com/questions/20877142/how-to-save-data-in-a-cookie-using-jquery  
    29. Xóa cookie vs jquery: https://stackoverflow.com/questions/3671659/how-to-delete-a-cookie-using-jquery/3671790#3671790