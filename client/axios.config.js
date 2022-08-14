import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}/`
let token;

const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
    token = localStorage.getItem("token");
}

const instance = axios.create({
    baseURL: BASE_URL
})

instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance;