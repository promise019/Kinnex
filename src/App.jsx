import { Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import AuthChecker from "./Utility/AuthChecker";
import Registration from "./Pages/Registration";
import Login from "./layout/Login";
import Signup from "./layout/Signup";
import Mainpage from "./Pages/Mainpage";

export default function App() {
  return (
    <div className='bg-white overflow-hidden'>
      <Routes>
        <Route index element={<AuthChecker />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/registration' element={<Registration />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='/home' element={<Mainpage />}>
          <Route path='dashboard' element={<div>dasshhshshshsbord</div>} />
          <Route path='' />
        </Route>
      </Routes>
    </div>
  );
}
