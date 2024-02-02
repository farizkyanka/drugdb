import { redirect } from "react-router-dom";
import { User } from "../contexts/UserContext";

export function checkAuthLoader() {
    const isLoggedIn = User().isLoggedIn

    if(!isLoggedIn) {
        return redirect('/admin/login')
    }
}