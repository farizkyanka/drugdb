export function checkAuth() {
  const userProfile = localStorage.getItem("userProfile");
  return userProfile;
}

export function authLoader() {
  return checkAuth();
}
