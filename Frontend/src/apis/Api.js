import axios from 'axios';

const ProductsFinder = axios.create({
  baseURL: "http://localhost:8000/products",
  withCredentials: true,
});

let refreshed = false;

ProductsFinder.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !refreshed) {
      refreshed = true;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await ProductsFinder.post("/refresh");
          if (refreshResponse.status === 200) {
            refreshed = false;
            ProductsFinder.defaults.headers.common.Authorization = `Bearer ${refreshResponse.data.access_token}`;
            return ProductsFinder(originalRequest);
          } else {
            console.log("Error refreshing access token (first log):", refreshResponse.data.msg);
          }
        } catch (e) {
          if (e.response.data.msg === "Token has expired") {
            window.location.href = "/login";
          } else {
            console.log("Error refreshing access token (second log):", e.response.data.msg);
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default ProductsFinder;