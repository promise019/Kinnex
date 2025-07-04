import { Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import AuthChecker from "./Utility/AuthChecker";
import Registration from "./Pages/Registration";
import Login from "./layout/Login";
import Signup from "./layout/Signup";
import Mainpage from "./Pages/Mainpage";
import Dashboard from "./Pages/Dashboard";
import Deposit from "./Pages/Deposit";
import Withdraw from "./Pages/Withdraw";
import Invite from "./Pages/Invite";
import Checkin from "./Pages/Checkins";
import Settings from "./Pages/Settings";

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
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='deposit' element={<Deposit />} />
          <Route path='withdraw' element={<Withdraw />} />
          <Route path='invite' element={<Invite />} />
          <Route path='check-in' element={<Checkin />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}
