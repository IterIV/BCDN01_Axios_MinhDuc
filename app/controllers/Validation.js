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

}