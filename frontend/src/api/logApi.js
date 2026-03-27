import API from "./axios";

export const createLog = (logData) => API.post("/logs", logData);
export const getLogs = () => API.get("/logs");
export const getLogById = (id) => API.get(`/logs/${id}`);
export const deleteLog = (id) => API.delete(`/logs/${id}`);