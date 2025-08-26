import facebook from "../assets/icon/fb.svg";
import tweeter from "../assets/icon/Container (2).svg";
import insta from "../assets/icon/Container.svg";
import linkedIn from "../assets/icon/Container (1).svg";
import location from "../assets/icon/Frame (3).svg";
import call from "../assets/icon/Frame (5).svg";
import mail from "../assets/icon/Frame (4).svg";

export default function LandingPageFooter({ref}) {
  return (
    <footer id="contact" className='bg-gray-950 text-white grid grid-cols-2 p-6 space-y-6' ref={ref}>
      <section className='space-x-3'>
        <h1 className='font-bold text-lg'>Kinnex Ltd</h1>
        <br />
        <p>
          Providing expert investment services and financial guidiance since
          2008
        </p>
        <img src={facebook} className='inline-block' />
        <img src={tweeter} className='inline-block' />
        <img src={linkedIn} className='inline-block' />
        <img src={insta} className='inline-block' />
      </section>

      <section>
        <h1 className='font-bold text-lg'>Services</h1>
        <br />
        <ul className=''>
          <li>Equity Investments</li>
          <li>Portfolio Management</li>
          <li>Real Estate Funds</li>
          <li>Retirement Planning</li>
          <li>Financial Advisory</li>
        </ul>
      </section>

      <section>
        <h1 className='font-bold text-lg'>Quick Links</h1>
        <br />
        <ul className=''>
          <li>About Us</li>
          <li>Our Teams</li>
          <li>Careers</li>
          <li>News & Insights</li>
          <li>Contact Us</li>
        </ul>
      </section>

      <section className='space-y-2 space-x-2'>
        <h1 className='font-bold text-lg'>Contact</h1>
        <br />
        <img src={location} className='inline-block' />
        <h2 className='inline-block'>123 Finance Street, New York, NY 10001</h2>
        <br />
        <img src={call} className='inline-block' />
        <h2 className='inline-block'>+1 (365) 740-0656</h2>
        <br />
        <img src={mail} className='inline-block' />
        <h2 className='inline-block'>kinnexsupprt@gmail.com</h2>
      </section>
    </footer>
  );
}
