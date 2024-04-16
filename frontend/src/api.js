import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getNotes = () => {
    return api.get("/api/notes/");
};

export const createNote = (noteData) => {
    return api.post("/api/notes/", noteData);
};

export const deleteNote = (id) => {
    return api.delete(`/api/notes/delete/${id}/`);
};

export default api;
