import axiosGen from "./axios";

const axios = axiosGen();
const axiosWithoutUserInvalidation = axiosGen(null, false);

const api = {
  forgotPassword(email) {
    return axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        return axios.post("/forgot-password", { email });
      })
      .then((r) => r.data);
  },
  
  resetPassword(data) {
    return axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/reset-password", data))
      .then((r) => r.data);
  },
  
  verificationNotification() {
    return axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/email/verification-notification"))
      .then((r) => r.data);
  },
  
  register(data) {
    return axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        return axios.post("/register", data);
      })
      .then((r) => r.data);
  },
  
  logIn(email, password) {
    return axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        return axios.post("/login", { email, password });
      })
      .then((r) => r.data);
  },

  logOut() {
    return axios.post("/logout").then((r) => r.data);
  },

  me() {
    return axiosWithoutUserInvalidation.get("/api/me").then((r) => r.data);
  },

  secrets() {
    return axios.get("/api/secrets").then((r) => r.data);
  },
};

export default api;
