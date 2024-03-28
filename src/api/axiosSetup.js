import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { userLogout } from "../features/actions/authAsyncAction";

// DEVELOPMENT

const BASE_URL = "http://localhost:4000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const privateRequest = axios.create({
  baseURL: BASE_URL,
});

//this is for cookies the old refresh token will be sent automatically on production
// but not in development (if https only is set in backend)
const refreshToken = async () => {
  try {
    const res = await publicRequest.post("auth/refresh-tokens");

    localStorage.setItem("netFeeToken", JSON.stringify(res.data?.access.token));

    return res.data?.access.token;
  } catch (err) {
    // userLogout();
  }
};
//this is for when the refresh token is not in cookies , have to do something like that
// but not in development (if https only is set in backend)
// const refreshToken = async () => {
//   try {
//     const RefreshToken = await JSON.parse(localStorage.getItem("refreshToken"));

//     const res = await publicRequest.post("auth/refresh-tokens", RefreshToken);

//     localStorage.setItem("netFeeToken", JSON.stringify(res.data?.access.token));

//     return res.data?.access.token;
//   } catch (err) {

//     userLogout();
//   }
// };

privateRequest.interceptors.request.use(
  async (config) => {
    const TOKEN = await JSON.parse(localStorage.getItem("accessToken"));
    let currentDate = new Date();
    const decodedToken = jwtDecode(TOKEN);

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      //if there is just only accessToken then logout here directly
      const TOKEN = await refreshToken();

      //   const TOKEN = await JSON.parse(localStorage.getItem("accessToken"));

      config.headers["authorization"] = "Bearer " + TOKEN;
    } else {
      config.headers["authorization"] = "Bearer " + TOKEN;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateRequest;
