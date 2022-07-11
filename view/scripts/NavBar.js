let foreUlClass = ".navbar-nav.me-auto";
let logOutTitle = "Đăng xuất";
let tokenKey = "adminpw";
let modalIdSelector = "#login-form-modal";
let loginFormIdSelector = "#login-form";

loadAdmin();
login();

function checkUserInput(userInput, checkPattern, alertMessg, selector){

  let alertSelector = `${selector} + .alert-danger`;

  if (!RegExp(checkPattern).test(userInput)) {

    if ($(alertSelector).length === 0) {

      $(selector).after(
        `<div class="alert alert-danger" role="alert">
          ${alertMessg}
        </div>`
      );
    }
    return false;
  }
  
  $(alertSelector).remove();
  return true;
}

function loadLogInButton(btnId, modalSelector, selector){
  let btnTemplate = `
        <button 
            class="btn btn-secondary my-2 my-sm-0" 
            type="submit"
            data-toggle="modal"
            data-target="${modalSelector}"
            id = "${btnId}"
        >Đăng nhập
        </button>
    `;
    $(selector).after(btnTemplate);

    $("#login-btn").on("click", function(e){
      $(loginFormIdSelector)[0].reset();
      $(`${loginFormIdSelector} .alert`).remove();
    });
}

function loadLoggedInDropdown(selector, btnName, logOutName) {
  //Xóa nút đăng nhập
  $('#login-btn').remove();
  //Thoát modal
  template = `
        <div class="btn-group">
            <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                Xin chào ${btnName}
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">${logOutName}</a>
            </div>
        </div>
      `;
  $(selector).after(template);
}

function login() {
  $("#login-form").submit(function (e) {
    e.preventDefault();

    let user = {};
    let selector = {};

    selector.uid = "#userid";
    selector.pw = "#password";

    user.userid = $(selector.uid).val();
    user.upassword = $(selector.pw).val();

    let messg = "Mã đăng nhập phải toàn số, 8 đến 15 kí tự";
    let pattern = "^[0-9]{8,15}$";

    if(!checkUserInput(user.userid, pattern, messg, selector.uid)){
      return;
    }

    pattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$";
    messg = "Mật khẩu phải không cách, không dấu, không kí tự đặc biệt, có số, có viết hoa 8 đến 15 kí tự";
    
    if(!checkUserInput(user.upassword, pattern, messg, selector.pw)){
      return;
    }

    //Gửi về cho server
    $.ajax({
      type: "POST",
      url: "http://localhost:80/controller/UsersController.php",
      data: JSON.stringify(user),
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", 'application/json');
      },
      success: function (res) {
        //Lưu token vào browser local storage
        localStorage.setItem(tokenKey, res.data.upassword);
        //Ẩn modal
        $(modalIdSelector).modal('hide');
        loadLoggedInDropdown(foreUlClass, res.data.uname, logOutTitle);

      },
      error: function (xhr, ajaxOptions, thrownError) {
        //Test
        console.log(xhr.responseJSON);
      },
    });
  });
}

function loadAdmin() {
  const adminPw = localStorage.getItem(tokenKey);
  if (!adminPw) {
    //Do css bị chặn bởi !important rule của bootstrap css nên dùng cách này để thêm/ xóa nút.
    //Trong string bên dưới có chức năng popup modal đăng nhập
    loadLogInButton("login-btn", modalIdSelector, foreUlClass);
    return;
  }
  $.ajax({
    type: "GET",
    url: "http://localhost:80/controller/UsersController.php",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", adminPw);
    },
    success: function (result) {
      loadLoggedInDropdown(foreUlClass, result.data.uname, logOutTitle);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //In ra lỗi
      console.log(xhr.responseJSON);
    },
  });
}
