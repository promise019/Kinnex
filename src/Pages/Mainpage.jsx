import { Outlet } from "react-router";
import NavBar from "../layout/NavBar";
import { useContext, useEffect } from "react";
import { userDataContext } from "../context/UserDataContext";

export default function Mainpage() {
  const currentUser =
    sessionStorage.getItem("kinnex-login") ||
    localStorage.getItem("kinnex-login");
  const { getUserData, setCurrentUser } = useContext(userDataContext);

  useEffect(() => {
    setCurrentUser(currentUser);
    /*get user data once the page mounts. reason for doing this is because we used localstorage to store user id 
     if the user is not logged in, it'll throw null and cause an error once the web app mounts. the localSorage holds the user id used to access the user collection field
     (because we are using context api which is general) so we had to create a function to call the get data function and run it when the mainpage mounts instead of when the app is visited
    */
    getUserData();
  }, []);

  return (
    <div className='md:flex justify-between'>
      <NavBar />
      <Outlet />
    </div>
  );
}
