import axios from "axios";
import cookie from "cookie";
import queryClient from "./globalQueryClient";

function axiosGen(req, invalidateUserOnAuthError = true) {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
  });

  /* 
    In server we merge the incoming headers and read the csrf token from the cookie to add its header.
  */
  if (req) {
    /* 
        referer: 'NEXT_JS' is used here to make sanctum happy, must add 'NEXT_JS' in the server's config/sanctum.php `stateful` entry.
     */
    axiosInstance.defaults.headers.common = {
      ...req.headers,
      ...axiosInstance.defaults.headers.common,
      referer: "NEXT_JS",
    };

    const csrfToken = req.headers.cookie
      ? cookie.parse(req.headers.cookie)["XSRF-TOKEN"]
      : null;
    if (csrfToken) {
      axiosInstance.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
    }
  }

  if (invalidateUserOnAuthError) {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          queryClient.invalidateQueries("user");
        }

        return Promise.reject(error);
      }
    );
  }

  return axiosInstance;
}

export default axiosGen;
