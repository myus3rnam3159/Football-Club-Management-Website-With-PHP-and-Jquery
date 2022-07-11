<?php require('./shared/Head.php') ?>
<?php require('./shared/NavBar.php') ?>
<?php require('./shared/BreadCrumb.php') ?>

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
<script src="./scripts/ClubList.js"></script>
<script src="./scripts/jquery.twbsPagination.js"></script>

<?php require('./shared/End.php') ?>