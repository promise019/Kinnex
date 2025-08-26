import LandingPageNavigation from "../layout/LandingPageNavBar";
import option from "../assets/icon/Options.svg";
import hideOption from "../assets/icon/Close.svg";
import Home from "../layout/Home";
import { useRef, useState } from "react";
import Services from "../layout/Services";
import About from "../layout/About";
import Performance from "../layout/Performance";
import InvestmentPlans from "../layout/InvestmentPlans";
import Reviews from "../layout/Reviews";
import CTA from "../layout/CTA";
import LandingPageFooter from "../layout/ContactDetails";

export default function LandingPage() {
  const [showMenu, setShowMenu] = useState(false);

  const homeRef = useRef();
  const servicesRef = useRef();
  const aboutRef = useRef();
  const performanceRef = useRef();
  const contactRef = useRef();

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-screen">
      <header className="p-2 md:p-5">
        <h1 className="text-transparent bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text font-extrabold text-xl inline-block md:text-3xl">
          Kinnex Ltd
        </h1>
        <img
          src={showMenu ? hideOption : option}
          onClick={() => setShowMenu(!showMenu)}
          className="inline-block float-right w-6 md:hidden"
        />
        <LandingPageNavigation
          showMenu={showMenu}
          toHome={() => scrollTo(homeRef)}
          toService={() => scrollTo(servicesRef)}
          toAbout={() => scrollTo(aboutRef)}
          toPerformance={() => scrollTo(performanceRef)}
          toContact={() => scrollTo(contactRef)}
        />
      </header>
      <main>
        <Home ref={homeRef}/>
        <Services ref={servicesRef}/>
        <About ref={aboutRef}/>
        <Performance ref={performanceRef}/>
        <InvestmentPlans />
        <Reviews />
        <CTA />
        <LandingPageFooter ref={contactRef}/>
      </main>
    </div>
  );
}
