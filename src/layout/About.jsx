import image from "../assets/images/Container.png";
import verified from "../assets/icon/Frame.svg";

const about = [
  "Over 15 years of industry experience",
  "Team of verified financial advisors",
  "Personalized Investment strategies",
  "Transparent fee structure with no hidden costs",
  "Regular portfolio reviews and adjustments",
];
export default function About() {
  return (
    <div id='about' className='bg-white p-5  space-y-4 lg:px-8'>
      <img src={image} className='md:w-full' />
      <h1 className='font-bold text-2xl'>About Kinnex Ltd</h1>
      <p>
        Founded in 2008, Kinnex Ltd has established itself as a trusted partner
        in wealth management and investment services. Our mission is to help our
        clients achieve financial security and growth through strategic,
        personalised investment solutions
      </p>

      <p>
        We combine innovative financial technology with traditional investment
        wisdom to deliver exceptional results for individuals and organizations
        alike
      </p>

      <section className='space-y-3'>
        {about.map((i, index) => (
          <div key={index} className='flex space-x-3'>
            <img src={verified} className='' />
            <p>{i}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
