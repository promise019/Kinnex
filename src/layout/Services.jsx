import Equity from "../assets/icon/Frame (15).svg";
import Portfolio from "../assets/icon/Frame (1).svg";
import realEstate from "../assets/icon/Frame (2).svg";
import retirement from "../assets/icon/Frame (12).svg";

const services = [
  {
    icon: Equity,
    service: "Equity Investment",
    detail:
      "Strategic stock market investment tailored to your risk profile and growth objectives",
  },
  {
    icon: Portfolio,
    service: "Portfolio Management",
    detail:
      "Expertmanagement of diversified investment Portfolioss to maximize returns and minimize risks",
  },
  {
    icon: realEstate,
    service: "Real Estate Funds",
    detail:
      "Access to exclusive real estate investment oppourtunities with competitie yields",
  },
  {
    icon: retirement,
    service: "Retirement Planning",
    detail:
      "Comprehensive retirement solutions designed to secure your financial future",
  },
];

export default function Services({ref}) {
  return (
    <div ref={ref}
      id='services'
      className='text-center p-4 bg-gray-100 space-y-6 lg:px-7'
    >
      <section className='space-y-4 md:px-10'>
        <h1 className='font-bold text-2xl'>Investment Services</h1>
        <p>
          Kinnex Ltd offers a comprehensive range of investments designed %to
          help you achieve your financial goals
        </p>
      </section>

      <div className='space-y-4 md:grid grid-cols-2 md:space-x-4 md:px-4'>
        {services.map((service, index) => (
          <section
            key={index}
            className='shadow-xl p-6 rounded-lg text-left space-y-2 bg-white md:w-[95%] md:h-[200px] md:ml-2 '
          >
            <img src={service.icon} className='' />
            <h1 className='font-bold text-lg'>{service.service}</h1>
            <p>{service.detail}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
