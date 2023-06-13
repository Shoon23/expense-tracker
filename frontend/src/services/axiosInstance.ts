import { useQueryClient } from "@tanstack/react-query";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { iUser } from "../types/user";
import authQuery from "./api/authQuery";
import { useNavigate } from "react-router-dom";

const axiosPublic = axios.create({
  baseURL: "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export { axiosPublic };
