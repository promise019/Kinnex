import LandingPage from "../Pages/LandingPage";
import Registration from "../Pages/Registration";

export default function AuthChecker({ children }) {
  const isLoggedIn = localStorage.getItem("Kinnex-login");
  return isLoggedIn ? <Registration /> : <LandingPage />;
}
