import {authHeader} from "../helpers";

export const userService = {
    login,
    logout
};

function login(email, password) {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    return fetch(`/api/v1/auth/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}