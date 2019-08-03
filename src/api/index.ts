/*
 * @Description: 豆瓣电影 API 参考 https://blog.csdn.net/sd231902/article/details/89190997
 * @Author: james.zhang
 * @Date: 2019-08-01 22:44:24
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-08-03 13:52:04
 */

import axios from "axios";
import { message } from "antd";
import { getErrorMsgByStatus } from "../utils/errorUtil";
const HOST = process.env.REACT_APP_SERVER_URL;
const BASE_URL = `${HOST}/api/movie`;
const API_KEY = "0b2bdeda43b5688921839c8ecb20399b";

window.cancalXHRList = [];

function http() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  window.cancalXHRList.push(source);

  let instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 3e4,
    params: {
      "apikey": API_KEY
    },
    cancelToken: source.token
  });

  instance.interceptors.request.use(config => {
    message.destroy();
    message.loading("loading");
    return config;
  }, err => {
    message.destroy();
    console.log("request error", err, err.response);
  });
  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      message.destroy();
      return res || {};
    },
    err => {
      message.destroy();
      console.log("response error", err, err.response);
      if (err && err.response) {
        err.message = getErrorMsgByStatus(err.response);
        message.destroy();
        message.error(err.message);
      }
    }
  );

  return instance;
}

// 热映
export function getHotShowing(params?: iRequestGetData) {
  return http().get("/in_theaters", {
    params
  });
}

// top250
export function getTop250(params?: iRequestGetData) {
  return http().get("/top250", {
    params
  });
}

// 新片
export function getNew() {
  return http().get("/new_movies");
}

// 电影详情
export function getDetail(id: string) {
  return http().get(`/subject/${id}`);
}

// 北美票房榜
export function getGoodbox(params?: iRequestGetData) {
  return http().get("/us_box", {
    params
  });
}

// 搜索条目
export function getContentBySearch(str: string, params?: iRequestGetData) {
  return http().get(`/search?q=${str}`, {
    params
  });
}

// 口碑榜
export function getWeeklyMovie() {
  return http().get("/weekly");
}

// 获取每日壁纸
export function getWallPaper() {
  return axios.get("/bing/HPImageArchive.aspx", {
    params: {
      format: "js",
      idx: 0,
      n: 1,
      mkt: "zh-CN"
    }
  });
}
