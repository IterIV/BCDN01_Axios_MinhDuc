function getEleWithSelector(stringSelector){
    return document.querySelector(stringSelector);
}
var userServices = new UserServices();

function getData(){
    var result = [];
    userServices.getList()
    .then(function(response){
        result = response.data;
    })
    .catch(function(error){
        console.log(error);
    });
    return result;
}

function displayData(data){
    var contentHTML = '';
    if (data != null) {
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
        contentHTML += `<tr>
                <td colspan="8" class="text-center">Chưa có dữ liệu hoặc gặp sự cố khi tải dữ liệu.</td>
            </tr>`
    }
    
    getEleWithSelector("#tblDanhSachNguoiDung").innerHTML = contentHTML;
}
console.log(getData());


//Them user
getEleWithSelector("#btnThemNguoiDung").addEventListener("click", function(){
    getEleWithSelector("#myModal .modal-footer").innerHTML = `
    <button type="button" class="btn btn-success" onclick="addUser();">Thêm</button>
    `;
});

function checkIsValid(){
    var isValid = true;
    var validation = new Validation();
    //Check TaiKhoan
    isValid &= validation.checkEmpty("TaiKhoan","tbTaiKhoan","Tên tài khoản không để trống") && validation.checkOnly("TaiKhoan","tbTaiKhoan","Tên tài khoản không để trống",);

    return isValid;
}

function addUser(){
    var isValid = checkIsValid();
    if (isValid) {
        console.log("Du lieu hop le");
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
    }
}

