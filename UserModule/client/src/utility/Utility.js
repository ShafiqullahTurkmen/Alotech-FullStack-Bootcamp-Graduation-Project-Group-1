import Cookies from "universal-cookie";

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

export function setToken(key = "token", token) {
  const cookies = new Cookies();
  cookies.set(key, token, { path: "/" });
}

export function getToken(key = "token") {
  const cookies = new Cookies();
  return cookies.get(key);
}

export function resetToken(key = "token") {
  const cookies = new Cookies();
  cookies.remove(key);
}
