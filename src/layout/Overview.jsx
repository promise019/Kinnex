import timer from "../assets/icon/Frame (9).svg";
import invest from "../assets/icon/Invest.svg";
import PaystackButton from "../component/PaystackButton";
import { userDataContext } from "../context/UserDataContext";
import { useContext } from "react";

const overview_details = [
  { heading: "Total Earings", digit: 389999 },
  { heading: "Active Ivestments", digit: 8 },
  { heading: "Available Balance", digit: 125400 },
  { heading: "Referral Earnings", digit: 28500 },
];

const plans = [
  { plan: 1, amount: 3000, returns: 600, roi: 20, total:15000 },
  { plan: 2, amount: 6000, returns: 1200, roi: 20, total:30000},
  { plan: 3, amount: 10000, returns: 2000, roi: 20, total:50000 },
  { plan: 4, amount: 15000, returns: 3000, roi: 20, total:75000 },
  { plan: 5, amount: 25000, returns: 5000, roi: 20, total:125000 },
  { plan: 6, amount: 50000, returns: 10000, roi: 20, total:200000 },
  { plan: 7, amount: 100000, returns: 20000, roi: 20, total:250000 },
  { plan: 8, amount: 200000, returns: 40000, roi: 20, total:1000000 },
  { plan: 9, amount: 400000, returns: 80000, roi: 20, total: 3000000 },
  { plan: 10, amount: 600000, returns: 120000, roi: 20, total:5000000 },
  // { plan: 11, amount: 1000000, returns: 200000, roi: 20 },
];

export default function Overview({}) {
  const {referralData} = useContext(userDataContext)

  return (
    <div className="space-y-4">
      <h1 className="mt-12 mb-3">Overview </h1>
      <section className="grid grid-cols-2 space-y-5 space-x-2">
        {overview_details.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 space-y-4 border-l-5 border-blue-700 rounded-xl h-20"
          >
            <span className="text-sm text-gray-600 font-bold">
              {item.heading}
            </span>
            <h1 className="font-bold text-xl">
              {index !== 1 ? <span>&#8358;</span> : " "}{" "}
              {item.digit.toLocaleString()}
            </h1>
          </div>
        ))}
      </section>

      <section className="bg-blue-200 text-blue-800 w-full p-2 space-y-3 space-x-2">
        <img src={timer} className="w-6 inline-block mt-3" />{" "}
        <h1 className="inline-block font-bold ">Important Information</h1>
        <li>All investments expire after 25 days</li>
        <li>Withdrawal Hours 9:00 AM - 6:00 PM</li>
        <li>Minimum Withdrawal Amount &#8358;1,000</li>
        <li>Withdrawal Fees: 10%</li>
        <li>
          Referral bonuses: 25% (1st level), 3% (2nd level), 1% (3rd level){" "}
        </li>
      </section>

      <section className="bg-white rounded-lg p-6 shadow">
        <div className="p-2">
          <h1 className="font-bold">Investment Plans</h1>
          <p>All plans Mature in 25 days</p>
        </div>

        <div className="grid md:grid-cols-2 space-y-3 space-x-4 pb-13 xl:space-x-10">
          {plans.map((item) => (
            <div key={item.plan} className="p-2">
              <div className="bg-blue-200 text-blue-800 p-3 rounded-lg ">
                &#8358;{item.amount} Plan
              </div>
              <table className="w-full p-4">
                <tbody className="space-y-3 p-4">
                  <tr>
                    <td className="p-2">Investment:</td>
                    <td className="text-right p-2 font-bold">
                      &#8358;{item.amount}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Returns:</td>
                    <td className="text-right p-2 font-bold text-green-400">
                      &#8358;{item.returns}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">ROI:</td>
                    <td className="text-right p-2 font-bold text-blue-400">
                      {item.roi}%
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="h-4 font-black"></td>
                  </tr>
                  <tr>
                    <td className="p-2">Total:</td>
                    <td className="text-right p-2 font-bold">
                      &#8358;{item.total}
                    </td>
                  </tr>
                </tbody>
              </table>
              <PaystackButton
               amount={item.amount}
               email={referralData.email}
                className={
                  "text-white bg-blue-800 rounded-lg w-full font-bold p-3 space-x-3"
                }
              >
                <img src={invest} className="w-7 inline-block" />
                <span>Invest Now</span>
              </PaystackButton>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
