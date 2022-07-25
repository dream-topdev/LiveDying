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
  };
  getProfileById = async (id) => {
    const response = await apiInstance.get(`${apiPrefix}/user/${id}`);
    return response.data;
  };
  getTopWishById = async (id) => {
    const response = await apiInstance.get(`${apiPrefix}/topwish/${id}`);
    return response.data;
  };
  // upload file 
  getMediaByUserId = async (userid, to, type) => {
    const response = await apiInstance.get(`${apiPrefix}/file/${userid}/${to}/${type}`);
    // console.log('<=========get media by id========>', response.data);
    return response.data;
  };
  deleteMediaById = async (params) => {
    // console.log('you selected the ', params[0], params[1])
    // console.log('Hello world')
    let to = params[0];
    let id = params[1];
    const response = await apiInstance.delete(`${apiPrefix}/file/${to}/${id}`);
    return response.data;
  }
  //pallbearer
  getPallbearerByUserId = async (userid) => {
    const response = await apiInstance.get(`${apiPrefix}/pallbearer/${userid}`);
    // console.log('<=========getpallbearer by id ========>', response.data);
    return response.data;
  };
  deletePallbearerById = async (id) => {
    const response = await apiInstance.delete(`${apiPrefix}/pallbearer/one/${id}`);
    console.log('<=========delete pallbearer by id ========>', response.data);
    return response.data;
  };
  //speaker
  getSpeakerByUserId = async (userid) => {
    const response = await apiInstance.get(`${apiPrefix}/speaker/${userid}`)
    return response.data;
  }
  deleteSpeakerById = async (id) => {
    const response = await apiInstance.delete(`${apiPrefix}/speaker/one/${id}`);
    console.log('<=========delete speaker by id ========>', response.data);
    return response.data;
  };
}
export default new API();
