import RNFetchBlob from 'rn-fetch-blob'

export class WEBAPI {

    // HOST_NAME
    HOST_NAME = "https://buybidre.com/api/"

    //END POINTS

    //GET TOKEN
    _GET_PRODUCTS = '/product/read.php';

    LOGIN = 'users/login.php'
    SIGNUP = '/users/create.php'
    POST_DATA = "product/create.php"

    async sendRequest(url, request) {
        try {
            let response = await fetch(url, request);
            console.log(response);
            let responseJson = await response.json();
            console.log(`response of ${url}`, responseJson);
            return responseJson;
        } catch (error) {
            console.log(url);
            console.log(`error of ${url}`, error);
            let err = [];
            err.error = error;
            err.no_result = true;
            return err;
        }
    }
    async sendRequestIMAGES(url, header, body) {
        try {
            let response = await RNFetchBlob.fetch('POST', url, header, body)
            let responseJson = await response.json();
            console.log(`response of ${url}`, responseJson);
            return responseJson;
        } catch (error) {
            console.log(url);
            console.log(`error of ${url}`, error);
            let err = [];
            err.error = error;
            err.no_result = true;
            return err;
        }
    }
    login(data) {
        let url = `${this.HOST_NAME}${this.LOGIN}`;
        console.log('hy beru: get Products', url);
        let request = {
            body: JSON.stringify(data),
            method: 'post',
        };
        return this.sendRequest(url, request);
    }
    signup(data) {
        let url = `${this.HOST_NAME}${this.SIGNUP}`;
        console.log('hy beru: get Products', url);
        let request = {
            body: JSON.stringify(data),
            method: 'post',
        };
        return this.sendRequest(url, request);
    }
    getProducts() {
        let url = `${this.HOST_NAME}${this._GET_PRODUCTS}`;
        console.log('hy beru: get Products', url);
        let request = {
            method: 'GET',
        };
        return this.sendRequest(url, request);
    }
    postData(data) {
        let url = `${this.HOST_NAME}${this.POST_DATA}`;
        console.log('hy beru: get Products', url);
        
        return this.sendRequestIMAGES(url,'',data);
    }

}