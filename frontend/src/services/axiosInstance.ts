import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export { axiosPublic, axiosPrivate };
