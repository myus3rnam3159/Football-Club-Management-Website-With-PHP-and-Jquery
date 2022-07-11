let paginationSelector = "#pgtn";
var getParams = {
  pageNum: 1,
};
createTableHeadings();
getClubs();

function viewPlayerList(clubid){
  $(`#${clubid} .btn.btn-warning`).on("click", function () {
    $.cookie('clubid', clubid);
    window.location.assign("http://localhost/view/PlayerList.php");
    return;
  });
}

function alert(banner, tmplt) {
  $(".modal-title").text(banner);
  $(".modal-body").html(tmplt);
  $("#notification").modal("show");
}

function alertSuccess(alertString, successNof) {
  let template = `
    <div class="alert alert-success" role="alert">
        ${successNof}
    </div>
  `;
  alert(alertString, template);
}

function alertErrors(alertString, errorTypeName) {
  let template = `
    <div class="alert alert-danger" role="alert">
        ${errorTypeName}
    </div>
  `;
  alert(alertString, template);
}

function onUpdate(clubid) {
  $(`#${clubid} .btn.btn-success`).on("click", function () {
    if (isLoggedIn()) {
      let editedVals = {};
      let clubInfoCheckProbs = [
        {
          probname: "clubname",
          reg: "^[a-zA-Z\\s]*$",
          alert: "Tên câu lạc bộ là bắt buộc và chỉ chứa chữ, không có kí tự đặc biệt",
        },
        {
          probname: "shortname",
          reg: "^[A-Z]{0,2}[A-Z]$",
          alert: "Tên viết tắt là bắt buộc và phải là cụm chữ in hoa, không dấu cách, tối đa 3 kí tự",
        },
      ];

      editedVals.clubname = $(`#${clubid} .clubname`).text();
      editedVals.shortname = $(`#${clubid} .shortname`).text();

      
      let i = 0;
      let arrLen = clubInfoCheckProbs.length;

      while (i < arrLen) {
        let inputText = editedVals[clubInfoCheckProbs[i].probname];
        if (inputText.length === 0 || RegExp(clubInfoCheckProbs[i].reg).test(inputText) === false) {
          alertErrors("Lỗi nhập", clubInfoCheckProbs[i].alert);
          return;
        }
        i++;
      }

      editedVals.clubid = clubid;

      //Gửi yêu cầu sửa về server
      $.ajax({
        type: "PATCH",
        url: "http://localhost:80/controller/ClubsController.php",
        data: JSON.stringify(editedVals),
        dataType: "JSON",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (res) {
          //Test
          //console.log(res);
          let mssg = "Đã cập nhật thông tin câu lạc bộ";
          alertSuccess("Thông báo", mssg);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr.responseJSON);
        },
      });
    }
  });
}

function isLoggedIn() {
  const adminPw = localStorage.getItem("adminpw");
  if (!adminPw) {
    //Login form template của NavBar
    $("#login-form-modal").modal("show");
    //Handle đăng nhập - có thể viết hàm trong navbar.js (ví navbar.js load trước)
    return false;
  }
  return true;
}

function onDelete(clubid) {
  $(`#${clubid} .btn.btn-danger`).on("click", function () {
    if (isLoggedIn()) {
      //Thực hiện xóa
      $.ajax({
        type: "DELETE",
        url: `http://localhost:80/clubs/${clubid}`,
        success: function (res) {
          getParams.pageNum = $(paginationSelector).twbsPagination("getCurrentPage");
          //Test
          //console.log(getParams.pageNum);
          getClubs(getParams);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          //Test
          console.log(xhr.responseJSON);
        },
      });
    }
  });
}

function appendClubs(clubArray) {
  let clubNum = clubArray.length;
  let clubTemplate = "";

  let i = 0;
  while (i < clubNum) {
    clubTemplate += `
              <tr class="table-info" id="${clubArray[i].clubid}">
                  <td class = "clubname" contenteditable="true">${clubArray[i].clubname}</td>
                  <td class = "shortname" contenteditable="true">${clubArray[i].shortname}</td>
                  <td>
                    <button type="button" class="btn btn-danger" >Xóa</button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-success">Sửa</button>
                  </td>
                  <td>
                  <button type="button" class="btn btn-warning">Xem danh sách cầu thủ</button>
                  </td>

              </tr>
              <script>
                onDelete(${clubArray[i].clubid});
                onUpdate(${clubArray[i].clubid});
                viewPlayerList(${clubArray[i].clubid});
              </script>
          `;
    i++;
  }
  $("#table-lines").html(clubTemplate);
}

function getClubs() {
  let baseUrl = "http://localhost:80/controller/ClubsController.php";

  $.ajax({
    type: "GET",
    url: baseUrl + `?pageIndex=${getParams.pageNum}`,
  }).done(function (result) {
    //Test
    //console.log(result);
    appendClubs(result.data.clubs);

    var pagtn = $(paginationSelector);

    pagtn.twbsPagination("destroy");
    pagtn.twbsPagination({
      startPage: getParams.pageNum,
      totalPages: Math.floor(result.data.count / 10) + 1,
      visiblePages: 7,
      prev: "Trang trước",
      next: "Trang kế",
      first: "Trang đầu",
      last: "Trang cuối",
      onPageClick: function (evt, page) {
        $.ajax({
          type: "GET",
          url: baseUrl + `?pageIndex=${page}`,
        }).done(function (result) {
          appendClubs(result.data.clubs);
        });
      },
    });
  });
}

function createTableHeadings() {
  //Danh sách tên cột
  let colHeadings = ["Tên câu lạc bộ", "Tên viết tắt", "Xóa", "Sửa", "Xem danh sách cầu thủ"];
  let headingNum = colHeadings.length;
  let headingsTemplate = "";

  let i = 0;
  while (i < headingNum) {
    headingsTemplate += `<th scope="col">${colHeadings[i]}</th>`;
    i++;
  }

  $("#table-headings").append(headingsTemplate);
}
