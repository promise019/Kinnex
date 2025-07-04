import { NavLink } from "react-router";
import dashboard from "../assets/icon/dashboard.svg";
import deposit from "../assets/icon/deposit.svg";
import withdraw from "../assets/icon/withdraw.svg";
import invite from "../assets/icon/invite.svg";
import checkin from "../assets/icon/checkin.svg";
import Button from "../component/Button";
import settings from "../assets/icon/Frame (10) (1).svg";
import logout from "../assets/icon/logout.svg";

export default function NavBar() {
  return (
    <nav className='bg-[#1E3A8A] text-white p-3  fixed bottom-0 z-3 left-0 w-screen md:static md:w-[30%] md:h-screen lg:w-[25%]'>
      <h1 className='hidden md:block font-bold text-2xl mb-10 '>Kinnex Ltd</h1>
      {/* <br className='hidden md:block' /> */}
      <section className='flex justify-between w-screen md:h-fit md:grid md:space-y-4 '>
        <NavLink
          to='dashboard'
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#1D4ED8] rounded-full font-bold md:rounded-lg"
                : ""
            } flex md:space-x-4 md:min-w-[200px] lg:min-w-[240px] p-3 xl:min-w-[320px]`
          }
        >
          <img src={dashboard} className='w-7 md:inline-block' />
          <span className='hidden md:flex'>Dashboard</span>
        </NavLink>

        <NavLink
          to='deposit'
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#1D4ED8] rounded-full font-bold md:rounded-lg"
                : ""
            } flex md:space-x-4 md:w-full p-3`
          }
        >
          <img src={deposit} className='w-7 md:inline' />
          <span className='hidden md:inline-block'>Deposit</span>
        </NavLink>

        <NavLink
          to='withdraw'
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#1D4ED8] rounded-full font-bold md:rounded-lg"
                : ""
            } flex md:space-x-4 md:w-full p-3`
          }
        >
          <img src={withdraw} className='w-7' />
          <span className='hidden md:inline-block'>Withdraw</span>
        </NavLink>

        <NavLink
          to='invite'
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#1D4ED8] rounded-full font-bold md:rounded-lg"
                : ""
            } flex md:space-x-4 md:w-full p-3`
          }
        >
          <img src={invite} className='w-7' />
          <span className='hidden md:inline-block'>Invite Members</span>
        </NavLink>

        <NavLink
          to='check-in'
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#1D4ED8] rounded-full font-bold md:rounded-lg"
                : ""
            } flex md:space-x-4 md:w-full p-3`
          }
        >
          <img src={checkin} className='w-7' />
          <span className='hidden md:inline-block'>Daily Check-in</span>
        </NavLink>

        <br />

        <section className='fixed right-3 top-3 md:static md:grid'>
          <NavLink
            to='settings'
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-[#1D4ED8] font-bold md:rounded-lg"
                  : "bg-[#1E3A8A]"
              } flex md:space-x-4 rounded-full p-2 md:w-full`
            }
          >
            <img src={settings} className='w-7' />
            <span className='hidden md:inline-block'>Settings</span>
          </NavLink>

          <Button className='hidden md:flex space-x-4 w-full p-3 md:rounded-lg'>
            <img src={logout} className='w-7' />
            <span className='hidden md:inline-block'>Log Out</span>
          </Button>
        </section>
      </section>
    </nav>
  );
}
