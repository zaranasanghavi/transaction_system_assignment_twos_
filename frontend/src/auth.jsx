export function getTokenExpiry(token) {
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000; // ms
}

export function isTokenExpired(token) {
  const expiry = getTokenExpiry(token);
  return !expiry || Date.now() > expiry;
}
