const host = 'http://localhost:3030';

const getSessionData = () => {
    if (!sessionStorage.getItem("accessToken")) {
        return null;
    }

    return {
        _id: sessionStorage.getItem("_id"),
        email: sessionStorage.getItem("email"),
        accessToken: sessionStorage.getItem("accessToken"),
    };
};

async function fetchRequest(method, url, data) {
    try {
        const userData = getSessionData();

        const options = {
            method,
            headers: {}
        };

        if (userData != null) {
            options.headers['X-Authorization'] = userData.accessToken;
        }
        if (data != undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        const response = await fetch(host + url, options);

        let result;

        if (response.status != 204) {
            result = await response.json();
        }

        if (response.ok == false) {
            if (response.status == 403) {
                sessionStorage.clear();
            }
            const error = result;
            throw error;
        }

        return result;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = fetchRequest.bind(null, 'get');
export const post = fetchRequest.bind(null, 'post');
export const put = fetchRequest.bind(null, 'put');
export const del = fetchRequest.bind(null, 'delete');