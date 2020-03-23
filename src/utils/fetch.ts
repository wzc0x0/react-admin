/**
 * @description 封装window.fetch方法并且加入了拦截器功能
 * @param get noting
 * @param post post formData
 * @param postJSON post json data
 */
// 拦截器参数格式
interface Interceptor {
  fulfilled: (data: any) => any;
  rejected: (error: any) => any;
}
// 拦截器类
class InterceptorManager {
  handlers: any[] = [];
  use(fulfilled: (data: any) => any, rejected: (error: any) => any) {
    this.handlers.push({ fulfilled, rejected });
  }
}

export default class HttpClient {
  private baseURL: string;
  private withCredentials: boolean;
  private headers: any;
  public interceptors: {
    request: InterceptorManager;
    response: InterceptorManager;
  };

  constructor(
    baseURL: string = "",
    withCredentials: boolean = true,
    headers: Record<string, string> = {}
  ) {
    this.baseURL = baseURL;
    this.withCredentials = withCredentials;
    this.headers = headers;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }

  private http(url: string, params: Record<string, any>) {
    const request: Request = new window.Request(url, params);
    const chain: any[] = [window.fetch, undefined];
    let promise: any = Promise.resolve(request);
    this.interceptors.request.handlers.forEach((interceptor: Interceptor) => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.handlers.forEach((interceptor: Interceptor) => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }

  get(url: string, params?: Record<string, any>) {
    const urlSearchString: string = this.encodeFormData(params);
    return this.http(
      `${this.baseURL}${url}${urlSearchString ? `?${urlSearchString}` : ""}`,
      {
        method: "GET",
        credentials: this.withCredentials ? "include" : "same-origin",
        headers: new window.Headers(this.headers)
      }
    );
  }

  post(url: string, params?: Record<string, any>) {
    return this.http(`${this.baseURL}${url}`, {
      method: "POST",
      body: this.encodeFormData(params),
      credentials: this.withCredentials ? "include" : "same-origin",
      headers: new window.Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        ...this.headers
      })
    });
  }

  postJSON(url: string, params?: Record<string, any>) {
    return this.http(`${this.baseURL}${url}`, {
      method: "POST",
      body: params ? JSON.stringify(params) : "",
      credentials: this.withCredentials ? "include" : "same-origin",
      headers: new window.Headers({
        "Content-Type": "application/json;charset=UTF-8",
        ...this.headers
      })
    });
  }

  private encodeFormData(data: Record<string, any> = {}): string {
    return Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join("&");
  }
}
