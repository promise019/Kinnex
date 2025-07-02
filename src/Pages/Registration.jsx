import { NavLink, Outlet, useNavigate } from "react-router";
import kinnex from "../assets/icon/Frame (2).svg";
import kinnex1 from "../assets/icon/Frame (2) (copy).svg";
import arrow from "../assets/icon/arror right.svg";
import { useEffect } from "react";

export default function Registration() {
  const navigate = useNavigate();

  return (
    <div className='flex pb-2 bg-gray-100 md:h-screen md:pb-1'>
      <section className='hidden md:block bg-blue-700 md:w-[50%] md:p-6 lg:p-10 xl:p-15 text-white'>
        <section>
          <img src={kinnex1} className='inline-block' />
          <span className='font-bold text-2xl mt-1.5'>Kinnex Ltd</span>
        </section>
        <br />
        <br />
        <h1 className='text-4xl text-white font-bold'>
          Invest in your future with confidence
        </h1>
        <br />
        <br />
        <p>
          Join thousands of investors who trust kinnex Ltd with their financial
          goals.
        </p>
        <br />

        <section className='space-x-3 space-y-3'>
          <img src={arrow} className='inline-block mt-2' />
          <span>Expert investment strategies</span>

          <br />

          <img src={arrow} className='inline-block mt-2' />
          <span>Personalized portfolio management</span>

          <br />

          <img src={arrow} className='inline-block mt-2' />
          <span>Real-time market insights</span>
        </section>

        <br />
        <br />

        <p>
          &copy; {new Date().getFullYear()} Kinnex Ltd. All rights reserved.
        </p>
      </section>

      <section className='p-4 space-y-3 w-full bg-gray-100 h-screen overflow-y-scroll md:w-[50%] md:p-6 lg:p-10 xl:p-15'>
        <img src={kinnex} className='inline-block md:hidden' />
        <span className='font-bold text-bllue-400 text-xl mt-1.5 md:hidden'>
          Kinnex Ltd
        </span>
        <nav className='flex justify-center'>
          <NavLink
            to='login'
            className={({ isActive }) =>
              `p-3 text-center w-full font-bold ${
                isActive ? "text-blue-700 border-b border-blue-700" : ""
              }`
            }
          >
            Log In
          </NavLink>

          <NavLink
            to='signup'
            className={({ isActive }) =>
              `p-3 w-full text-center font-bold ${
                isActive ? "text-blue-700 border-b border-blue-700" : ""
              }`
            }
          >
            Sign Up
          </NavLink>
        </nav>
        <Outlet />
      </section>
    </div>
  );
}
