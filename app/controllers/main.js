function getEleWithSelector(stringSelector){
    return document.querySelector(stringSelector);
}
var userServices = new UserServices();

function getData(){
    userServices.getList()
    .then(function(response){
        localStorage.setItem("ListUsers",JSON.stringify(response.data));
    })
    .catch(function(error){
        console.log(error);
    });
    return JSON.parse(localStorage.getItem("ListUsers"));
}
function displayData(data){
    var contentHTML = '';
    if (data.length > 0) {
        data.map(function(item, index){
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
    }else{
        contentHTML += `
        <tr>
                <td colspan="8" class="text-center">Chưa có dữ liệu hoặc gặp sự cố khi tải dữ liệu.</td>
            </tr>
        `;
    }
    getEleWithSelector("#tblDanhSachNguoiDung").innerHTML = contentHTML;
}
displayData(getData());


//Them user
getEleWithSelector("#btnThemNguoiDung").addEventListener("click", function(){
    getEleWithSelector("#myModal .modal-footer").innerHTML = `
    <button type="button" class="btn btn-success" onclick="addUser();">Thêm</button>
    `;
});

function checkIsValid(){
    var isValid = true;
    var validation = new Validation();
    var data = getData();
    //Check TaiKhoan
    isValid &= validation.checkEmpty("TaiKhoan","tbTaiKhoan","Tên tài khoản không để trống!") && validation.checkOnly("TaiKhoan","tbTaiKhoan","Tên tài khoản đã tồn tại!",data);
    //Check Hoten
    isValid &= validation.checkEmpty("HoTen","tbHoTen","Họ tên không để trống!") && validation.checkName("HoTen","tbHoTen","Họ tên không chứa ký tự số và ký tự đặc biệt!",data);
    //Check Pass
    isValid &= validation.checkEmpty("MatKhau","tbMatKhau","Mật khẩu không để trống!") && validation.checkPass("MatKhau","tbMatKhau","Mật khẩu không hợp lệ!");
    //Check Email
    isValid &= validation.checkEmpty("Email","tbEmail","Email không để trống!") && validation.checkEmail("Email","tbEmail","Email không hợp lệ!");
    //Check HinhAnh
    isValid &= validation.checkEmpty("HinhAnh","tbHinhAnh","Mật khẩu không để trống!");
    //Check LoaiNguoiDung
    isValid &= validation.checkSelect("loaiNguoiDung","tbloaiNguoiDung","Chưa chọn loại người dùng!");
    //Check Ngon ngu
    isValid &= validation.checkSelect("loaiNgonNgu","tbloaiNgonNgu","Chưa chọn loại ngôn ngữ!");
     //Check Mo ta
    isValid &= validation.checkEmpty("MoTa","tbMoTa","Mô tả không để trống!") && validation.checkNumChar("MoTa", 1,60,"tbMoTa","Mô tả không quá 60 ký tự.");
    return isValid;
}

function addUser(){
    var isValid = checkIsValid();
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
        console.table(user);
    }
}

