/**
 * @description 后台接口
 */
import { createBrowserHistory } from "history";
import HttpClient from "../utils/fetch";
const http = new HttpClient("http://localhost:8090");
const customHistory = createBrowserHistory({ forceRefresh: true });
// 固定返回格式
interface Result {
  code: number;
  data: any;
  msg: string;
}
interface Pagination {
  current: number;
  page_size: number;
}
// 拦截器实现
http.interceptors.request.use(
  (conf) => {
    return conf;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (res: Response) => {
    if (res.status === 403) {
      customHistory.push("/");
      return Promise.reject();
    }
    const promise: Promise<Result> = res.json();
    return promise.then(
      (result: Result) => {
        if (result.code === 200) {
          return Promise.resolve(result);
        } else {
          return Promise.reject(result);
        }
      },
      (err: any) => {
        return Promise.reject(err);
      }
    );
  },
  (err) => Promise.reject(err)
);

export const login = (params: any): Promise<Result> =>
  http.post("/logon", params);
export const register = (params: any): Promise<Result> =>
  http.post("/register", params);
export const getCounties = (): Promise<Result> => http.get("/get");
export const getUserInfo = (): Promise<Result> => http.get("/auth/user");
export const logout = (): Promise<Result> => http.get("/logout");
export const getMovies = (params: Pagination): Promise<Result> =>
  http.get("/getMovies", params);
