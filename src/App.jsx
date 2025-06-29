import { Route, Routes } from "react-router";
import "./index.css";
import LandingPage from "./Pages/LandingPage";
import AuthChecker from "./Utility/AuthChecker";
import Registration from "./Pages/Registration";
export default function App() {
  return (
    <div className='bg-white overflow-hidden'>
      <Routes>
        <Route index element={<AuthChecker />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/registration' element={<Registration />}></Route>
      </Routes>
    </div>
  );
}
