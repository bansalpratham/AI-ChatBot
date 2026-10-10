
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

export const loginUser = async (
    email: string,
    password: string
) => {
    const res = await api.post("/user/login", {
        email,
        password,
    });

    return res.data;
};

export const signupUser = async (
    name: string,
    email: string,
    password: string
) => {
    const res = await api.post("/user/signup", {
        name,
        email,
        password,
    });

    return res.data;
};

export const checkAuthStatus = async () => {
    const res = await api.get("/user/auth-status");

    return res.data;
};

export const sendChatRequest = async (message: string) => {
    const res = await api.post("/chat/new", {
        message,
    });

    return res.data;
};
