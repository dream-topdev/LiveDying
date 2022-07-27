import axios from "axios";
import { parseMutationArgs } from "react-query/build/cjs/packages/react-query/src";
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
    return response.data;
  };
  deleteMediaById = async (params) => {
    let to = params[0];
    let id = params[1];
    const response = await apiInstance.delete(`${apiPrefix}/file/${to}/${id}`);
    return response.data;
  }
  //pallbearer
  getPallbearerByUserId = async (userid) => {
    const response = await apiInstance.get(`${apiPrefix}/pallbearer/${userid}`);
    return response.data;
  };
  createPallbearer = async (params) => {
    let userid = params.userId;
    let body = params.body;
    const response = await apiInstance.post(`${apiPrefix}/pallbearer/${userid}`, body);
    return response.data;
  }
  updatePallbearer = async (params) => {
    let userid = params.userId;
    let body = params.body;
    console.log(userid, body);
    const response = await apiInstance.put(`${apiPrefix}/pallbearer/${userid}`, body);
    return response.data;
  }
  deletePallbearerById = async (id) => {
    const response = await apiInstance.delete(`${apiPrefix}/pallbearer/one/${id}`);
    return response.data;
  };
  //speaker
  getSpeakerByUserId = async (userid) => {
    const response = await apiInstance.get(`${apiPrefix}/speaker/${userid}`)
    return response.data;
  };
  postSpeaker = async (params) => {
    let userid = params.userId;
    let body = params.body;
    const response = await apiInstance.post(`${apiPrefix}/speaker/${userid}`, body);
    return response.data;
  }
  updateSpeaker = async (params) => {
    let userid = params.userId;
    let body = params.body;
    console.log(userid, body);
    const response = await apiInstance.put(`${apiPrefix}/speaker/${userid}`, body);
    return response.data;
  }
  deleteSpeakerById = async (id) => {
    const response = await apiInstance.delete(`${apiPrefix}/speaker/one/${id}`);
    return response.data;
  };
}
export default new API();
