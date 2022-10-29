import axios from "axios";
import { BASE_URL } from "../lib/constants";

const baseUrl = BASE_URL;


export function updatePixel(data) {
    return axios.patch(`${baseUrl}/api/pixels`, data);
}