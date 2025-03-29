import axios from 'axios'
const BASEURL=process.env.BASEURL||'https://reqres.in';
const Axios = axios.create({
    baseURL: BASEURL,
    // timeout: 10000, // 10 seconds timeout
    headers: {
      "Content-Type": "application/json",
    },
  });



  Axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response Interceptor: Handle Global Errors
  Axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
export default Axios;