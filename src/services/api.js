import axios from 'axios';

class Api {
    url = 'http://localhost:8000/api';

    get(url) {
        return axios.get(this.url + url).then((results) => results.data).catch((err) => toastr.error(err.response.data.message));
    };

    post(url, data) {
        return axios.post(this.url + url, data).then((results) => {
            const data = results.data;
            if (data.message) {
                data.success ? toastr.success(data.message) : toastr.error(data.message);
            }
            return data;
        }).catch((err) => toastr.error(err.response.data.message));
    }
}

export default new Api();