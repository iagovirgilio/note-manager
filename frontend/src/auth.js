import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export const login = async (username, password) => {
    try {
        const res = await api.post("/api/token/", { username, password });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
    } catch (error) {
        throw new Error("Failed to log in. Please check your credentials and try again.");
    }
};

export const register = async (username, password) => {
    try {
        await api.post("/api/user/register/", { username, password });
    } catch (error) {
        throw new Error("Failed to register. Please try again later.");
    }
};
