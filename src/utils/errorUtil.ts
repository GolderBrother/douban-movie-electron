/*
 * @Description: 获取错误信息工具
 * @Author: james.zhang
 * @Date: 2019-08-03 09:58:46
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-08-03 10:02:52
 */

export function getErrorMsgByStatus(errResponse: any): string {
  let errMsg = "";
  const status = (errResponse && errResponse.status) || "";
  if (!status) return "";
  switch (status) {
    case 400:
      errMsg = "请求错误";
      break;

    case 401:
      errMsg = "未授权，请登录";
      break;

    case 403:
      errMsg = "拒绝访问";
      break;

    case 404:
      errMsg = `请求地址出错: ${(errResponse.config &&
        errResponse.config.url) ||
        ""}`;
      break;

    case 405:
      errMsg = "登录已过期";
      break;

    case 408:
      errMsg = "请求超时";
      break;

    case 500:
      errMsg = "服务器内部错误";
      break;

    case 501:
      errMsg = "服务未实现";
      break;

    case 502:
      errMsg = "网关错误";
      break;

    case 503:
      errMsg = "服务不可用";
      break;

    case 504:
      errMsg = "请检查网络连接";
      break;

    case 505:
      errMsg = "HTTP版本不受支持";
      break;

    default:
      break;
  }
  return errMsg;
}
