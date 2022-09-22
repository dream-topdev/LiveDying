import axios from "axios";
import { parseMutationArgs } from "react-query/build/cjs/packages/react-query/src";
import ApplicationStyles from "../utils/ApplicationStyles";
axios.defaults.withCredentials = true;
const apiInstance = axios.create({
  baseURL: "http://livelikeyouaredying.com",
  timeout: 300000,
});

const youtubeApiInstance = axios.create({
  baseURL: 'https://www.googleapis.com',
  timeout: 300000
})
const apiPrefix = "/api/v1";
const youtubeApiPrefix = 'youtube/v3/search';

class API {
  login = async (params) => {
    const response = await apiInstance.post(`${apiPrefix}/user/login`, params);
    return response.data;
  };
  setReminder = async (params) => {
    const id = params.userid;
    const body = params.body;
    console.log('===================>', id, body)
    const response = await apiInstance.post(`${apiPrefix}/user/${id}/reminder`, body);
    return response.data;
  }
  getProfileById = async (id) => {
    const response = await apiInstance.get(`${apiPrefix}/user/${id}`);
    return response.data;
  };
  getTopWishById = async (id) => {
    const response = await apiInstance.get(`${apiPrefix}/topwish/${id}`);
    return response.data;
  };
  // get uploaded file 
  getMediaByUserId = async (userid, to, type) => {
    const response = await apiInstance.get(`${apiPrefix}/file/${userid}/${to}/${type}`);
    return response.data;
  };
  //upolad local file by userid 
  postUploadFileFromLocal = async (params) => {
    let userid = params.userId;
    let body = params.body;
    console.log('current api call user id is ', userid);
    console.log('Form data is ', body);
    const response = await apiInstance.post(`${apiPrefix}/file/${userid}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      }
    });
    return response.data;
  }
  //upload youtube files by userid
  postYoutubeVideoByUserId = async (params) => {
    let userid = params.userId;
    let body = params.body;
    console.log('the body of api call is ', body);
    const response = await apiInstance.post(`${apiPrefix}/file/youtube/${userid}`, body);
    return response.data;
  }
  //delete file by media id
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
    const response = await apiInstance.post(`${apiPrefix}/pallbearer/${userid}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      }
    });
    return response.data;
  }
  updatePallbearer = async (params) => {
    let userid = params.userId;
    let body = params.body;
    console.log(userid, body);
    const response = await apiInstance.post(`${apiPrefix}/pallbearer/update/${userid}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      }
    });
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
    console.log('post api data is ', body);
    const response = await apiInstance.post(`${apiPrefix}/speaker/${userid}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      }
    });
    return response.data;
  }
  updateSpeaker = async (params) => {
    let userid = params.userId;
    let body = params.body;
    console.log('adsfasdfasdfasdf', userid, body);
    const response = await apiInstance.post(`${apiPrefix}/speaker/update/${userid}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      }
    });
    return response.data;
  }
  deleteSpeakerById = async (id) => {
    const response = await apiInstance.delete(`${apiPrefix}/speaker/one/${id}`);
    return response.data;
  };
  getYoutubeVideoByKey = async (params) => {
    console.log(params);
    const part = 'snippet'
    const type = 'video'
    const maxResults = 10
    const q = params.keyword
    const key = 'AIzaSyBh-c0jm7akftL2ISfEqkgWmd7QSmHt2so'
    const response = await youtubeApiInstance.get(`${youtubeApiPrefix}?part=${part}&type=${type}&maxResults=${maxResults}&q=${q}&key=${key}`);
    console.log(response.data.items);
    return response.data;
  };
  // share function
  postRequestShareByUserId = async (params) => {
    let body = params.body;
    console.log('post api call to share your infomation body is ', body);
    const response =await apiInstance.post(`${apiPrefix}/share`, body);
    return response.data;
  }
  getShareFromByUserId = async (userid) => {
    const resposne = await apiInstance.get(`${apiPrefix}/share/from/${userid}`);
    return resposne.data;
  }
  getShareToByUserId = async (userid) => {
    const response = await apiInstance.get(`${apiPrefix}/share/to/${userid}`);
    return response.data;
  }
  removeShareInfo = async (params) => {
    const from = params.from;
    const to = params.to;
    console.log(from, to);
    const response = await apiInstance.delete(`${apiPrefix}/share/${from}/${to}`)
    return response.data;
  }
}
export default new API();
