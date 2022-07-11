let features = [
  { name: "Danh sách cầu thủ", path: "./view/PlayerList.php" },
  { name: "Danh sách câu lạc bộ", path: "./view/ClubList.php" },
  { name: "Thêm cầu thủ", path: "./view/PlayerForm.php" },
  { name: "Thêm câu lạc bộ", path: "./view/ClubForm.php" },
  { name: "Giới thiệu", path: "./view/Intro/Intro.php" },
];

let featureListTemplate = "";
let featureListSize = features.length;
let i = 0;

while (i < featureListSize) {
  featureListTemplate += '<li href="/" class="list-group-item d-flex justify-content-between align-items-center">';
  featureListTemplate += buildATag(features[i].name, features[i].path);
  featureListTemplate += "</li>";

  i++;
}
$("#feature-list").append(featureListTemplate);

function buildATag(name, path) {
  return `<a href="${path}">${name}</a>`;
}
