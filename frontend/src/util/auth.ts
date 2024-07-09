import { redirect } from "react-router-dom";

export function checkAuth() {
  const userProfile = localStorage.getItem("userProfile");
  return userProfile;
}

export function authLoader() {
  return checkAuth();
}

export function routeProtectionCheck() {
  const userProfile = checkAuth();

  if (!userProfile) {
    return redirect("./admin/login");
  } else return null;
}
