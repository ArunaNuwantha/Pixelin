import axios from "axios";
import { BASE_URL } from "../lib/constants";

// const baseUrl = process.env.NEXTAUTH_URL | "http://localhost:3000";
const baseUrl = BASE_URL;

export function getCreator() {
    return axios.get(baseUrl + "/api/creators");
}


export function addCreator(data) {
    return axios.post(baseUrl + "/api/creators", data);
}
