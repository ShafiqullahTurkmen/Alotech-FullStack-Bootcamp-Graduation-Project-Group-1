import Cookies from "universal-cookie";
import configData from "../config.json";

export function setToken(token, key = "access_token") {
  const cookies = new Cookies();
  cookies.set(key, token, { path: "/" });
}

export function getToken(key = "access_token") {
  const cookies = new Cookies();
  return cookies.get(key);
}

export function resetToken(key = "access_token") {
  const cookies = new Cookies();
  setToken(undefined);
  cookies.remove(key);
}

export function redirectLogin() {
  const currentURL = window.location.origin;
  window.location.href = `${configData.authUrl}/auth?redirectURL=${currentURL}`;
}
