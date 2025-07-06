import { Fragment } from "react";
import withdrawalhour from "../assets/icon/Frame (9).svg";
import ref from "../assets/icon/Frame (10).svg";
import withdrawalterm from "../assets/icon/Frame (11).svg";
import duration from "../assets/icon/Vector.svg";

const plans = [
  { plan: 1, amount: 3000, returns: 600, roi: 20 },
  { plan: 2, amount: 6000, returns: 1200, roi: 20 },
  { plan: 3, amount: 10000, returns: 2000, roi: 20 },
  { plan: 4, amount: 15000, returns: 3000, roi: 20 },
  { plan: 5, amount: 25000, returns: 5000, roi: 20 },
  { plan: 6, amount: 50000, returns: 10000, roi: 20 },
  { plan: 7, amount: 100000, returns: 20000, roi: 20 },
  { plan: 8, amount: 200000, returns: 40000, roi: 20 },
  { plan: 9, amount: 400000, returns: 80000, roi: 20 },
  { plan: 10, amount: 600000, returns: 120000, roi: 20 },
  { plan: 11, amount: 1000000, returns: 200000, roi: 20 },
];

export default function InvestmentPlans() {
  return (
    <div className='text-center py-10 px-4'>
      <h1 className='text-2xl font-bold'>Available Investment Plans</h1>
      <p>All plans expires in 25 days with guaranteed returns</p>
      <table className='w-full p-2 md:w-[85%] md:ml-[8%]'>
        <thead className='text-left bg-gray-200 rounded-lg md:text-center'>
          <tr className='p-3 '>
            <th className='p-2 rounded-l-lg'>Plan</th>
            <th className='p-2'>Investment Amount</th>
            <th className='p-2'>Returns</th>
            <th className='p-2 rounded-r-lg'>ROI</th>
          </tr>
        </thead>
        <tbody className='text-left md:text-center'>
          {plans.map((i, index) => (
            <Fragment key={index}>
              <tr className='mb-5'>
                <td className='p-2'>Plan{i.plan}</td>
                <td className='pl-4'>&#8358;{i.amount}</td>
                <td className='text-yellow-500 p-2'>&#8358;{i.returns}</td>
                <td className='text-blue-500 p-2'>{i.roi}%</td>
              </tr>
              <tr>
                <td colSpan={2} className='h-3'></td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>

      <section className='text-left grid grid-cols-2 w-full ml-1 mt-6 md:ml-[10%] lg:ml-[13%] xl:ml-[17%]'>
        <div className='p-3 w-full space-x-1 space-y-2'>
          <img src={withdrawalhour} className='inline-block' />
          <span>
            <b>Withdrawal Hours</b>
          </span>
          <p>9:00 AM - 6:00 PM</p>
        </div>

        <div className='p-3 w-full space-x-1 space-y-2'>
          <img src={ref} className='inline-block' />
          <span>
            <b>Referral Bonuses</b>
          </span>
          <ul className='list-disc'>
            <li>1st Level: 25%</li>
            <li>2nd Level: 3%</li>
            <li>3rd Level: 1%</li>
          </ul>
        </div>

        <div className='p-3 w-full space-x-1 space-y-2'>
          <img src={withdrawalterm} className='inline-block' />
          <span>
            <b>Withdrawal Terms</b>
          </span>
          <ul className='list-disc'>
            <li>Minimum: &#8358; 1000</li>
            <li>Charges: 10%</li>
          </ul>
        </div>

        <div className='p-3 w-full space-x-1 space-y-2'>
          <img src={duration} className='inline-block' />
          <span>
            <b>Referral Bonuses</b>
          </span>
          <p>All plans expires in 25 days</p>
        </div>
      </section>
    </div>
  );
}
