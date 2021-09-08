function Validation() {

    this.checkEmpty = function (inputID, spanID, message) {
        var spanELE = document.getElementById(spanID);
        var inputELE = document.getElementById(inputID);
        if (inputELE.value.trim() == "") {
            inputELE.classList.remove("is-valid");
            inputELE.classList.add("is-invalid");
            spanELE.innerHTML = message;
            return false;
        } else {
            inputELE.classList.add("is-valid");
            inputELE.classList.remove("is-invalid");
            spanELE.innerHTML = "";
            return true;
        }
    }

    this.checkOnly = function (inputID, spanID, message, listData) {
        var spanELE = document.getElementById(spanID);
        var inputELE = document.getElementById(inputID);
        var isExit = listData.some(function(item, index){
            return item.taiKhoan === inputELE.value;
        });

        if (isExit) {
            inputELE.classList.remove("is-valid");
            inputELE.classList.add("is-invalid");
            spanELE.innerHTML = message;
            return false;
        } else {
            inputELE.classList.add("is-valid");
            inputELE.classList.remove("is-invalid");
            spanELE.innerHTML = "";
            return true;
        }
    }

    this.checkName = function(inputID, spanID, message){
        var spanELE = document.getElementById(spanID);
        var inputELE = document.getElementById(inputID);
        var pattern = /^[a-zA-Z_ÀÁ ÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/
        if (pattern.test(inputELE.value.trim())) {
            inputELE.classList.add("is-valid");
            inputELE.classList.remove("is-invalid");
            spanELE.innerHTML = "";
            return true;
            
        } else {
            inputELE.classList.remove("is-valid");
            inputELE.classList.add("is-invalid");
            spanELE.innerHTML = message;
            return false;
        }
    }

    this.checkPass = function(inputID, spanID, message){
        var spanELE = document.getElementById(spanID);
        var inputELE = document.getElementById(inputID);
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/
        if (pattern.test(inputELE.value.trim())) {
            inputELE.classList.add("is-valid");
            inputELE.classList.remove("is-invalid");
            spanELE.innerHTML = "";
            return true;
            
        } else {
            inputELE.classList.remove("is-valid");
            inputELE.classList.add("is-invalid");
            spanELE.innerHTML = message;
            return false;
        }
    }

    this.checkEmail = function(inputID, spanID, message){
        var spanELE = document.getElementById(spanID);
        var inputELE = document.getElementById(inputID);
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (pattern.test(inputELE.value.trim())) {
            inputELE.classList.add("is-valid");
            inputELE.classList.remove("is-invalid");
            spanELE.innerHTML = "";
            return true;
            
        } else {
            inputELE.classList.remove("is-valid");
            inputELE.classList.add("is-invalid");
            spanELE.innerHTML = message;
            return false;
        }
    }

    this.checkSelect = function(selectID, spanID, message){
        var selectELE = document.getElementById(selectID);
        var spanELE = document.getElementById(spanID);
        if (selectELE.selectedIndex == 0) {
            selectELE.classList.remove("is-valid");
            selectELE.classList.add("is-invalid");
            spanELE.innerHTML = message;
            return false;
            
        } else {
            selectELE.classList.add("is-valid");
            selectELE.classList.remove("is-invalid");
            spanELE.innerHTML = "";
            return true;
        }
    }

    this.checkNumChar = function(inputID, numMin, numMax,spanID, message){
        var inputELE = document.getElementById(inputID);
        var spanELE = document.getElementById(spanID);
        if (inputELE.value.length < numMin || inputELE.value.length > numMax) {
            inputELE.classList.remove("is-valid");
            inputELE.classList.add("is-invalid");
            spanELE.innerHTML = message;
            return false;
            
        } else {
            inputELE.classList.add("is-valid");
            inputELE.classList.remove("is-invalid");
            spanELE.innerHTML = "";
            return true;
        }
    }
}