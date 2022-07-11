<?php require('./shared/Head.php') ?>
<?php require('./shared/NavBar.php') ?>
<?php require('./shared/BreadCrumb.php') ?>

<!--Search-->
<form class="d-flex m-lg-1" id="player-name-search-form">
    <input class="form-control" type="text" placeholder="Tìm cầu thủ theo tên ở đây">
    <button class="btn btn-secondary " type="submit">Tìm</button>
</form>
<!--Filer-->
<ul class="nav nav-pills mt-1" id="filter-list">
    <style>
        .dropdown {
            margin-left: 5em;
        }

        .dropdown-menu {
            height: auto;
            max-height: 200px;
            overflow-y: auto;
            margin-right: 3em;
        }
    </style>

</ul>

<table class="table table-hover">
    <thead>
        <tr id="table-headings">
        </tr>
    </thead>

    <tbody id="table-lines">

    </tbody>
</table>

<!--Edit Player Modal-->
<div class="modal fade" id="notification" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Lỗi nhập</h5>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" role="alert">
                </div>
                <div class="alert alert-success" role="alert">
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>


<!--Phân trang-->
<div class="d-flex justify-content-center mt-5">
    <ul class="pagination" id="pgtn">
    </ul>
</div>

<?php require('./shared/CdnScript.php') ?>
<script src="./scripts/NavBar.js"></script>
<script src="./scripts/BreadCrumb.js"></script>
<script src="./scripts/PlayerList.js"></script>
<script src="./scripts/jquery.twbsPagination.js"></script>

<?php require('./shared/End.php') ?>