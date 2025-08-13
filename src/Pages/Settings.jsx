import { NavLink, Outlet } from "react-router";
import Header from "../layout/Header";
import account from "../assets/icon/Account.svg";
import passkey from "../assets/icon/passkey.svg";

export default function Settings() {
  return (
    <div className="bg-gray-100 p-3 min-h-screen z-4 md:ml-[30%] lg:ml-[25%] md:w-[70%] lg:w-[75%] ">
      <Header Page={"Settings"} />
      <h1 className="mt-12 mb-3">
        Manage your account settings and preferences
      </h1>
      <section className="flex space-x-3">
        <nav className="shadow rounded-tl-xl bg-white grid h-24 w-fit md:w-[30%] md:p-3">
          <NavLink
            to="accountinfo"
            className={({ isActive }) =>
              `w-full p-2 md:space-x-2 rounded-lg ${
                isActive ? "bg-blue-300 text-blue-700" : ""
              }`
            }
          >
            <img src={account} className="inline-block w-7" />
            <span className="hidden md:inline-block">Account</span>
          </NavLink>

          <NavLink to='passwordsettings' className={({ isActive }) => `w-full p-2 md:space-x-2 rounded-lg`}>
            <img src={passkey} className="inline-block w-7" />
            <span className="hidden md:inline-block">Password</span>
          </NavLink>
        </nav>

        <Outlet />
      </section>
    </div>
  );
}
