import { Outlet } from "react-router";
import NavBar from "../layout/NavBar";

export default function Mainpage() {
  return (
    <div className='md:flex justify-between'>
      <NavBar />
      <Outlet />
    </div>
  );
}
