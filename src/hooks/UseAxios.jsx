import axios from "axios";

const axiosInstance = axios.create({
//    baseURL:`https://profast-parcel-server.vercel.app`
   baseURL:`http://localhost:5000`
})
const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;