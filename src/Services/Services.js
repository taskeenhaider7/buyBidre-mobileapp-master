import RNFetchBlob from 'rn-fetch-blob'

export class WEBAPI {

    // HOST_NAME
    HOST_NAME = "https://buybidre.com/api/"

    //END POINTS

    //GET TOKEN
    _GET_PRODUCTS = 'product/read.php';

    //GET CATEGORIES
    _GET_CATEGORIES = 'category/read.php';

    //LOGIN
    LOGIN = 'users/login.php'

    //SIGNUP
    SIGNUP = 'users/create.php'

    //CREATE PRODUCT
    POST_DATA = "product/create.php"

    async sendRequest(url, request) {
        try {
            let response = await fetch(url, request);
            let responseJson = await response.json();
            console.log("responseJson ", responseJson);
            return responseJson;
        } catch (error) {
            let err = [];
            err.error = error;
            err.no_result = true;
            // console.log("error ", error);
            return err;
        }
    }

    async sendRequestIMAGES(url, header, body) {
        try {
            let response = await RNFetchBlob.fetch('POST', url, header, body)
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            let err = [];
            err.error = error;
            err.no_result = true;
            return err;
        }
    }

    login(data) {
        let url = `${this.HOST_NAME}${this.LOGIN}`;
        // console.log("url ", url);
        let request = {
            body: JSON.stringify(data),
            method: 'post',
        };
        return this.sendRequest(url, request);
    }

    signup(data) {
        let url = `${this.HOST_NAME}${this.SIGNUP}`;
        let request = {
            body: JSON.stringify(data),
            method: 'post',
        };
        return this.sendRequest(url, request);
    }

    getProducts() {
        let url = `${this.HOST_NAME}${this._GET_PRODUCTS}`;
        let request = {
            method: 'GET',
        };
        return this.sendRequest(url, request);
    }

    getCategories() {
        let url = `${this.HOST_NAME}${this._GET_CATEGORIES}`;
        let request = {
            method: 'GET',
        };
        return this.sendRequest(url, request);
    }

    postData(data) {
        let url = `${this.HOST_NAME}${this.POST_DATA}`;
        return this.sendRequestIMAGES(url,'',data);
    }

}
