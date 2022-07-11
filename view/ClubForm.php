<?php require('./shared/Head.php') ?>
<?php require('./shared/NavBar.php') ?>
<?php require('./shared/BreadCrumb.php') ?>
<section class="col-3">
    <ul class="nav nav-pills mt-1  m-lg-5" id="club-list">
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
</section>

<section class="col-9">
    <div class="d-flex justify-content-center align-items-center mt-5 m-lg-5">
        <form id="player-create">
            <button type="submit" class="btn btn-primary" id="save-btn">Lưu</button>
        </form>
    </div>
</section>

<!--Player Form Modal-->
<div class="modal fade" id="notification" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>

<?php require('./shared/CdnScript.php') ?>
<script src="./scripts/NavBar.js"></script>
<script src="./scripts/BreadCrumb.js"></script>
<script src="./scripts/ClubForm.js"></script>
<?php require('./shared/End.php') ?>