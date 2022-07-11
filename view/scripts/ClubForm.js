var newClub = {};
let btnSelector = "#save-btn";
let inputProbs = [
  {
    id: "clubname",
    label: "Tên câu lạc bộ",
    checkPattern: "^[a-zA-Z\\s]*$",
    alert: "Tên câu lạc bộ là bắt buộc và chỉ chứa chữ, không có kí tự đặc biệt",
  },
  {
    id: "shortname",
    label: "Tên viết tắt",
    checkPattern: "^[A-Z]{0,2}[A-Z]$",
    alert: "Tên viết tắt là bắt buộc và là cụm chữ in hoa, không dấu cách, tối đa 3 kí tự",
  },
];

loadForm();
saveClubForm();

function createAlert(modalTit, templt) {
    $(".modal-title").text(modalTit);
    $(".modal-body").html(templt);
    $('#notification').modal("show");
}

function checkClubInput(inputVal, checkReg, alertMess) {
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

function saveClubForm() {
  $(btnSelector).on("click", function (e) {
    e.preventDefault();

    let i = 0;
    let arrlen = inputProbs.length;

    while (i < arrlen) {
      let inputId = inputProbs[i].id;

      newClub[inputId] = $(`#${inputId}`).val();
      if (!checkClubInput(newClub[inputId], inputProbs[i].checkPattern, inputProbs[i].alert)) {
        return;
      }
      i++;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:80/controller/ClubsController.php",
      data: JSON.stringify(newClub),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: function (response) {
        let template = `
              <div class="alert alert-success" role="alert">
                  Tạo câu lạc bộ mới thành công
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
