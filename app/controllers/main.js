function getEleWithSelector(stringSelector) {
    return document.querySelector(stringSelector);
}
var userServices = new UserServices();

function getData() {
    userServices.getList()
        .then(function (response) {
            localStorage.setItem("ListUsers", JSON.stringify(response.data));
            displayData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function displayData(data) {
    var contentHTML = '';
    if (data.length > 0) {
        data.map(function (item, index) {
            contentHTML += `<tr>
                <td>${index}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button type="button" class="btn btn-success" onclick="getUser('${item.id}');" data-toggle="modal" data-target="#myModal">Sửa</button>
                    <button type="button" class="btn btn-danger" onclick = "deleteUser('${item.id}');">Xóa</button>
                </td>
            </tr>`
        });
    } else {
        contentHTML += `
        <tr>
                <td colspan="8" class="text-center">Chưa có dữ liệu hoặc gặp sự cố khi tải dữ liệu.</td>
            </tr>
        `;
    }
    getEleWithSelector("#tblDanhSachNguoiDung").innerHTML = contentHTML;
}
getData();


//Them user
getEleWithSelector("#btnThemNguoiDung").addEventListener("click", function () {
    getEleWithSelector("#myModal .modal-footer").innerHTML = `
    <button type="button" class="btn btn-success" onclick="addUser();">Thêm</button>
    `;
    resetForm();
});

function checkIsValid(isAdd) {
    var isValid = true;
    var validation = new Validation();
    var data = JSON.parse(localStorage.getItem("ListUsers"));
    
    //Check TaiKhoan
    if (isAdd) {
        isValid &= validation.checkEmpty("TaiKhoan", "tbTaiKhoan", "Tên tài khoản không để trống!") && validation.checkOnly("TaiKhoan", "tbTaiKhoan", "Tên tài khoản đã tồn tại!", data);
    }else{
        isValid &= validation.checkEmpty("TaiKhoan", "tbTaiKhoan", "Tên tài khoản không để trống!");
    }
    //Check Hoten
    isValid &= validation.checkEmpty("HoTen", "tbHoTen", "Họ tên không để trống!") && validation.checkName("HoTen", "tbHoTen", "Họ tên không chứa ký tự số và ký tự đặc biệt!", data);
    //Check Pass
    isValid &= validation.checkEmpty("MatKhau", "tbMatKhau", "Mật khẩu không để trống!") && validation.checkPass("MatKhau", "tbMatKhau", "Mật khẩu không hợp lệ!");
    //Check Email
    isValid &= validation.checkEmpty("Email", "tbEmail", "Email không để trống!") && validation.checkEmail("Email", "tbEmail", "Email không hợp lệ!");
    //Check HinhAnh
    isValid &= validation.checkEmpty("HinhAnh", "tbHinhAnh", "Mật khẩu không để trống!");
    //Check LoaiNguoiDung
    isValid &= validation.checkSelect("loaiNguoiDung", "tbloaiNguoiDung", "Chưa chọn loại người dùng!");
    //Check Ngon ngu
    isValid &= validation.checkSelect("loaiNgonNgu", "tbloaiNgonNgu", "Chưa chọn loại ngôn ngữ!");
    //Check Mo ta
    isValid &= validation.checkEmpty("MoTa", "tbMoTa", "Mô tả không để trống!") && validation.checkNumChar("MoTa", 1, 60, "tbMoTa", "Mô tả không quá 60 ký tự.");
    return isValid;
}

function addUser() {
    var isAdd = true;
    var isValid = checkIsValid(isAdd);
    if (isValid) {
        var user = new User(
            getEleWithSelector("#TaiKhoan").value,
            getEleWithSelector("#HoTen").value,
            getEleWithSelector("#MatKhau").value,
            getEleWithSelector("#Email").value,
            getEleWithSelector("#loaiNguoiDung").value,
            getEleWithSelector("#loaiNgonNgu").value,
            getEleWithSelector("#MoTa").value,
            getEleWithSelector("#HinhAnh").value
        );
        userServices.addItem(user)
            .then(function (response) {
                getData();
                resetForm();
                getEleWithSelector("#myModal .close").click();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
function getUser(id) {
    resetForm();
    userServices.getItem(id)
        .then(function (response) {
            getEleWithSelector("#TaiKhoan").value = response.data.taiKhoan;
            getEleWithSelector("#HoTen").value = response.data.hoTen;
            getEleWithSelector("#MatKhau").value = response.data.matKhau;
            getEleWithSelector("#Email").value = response.data.email;
            getEleWithSelector("#loaiNguoiDung").value = response.data.loaiND;
            getEleWithSelector("#loaiNgonNgu").value = response.data.ngonNgu;
            getEleWithSelector("#MoTa").value = response.data.moTa;
            getEleWithSelector("#HinhAnh").value = response.data.hinhAnh;
            getEleWithSelector("#myModal .modal-footer").innerHTML = `
    <button type="button" class="btn btn-success" onclick="updateUser('${response.data.id}');">Cập nhật</button>
    `;
        getEleWithSelector("#TaiKhoan").disabled = true;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function updateUser(id){
    var isAdd = false;
    var isValid = checkIsValid(isAdd);
    if (isValid) {
        var user = new User(
            getEleWithSelector("#TaiKhoan").value,
            getEleWithSelector("#HoTen").value,
            getEleWithSelector("#MatKhau").value,
            getEleWithSelector("#Email").value,
            getEleWithSelector("#loaiNguoiDung").value,
            getEleWithSelector("#loaiNgonNgu").value,
            getEleWithSelector("#MoTa").value,
            getEleWithSelector("#HinhAnh").value
        );
        console.log(user);
        userServices.updateItem(user,id)
            .then(function (response) {
                getData();
                resetForm();
                getEleWithSelector("#myModal .close").click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
function resetForm() {
    getEleWithSelector("#TaiKhoan").disabled = false;
    getEleWithSelector("#myModal form").reset();
    var inputELEArr = document.querySelectorAll("#myModal form .form-control");
    var selectELEArr = document.querySelectorAll("#myModal form .custom-select");
    inputELEArr.forEach(item => {
        if (item.className.indexOf("is-valid") >= 0) {
            item.classList.remove("is-valid");
        }
        if (item.className.indexOf("is-invalid") >= 0) {
            item.classList.remove("is-invalid");
        }
    });
    selectELEArr.forEach(item => {
        if (item.className.indexOf("is-valid") >= 0) {
            item.classList.remove("is-valid");
        }
        if (item.className.indexOf("is-invalid") >= 0) {
            item.classList.remove("is-invalid");
        }
    });
    
}