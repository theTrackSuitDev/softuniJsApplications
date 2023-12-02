import { get, post } from "./api.js";

export const getSessionData = () => {
    if (!sessionStorage.getItem("accessToken")) {
        return null;
    }

    return {
        _id: sessionStorage.getItem("_id"),
        email: sessionStorage.getItem("email"),
        accessToken: sessionStorage.getItem("accessToken"),
    };
};

export const setSessionData = (userData) => {
    sessionStorage.setItem("_id", userData._id);
    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("accessToken", userData.accessToken);
};

export async function loginReq(email, password) {
    const res = await post("/users/login", { email, password });

    setSessionData(res);

    return res;
}

export async function registerReq(email, password) {
    const res = await post("/users/register", { email, password });

    setSessionData(res);

    return res;
}

export async function logoutReq() {
    get("/users/logout");
    sessionStorage.clear();
    alert("Logged out");
}
