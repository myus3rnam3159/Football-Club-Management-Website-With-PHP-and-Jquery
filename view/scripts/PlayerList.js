let paginationSelector = "#pgtn";
var getParams = {
  pageNum: 1,
};

getClubIdThroughCookie();

createTableHeadings();
//Thêm danh sách clb
createClubList();
//Thêm danh sách số áo
createNumberList();
//Thêm danh sách quốc tịch
createNationalityList();

getPlayers();

//khi chọn clb
onFilterChange("clubname-menu", "clubId");
//khi chọn số áo
onFilterChange("number-menu", "number");
//khi chọn quốc tịch
onFilterChange("nation-menu", "nation");
//Khi tìm kiếm thay đổi
onSearchChange();

function getClubIdThroughCookie() {
  getParams.clubId = $.cookie("clubid");
  //Test
  //console.log(getParams.clubId);
  $.removeCookie('clubid');
}

function displayAlert(alertMessg, alertName, failed) {
  let alertModalSelector = "#notification";
  let errorSelector = `${alertModalSelector} .alert-danger`

  $(".modal-title").html(alertName);

  if (failed === true) {
    $(errorSelector).text(alertMessg);
  } else {
    $(errorSelector).remove();
    $(`${alertModalSelector} .alert-success`).text(alertMessg);
  }

  $(alertModalSelector).modal("show");
}

function checkUpdateInput(checkPattern, inputText) {
  if (inputText.length === 0 || !RegExp(checkPattern).test(inputText)) {
    return false;
  }
  return true;
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

function onUpdate(playerid) {
  $(`#${playerid} .btn.btn-success`).on("click", function () {
    if (isLoggedIn()) {
      let failedTitle = "Lỗi nhập";
      let editedVals = {};

      editedVals.fullname = $(`#${playerid} .fullname`).text();
      editedVals.nationality = $(`#${playerid} .nationality`).text();
      editedVals.number = $(`#${playerid} .number`).text();
      editedVals.position = $(`#${playerid} .position`).text();

      if (!checkUpdateInput("^[a-zA-Z\\s]*$", editedVals.fullname)) {
        let alertMess = "Tên cầu thủ chỉ chứa chữ, không có kí tự đặc biệt";
        displayAlert(alertMess, failedTitle, true);
        return;
      }

      if (!checkUpdateInput("^[A-Z]{0,2}[A-Z]$", editedVals.position)) {
        let alertMess = "Vị trí thi đấu phải là cụm chữ in hoa, không dấu cách, tối đa 3 kí tự";
        displayAlert(alertMess, failedTitle, true);
        return;
      }

      if (!checkUpdateInput("^[a-zA-Z\\s]*$", editedVals.nationality)) {
        let alertMess = "Quốc tịch là chuỗi kí tự không chứa số, không có kí tự đặc biệt";
        displayAlert(alertMess, failedTitle, true);
        return;
      }

      if (!checkUpdateInput("^[0-9]+$", editedVals.number)) {
        let alertMess = "Số áo không được có chữ và kí tự đặc biệt";
        displayAlert(alertMess, failedTitle, true);
        return;
      }

      editedVals.playerid = playerid;

      //Gửi yêu cầu sửa về server
      $.ajax({
        type: "PATCH",
        url: "http://localhost:80/controller/PlayersController.php",
        data: JSON.stringify(editedVals),
        dataType: "JSON",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (res) {
          //Test
          //console.log(res);
          let mssg = "Đã cập nhật thông tin cầu thủ";
          displayAlert(mssg, "Thông báo", false);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr.responseJSON);
        },
      });
    }
  });
}

function onDelete(playerid) {
  $(`#${playerid} .btn.btn-danger`).on("click", function () {
    if (isLoggedIn()) {
      //Thực hiện xóa
      $.ajax({
        type: "DELETE",
        url: `http://localhost:80/players/${playerid}`,
        success: function (res) {
          getParams.pageNum = $(paginationSelector).twbsPagination("getCurrentPage");
          //Test
          //console.log(getParams.pageNum);
          getPlayers(getParams);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          //Test
          console.log(xhr.responseJSON);
        },
      });
    }
  });
}

function onSearchChange() {
  //Khi search
  let formIdSelector = "#player-name-search-form";

  $(formIdSelector).on("click", "button", function (e) {
    //Tạm dừng event
    e.preventDefault();

    let inputSelector = `${formIdSelector} input`;

    let inputVal = $(inputSelector).val();

    getParams.search = inputVal;
    //Giữ nguyên giá trị tại form
    $(inputSelector).val(inputVal);
    getPlayers(getParams);
  });
}

function onFilterChange(menuId, probName) {
  $(`#${menuId}`).on("click", ".dropdown-item", function (event) {
    //Bắt buộc phải sử dụng this
    let clickedValue = $(this).attr("id");

    $(`#${menuId} .active`).removeClass("active");
    //tag đang được chọn
    $(`#${clickedValue}`).addClass("active");

    if (clickedValue === "all") {
      getParams[probName] = null;
    } else {
      getParams[probName] = clickedValue;
    }

    getPlayers(getParams);
  });
}

function checkClubSelected() {
  if (typeof getParams.clubId !== 'undefined') {
    $("#clubname-menu #all").removeClass("active");
    $(`#${getParams.clubId}`).addClass("active");
  }
}

function getPlayers() {
  let baseUrl = "http://localhost:80/controller/PlayersController.php";
  let paramString = "";

  if (getParams.clubId) {
    paramString += `&club=${getParams.clubId}`;
  }
  if (getParams.number) {
    paramString += `&number=${getParams.number}`;
  }
  if (getParams.nation) {
    paramString += `&nationality=${getParams.nation}`;
  }
  if (getParams.search) {
    paramString += `&search=${getParams.search}`;
  }

  $.ajax({
    type: "GET",
    url: baseUrl + `?pageIndex=${getParams.pageNum}` + paramString,
  }).done(function (result) {
    appendPlayers(result.data.players);

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
          url: baseUrl + `?pageIndex=${page}` + paramString,
        }).done(function (result) {
          appendPlayers(result.data.players);
        });
      },
    });
  });
}

function returnItemData(obj, probName) {
  if (probName) return obj[probName];
  return obj;
}
function handleFilterResponse(response, itemId, itemName, menuId) {
  let dataArray = response.data;
  let arrLength = dataArray.length;
  var template = `
      <a 
        class="dropdown-item active" 
        href="#" 
        id = "all"
      >
       Tất cả
      </a>
      `;

  let i = 0;
  while (i < arrLength) {
    template += `
      <a 
      class="dropdown-item" 
      href="#" 
      id = "${returnItemData(dataArray[i], itemId)}"
    >
      ${returnItemData(dataArray[i], itemName)}
    </a>
      `;
    i++;
  }
  $(`#${menuId}`).html(template);
}

function createClubList() {
  let filterMenuId = "clubname-menu";
  let getUrl = "http://localhost:80/controller/ClubsController.php";

  createDropdown("Chọn câu lạc bộ", filterMenuId);

  $.ajax({
    type: "GET",
    url: getUrl,
  }).done(function (result) {
    handleFilterResponse(result, "clubid", "clubname", filterMenuId);
    checkClubSelected();
  });
}

function createNationalityList() {
  let filterMenuId = "nation-menu";
  let getUrl = "http://localhost:80/controller/NationalitiesController.php";

  createDropdown("Chọn quốc tịch", filterMenuId);

  $.ajax({
    type: "GET",
    url: getUrl,
  }).done(function (result) {
    handleFilterResponse(result, null, null, filterMenuId);
  });
}

function createNumberList() {
  let filterMenuId = "number-menu";
  createDropdown("Chọn số áo", filterMenuId);
  $.ajax({
    type: "GET",
    url: "http://localhost:80/controller/NumbersController.php",
  }).done(function (result) {
    handleFilterResponse(result, null, null, filterMenuId);
  });
}

function createDropdown(buttonName, menuId) {
  let dropdownTemplate = `
    <div class="dropdown" >
      <button 
        class="btn btn-secondary dropdown-toggle bg-info"
        type="button"
        
        data-toggle="dropdown"
        aria-expanded="false"
        >
        ${buttonName}
      </button>
      <div
        class="dropdown-menu"
        id="${menuId}"
        >
      </div>
    </div>
  `;
  $("#filter-list").append(dropdownTemplate);
}

function createTableHeadings() {
  //Danh sách tên cột
  let colHeadings = ["Tên đầy đủ", "Quốc tịch", "Số áo", "Vị trí", "Xóa", "Sửa"];
  let headingNum = colHeadings.length;
  let headingsTemplate = "";

  let i = 0;
  while (i < headingNum) {
    headingsTemplate += `<th scope="col">${colHeadings[i]}</th>`;
    i++;
  }

  $("#table-headings").append(headingsTemplate);
}

function appendPlayers(playerArray) {
  let playerNum = playerArray.length;
  let playerTemplate = "";

  let i = 0;
  while (i < playerNum) {
    playerTemplate += `
            <tr class="table-info" id="${playerArray[i].playerid}">
                <td class = "fullname" contenteditable="true">${playerArray[i].fullname}</td>
                <td class = "nationality" contenteditable="true">${playerArray[i].nationality}</td>
                <td class = "number" contenteditable="true">${playerArray[i].number}</td>
                <td class = "position" contenteditable="true">${playerArray[i].position}</td>
                <td>
                  <button type="button" class="btn btn-danger" >Xóa</button>
                </td>
                <td>
                  <button type="button" class="btn btn-success">Sửa</button>
                </td>
            </tr>
            <script>
              onDelete(${playerArray[i].playerid});
              onUpdate(${playerArray[i].playerid});
            </script>
        `;
    i++;
  }
  $("#table-lines").html(playerTemplate);
}
