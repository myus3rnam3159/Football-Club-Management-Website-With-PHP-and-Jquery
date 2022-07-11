<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand">Quản lí clb bóng đá</a>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <!--Nút đăng nhập ở trong element này -->
        <li class="nav-item">
          <a class="nav-link active" href="/">Trang chủ
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
      </ul>
      <!--Xử lý đăng nhập-->
    </div>
  </div>
</nav>
<!--Modal đăng nhập-->
<div class="modal fade" id="login-form-modal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <form id="login-form">
          <div class="form-group">
            <label for="userid">Mã người dùng</label>
            <input type="text" class="form-control" id="userid">
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input type="password" class="form-control" id="password">
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </form>
      </div>
    </div>
  </div>
</div>
