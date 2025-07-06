import Header from "../layout/Header";
import Input from "../component/Input";
import I from "../assets/icon/Frame (12) (1).svg";
import Button from "../component/Button";
import bank from "../assets/icon/Bank.svg";
import paystack from "../assets/icon/Paystack.svg";
import crypto from "../assets/icon/Frame (15) (1).svg";
import { useEffect, useRef, useState } from "react";

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

export default function Deposit() {
  const [amount, setAmount] = useState();
  const inputRef = useRef(null);

  return (
    <div className='bg-gray-100 p-3 min-h-screen z-4 md:w-[70%] lg:w-[75%]'>
      <Header Page={"Deposit Funds"} />
      <p className='mt-12 mb-3'>Add funds to your investment account</p>
      <main className='bg-white p-4 rounded-lg space-y-5 md:w-full'>
        <section className='space-x-2 space-y-2 md:p-2'>
          <h1 className='font-bold'>Select Payment Method</h1>
          <Button
            className='p-3 rounded-lg space-x-1 bg-gray-50'
            onClick={() => console.log("button clicked")}
          >
            <img src={paystack} className='w-5 inline-block' />
            <span> Paystack</span>
          </Button>
          <Button className='p-3 rounded-lg space-x-1 bg-gray-50'>
            <img src={bank} className='w-6 inline-block' />
            <span>Bank Transfer</span>
          </Button>
          <Button className='p-3 rounded-lg space-x-1 bg-gray-50'>
            <img src={crypto} className='w-6 inline-block' />
            <span>Cryptocurrency</span>
          </Button>
        </section>

        <section>
          <h1>Amount</h1>
          <Input
            ref={inputRef}
            value={amount}
            type={"Number"}
            onChange={(e) => setAmount(e.target.value)}
            className={"w-full p-3 rounded-lg bg-gray-100"}
            placeholder='&#8358; 5,000.00'
          />
          <section className='w-full overflow-x-auto flex p-2 space-x-4'>
            {plans.map((i) => (
              <Button
                key={i.plan}
                className='p-1.5 border border-gray-400 rounded-2xl '
                onClick={() => setAmount(i.amount)}
              >
                &#8358;{i.amount}
              </Button>
            ))}
          </section>
        </section>

        <section className='flex space-x-2 bg-gray-100 p-2 rounded-lg '>
          <img src={I} className='w-6' />
          <p className='text-blue-800'>
            Funds will be available in your account within 24 hours.
            <br />
            Minimum Deposit: &#8358;3,000
          </p>
        </section>
      </main>
    </div>
  );
}
