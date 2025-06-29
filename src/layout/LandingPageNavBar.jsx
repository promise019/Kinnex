import { Link } from "react-router";

export default function LandingPageNavigation({ showMenu }) {
  return (
    <nav
      className={`${
        showMenu
          ? "grid w-50 mt-1 absolute right-1 p-2 bg-white rounded-xl"
          : "hidden"
      }  md:inline-block float-right space-x-3 font-bold text-blue`}
    >
      <Link to='/landingpage#home'>Home</Link>
      <Link to='/landingpage#services'>Services</Link>
      <Link to='/landingpage#about'>About</Link>
      <Link to='/landingpage#performance'>Performance</Link>
      <Link
        to='/landingpage#contact'
        className='bg-blue-600 text-white rounded-xl p-3'
      >
        Contact Us
      </Link>
    </nav>
  );
}
