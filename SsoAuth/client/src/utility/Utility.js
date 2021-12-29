import Cookies from "universal-cookie";

export function setCookie(key, cookie) {
  const cookies = new Cookies();
  cookies.set(key, cookie, { path: "/" });
}

export function getCookie(key) {
  const cookies = new Cookies();
  return cookies.get(key);
}

export function deleteCookie(key) {
  const cookies = new Cookies();
  cookies.remove(key);
}
