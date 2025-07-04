import LandingPage from "../Pages/LandingPage";
import Registration from "../Pages/Registration";
import { useNavigate } from "react-router";

export default function AuthChecker({ children }) {
  const isLoggedIn = localStorage.getItem("kinnex-login");
  return isLoggedIn ? <Registration /> : <LandingPage />;
}
