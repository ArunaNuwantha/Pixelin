import axios from "axios";
import { BASE_URL } from "../lib/constants";

const baseUrl = BASE_URL;

export function getProjects() {
    return axios.get(baseUrl + "/api/projects");
}

export function getProject(id) {
    return axios.get(baseUrl + "/api/projects/" + id);
}

export function addProject(data) {
    return axios.post(baseUrl + "/api/projects", data);
}


export function assignCreator(data) {
    return axios.post(baseUrl + "/api/projects/assignCreators", data);
}

export function updateProjectImageData(data) {
    return axios.patch(`${baseUrl}/api/projects/${data.id}`, data);
}