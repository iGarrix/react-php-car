import axios from "axios";

export default axios.create({
    baseURL: "http://laravel:8000/",
    headers: {
        "Content-type": "application/json"
    }
});