let clubItemsId = "club-items";
var newPlayer = {};
let btnSelector = "#save-btn";
let inputProbs = [
  {
    id: "fullname",
    label: "Tên đầy đủ",
    checkPattern: "^[a-zA-Z\\s]*$",
    alert: "Tên cầu thủ là bắt buộc và chỉ chứa chữ, không có kí tự đặc biệt",
  },
  {
    id: "position",
    label: "Vị trí chơi bóng",
    checkPattern: "^[A-Z]{0,2}[A-Z]$",
    alert: "Vị trí thi đấu phải là bắt buộc và là cụm chữ in hoa, không dấu cách, tối đa 3 kí tự",
  },
  {
    id: "nationality",
    label: "Quốc tịch",
    checkPattern: "^[a-zA-Z\\s]*$",
    alert: "Quốc tịch là bắt buộc và là chuỗi kí tự không chứa số, không có kí tự đặc biệt",
  },
  {
    id: "number",
    label: "Số áo",
    checkPattern: "^[0-9]+$",
    alert: "Số áo là bắt buộc và không được có chữ và kí tự đặc biệt",
  },
];

loadClubDropDown();
loadForm();
handleClubSelect();
savePlayerForm();

function handleClubSelect(){
    $(`#${clubItemsId}`).on("click", ".dropdown-item", function () {
        //Bắt buộc phải sử dụng this
        newPlayer.clubid = $(this).attr("id");
        $(`#${clubItemsId} .active`).removeClass("active");
        //tag đang được chọn
        $(`#${newPlayer.clubid}`).addClass("active");
      });
}

function loadClubDropDown() {
  let dropdownTemplate = `
    <div class="dropdown" >
      <button 
        class="btn btn-secondary dropdown-toggle bg-info"
        type="button"
        
        data-toggle="dropdown"
        aria-expanded="false"
        >
       Chọn câu lạc bộ
      </button>
      <div
        class="dropdown-menu"
        id="${clubItemsId}"
        >
      </div>
    </div>
  `;
  let getUrl = "http://localhost:80/controller/ClubsController.php";


  $("#club-list").html(dropdownTemplate);
  $.ajax({
    type: "GET",
    url: getUrl,
  }).done(function (result) {
    let dataArray = result.data;
    let arrLength = dataArray.length;
    let i = 0;
    var template = "";

    while (i < arrLength) {
      template += `
      <a 
        class="dropdown-item" 
        href="#" 
        id = "${dataArray[i].clubid}"
    >
      ${dataArray[i].clubname}
    </a>
      `;
      i++;
    }
    $(`#club-items`).html(template);
  });
}

function createAlert(modalTit, templt) {
  $(".modal-title").text(modalTit);
  $(".modal-body").html(templt);
  $('#notification').modal("show");
}

function checkPlayerInput(inputVal, checkReg, alertMess) {
  if (inputVal !== null && inputVal.length > 0 && RegExp(checkReg).test(inputVal)) {
    return true;
  }

  let template = `
    <div class="alert alert-danger" role="alert">
        ${alertMess}
    </div>
  `;
  createAlert("Lỗi nhập", template);
  return false;
}

function savePlayerForm() {
  $(btnSelector).on("click", function (e) {
    e.preventDefault();
   
    let i = 0;
    let arrlen = inputProbs.length;

    while (i < arrlen) {

      let inputId = inputProbs[i].id;

      newPlayer[inputId] = $(`#${inputId}`).val();
      if (!checkPlayerInput(newPlayer[inputId], inputProbs[i].checkPattern, inputProbs[i].alert)) {
        return;
      }
      i++;
    }

    if(typeof newPlayer.clubid === 'undefined'){
        checkPlayerInput(null, null, "Bạn chưa chọn câu lạc bộ");
        return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:80/controller/PlayersController.php",
      data: JSON.stringify(newPlayer),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: function (response) {
        let template = `
            <div class="alert alert-success" role="alert">
                Tạo cầu thủ mới thành công
            </div>
        `;
        createAlert("Thông báo", template);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseJSON);
      },
    });
  });
}

function loadForm() {
  let i = 0;
  let arrLen = inputProbs.length;
  var template = "";

  while (i < arrLen) {
    template += `
        <div class="form-group">
            <label for="${inputProbs[i].id}">
                ${inputProbs[i].label}
            </label>
            <input 
                type="text" 
                class="form-control" 
                id="${inputProbs[i].id}" 
                placeholder="Nhập ${inputProbs[i].label}"
            >
        </div>
        <br>
    `;
    i++;
  }
  $(btnSelector).before(template);
}
