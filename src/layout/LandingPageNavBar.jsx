

export default function LandingPageNavigation({ showMenu, toHome, toService, toAbout, toPerformance, toContact }) {
  return (
    <nav
      className={`${
        showMenu
          ? "grid w-50 absolute right-1 p-2 bg-white rounded-xl"
          : "hidden"
      }  md:inline-block float-right space-x-3 font-bold text-blue`}
    >
      <button onClick={toHome} className="text-left p-1"> Home</button>
      <button onClick={toService} className="text-left p-1">Services</button>
      <button onClick={toAbout} className="text-left p-1">About</button>
      <button onClick={toPerformance} className="text-left p-1">Performance</button>
      <button onClick={toContact}
        className='bg-blue-600 text-white rounded-xl p-3'
      >
        Contact Us
      </button>
    </nav>
  );
}
