import axios from "axios";
axios.defaults.withCredentials = true;
const apiInstance = axios.create({
  baseURL: "http://livelikeyouaredying.com",
  timeout: 300000,
});
const apiPrefix = "/api/v1";
 

class API {
  login = async (params) => {
    const response = await apiInstance.post(`${apiPrefix}/user/login`, params);
    return response.data;  
  }
}

export default new API();
