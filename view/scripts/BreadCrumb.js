let currentPageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
let breadcrumbSelector = "#breadcrumb";
let banner = "Trang chủ";

if (!currentPageName) {
  $(breadcrumbSelector).append(createBanner(banner));
} else if (currentPageName === "PlayerList.php") {
  banner = "Danh sách cầu thủ";
  $(breadcrumbSelector).append(createBanner(banner));
} else if (currentPageName === "PlayerForm.php"){
  banner = "Thêm cầu thủ";
  $(breadcrumbSelector).append(createBanner(banner));
} else if (currentPageName === "ClubList.php"){
  banner = "Danh sách câu lạc bộ";
  $(breadcrumbSelector).append(createBanner(banner));
}

function createBanner(name) {
  return `<li class="breadcrumb-item text-danger active">${name}</li>`;
}
