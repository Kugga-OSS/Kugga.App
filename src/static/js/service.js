const http = require("./http").default;

const service = {
    // path is the base url of the api, params is a map object contains k/v param
    async get(path, params) {
        var url = path;
        if (params != null) {
            url += "?";
            var idx = 0;
            for (var key in params) {
                if (idx != 0) {
                    url = url + "&";
                }
                url = url + String(key) + "=" + String(params[key]);
                idx++;
            }
        }
        const res = await http.get(url);
        return res;
    },
    async post(path, params, body) {
        var url = path;
        if (params != null) {
            url += "?";
            var idx = 0;
            for (var key in params) {
                if (idx != 0) {
                    url = url + "&";
                }
                url = url + String(key) + "=" + String(params[key]);
                idx++;
            }
        }
        const res = await http.post(url, body);
        return res;
    }
}

export default service;