function UserServices() {
    // Lấy danh sách sản phẩm
    this.getList = function () {
        return axios({
            method: 'get',
            url: 'https://6135781a60d2900017c3bf96.mockapi.io/User'
        });
    }

    this.addList = function (user) {
        return axios({
            method: 'post',
            url: 'https://6135781a60d2900017c3bf96.mockapi.io/User',
            data: user
        });
    }

    this.getItem = function(id){
        return axios({
            method: 'get',
            url: `https://6135781a60d2900017c3bf96.mockapi.io/User/${id}`
        });
    }

    this.updateItem = function(user, id){
        return axios({
            method: 'put',
            url: `https://6135781a60d2900017c3bf96.mockapi.io/User/${id}`,
            data:user
        });
    }
    this.deleteItem = function(id){
        return axios({
            method: 'delete',
            url: `https://6135781a60d2900017c3bf96.mockapi.io/User/${id}`
        });
    }
}