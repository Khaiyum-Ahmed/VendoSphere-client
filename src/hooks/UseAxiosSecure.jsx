import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import UseAuth from "./UseAuth";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

const UseAxiosSecure = () => {
    const { logOutUser } = UseAuth();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        // REQUEST interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                const currentUser = auth.currentUser;

                if (currentUser) {
                    const token = await currentUser.getIdToken(true);
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        // RESPONSE interceptor
        const resInterceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            async (error) => {
                const status = error.response?.status;

                if (status === 401 || status === 403) {
                    await logOutUser();
                    navigate("/login");
                }

                return Promise.reject(error);
            }
        );

        // CLEANUP (VERY IMPORTANT)
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [auth, logOutUser, navigate]);

    return axiosSecure;
};

export default UseAxiosSecure;
