import RNFetchBlob from 'rn-fetch-blob';

export class WEBAPI {

    // HOST_NAME
    HOST_NAME = "https://buybidre.com/api/api/"
    //HOST_NAME = 'http://192.168.10.6:8000/api/';

    //END POINTS

    //PROPERTIES BASE URL
    PROPERTIES_BASE_URL = 'properties';

    UPLOAD_PROPERTY_URL = '/upload';

    //GET CATEGORIES
    CATEGORIES_BASE_URL = 'categories';

    //LOGIN
    LOGIN = 'login';

    //SIGNUP
    REGISTER = 'register';

    async sendRequest(url, request) {
        try {
            let response = await fetch(url, request);
            console.log(response);
            let responseJson = await response.json();
            //alert("here")
            console.log('responseJson ', responseJson);
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
        console.log(body);
        try {
            let response = await RNFetchBlob.fetch('POST', url, header, body);
            let responseJson = await response.json();
            console.log('upload file response ', responseJson);
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
        console.log('url ', url);
        let request = {
            body: JSON.stringify(data),
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };
        return this.sendRequest(url, request);
    }

    signup(data) {
        let url = `${this.HOST_NAME}${this.REGISTER}`;
        console.log(url);
        let request = {
            body: JSON.stringify(data),
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        console.log(request);
        return this.sendRequest(url, request);
    }

    getProperties() {
        let url = `${this.HOST_NAME}${this.PROPERTIES_BASE_URL}`;
        let request = {
            method: 'GET',
        };
        return this.sendRequest(url, request);
    }

    getMyProperties(userId) {
        let url = `${this.HOST_NAME}${this.PROPERTIES_BASE_URL + userId}`;
        let request = {
            method: 'GET',
        };
        return this.sendRequest(url, request);
    }

    getCategories() {
        let url = `${this.HOST_NAME}${this.CATEGORIES_BASE_URL}`;
        let request = {
            method: 'GET',
        };
        return this.sendRequest(url, request);
    }

    addProperty(data) {
        let url = `${this.HOST_NAME}${this.PROPERTIES_BASE_URL}`;
        let request = {
            body: JSON.stringify(data),
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };
        console.log(request);
        return this.sendRequest(url, request);
    }

    uploadFile(data, id) {
        let url = `${this.HOST_NAME}${this.PROPERTIES_BASE_URL}${this.UPLOAD_PROPERTY_URL}/${id}`;
        console.log(url);
        return this.sendRequestIMAGES(url, '', data);
    }

}
