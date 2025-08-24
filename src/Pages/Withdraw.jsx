import Header from "../layout/Header";
import Button from "../component/Button";
import Input from "../component/Input";
import I from "../assets/icon/Frame (12) (1).svg";
import bank from "../assets/icon/Bank.svg";
import paystack from "../assets/icon/Paystack.svg";
import crypto from "../assets/icon/Frame (15) (1).svg";

import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../context/UserDataContext";

const banks = [
  "Bank",
  "Access Bank",
  "Diamond Bank",
  "Ecobank",
  "Fidelity Bank",
  "First Bank",
  "FCMB",
  "GTBank",
  "Jaiz Bank",
  "Keystone Bank",
  "Stanbic IBTC",
  "Sterling Bank",
  "Union Bank",
  "UBA",
  "Unity Bank",
  "WEMA Bank",
  "Zenith Bank",
];

export default function Withdraw() {
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    accountNo: "",
    bank: "",
    name: "",
  });

  const handleWithdrawalData = (e) => {
    const { value, name } = e.target;
    setWithdrawalData((prev) => ({ ...prev, [name]: value }));
  };

  const { referralData } = useContext(userDataContext);
  const percentage =
    referralData.availableBalance <= 15000
      ? 1
      : referralData.availableBalance > 15000 ||
        referralData.availableBalance <= 100000
      ? 3
      : 25;

  useEffect(() => {
    console.log(withdrawalData.amount);
    console.log(withdrawalData.accountNo);
    console.log(withdrawalData.bank);
    console.log(withdrawalData.name);
  }, [
    withdrawalData.amount,
    withdrawalData.accountNo,
    withdrawalData.bank,
    withdrawalData.name,
  ]);

  return (
    <div className="bg-gray-100 p-3 min-h-screen z-4 md:ml-[30%] lg:ml-[25%] md:w-[70%] lg:w-[75%]">
      <Header Page={"Withdraw Funds"} />
      <p className="mt-12 mb-3">Withdraw funds from your investment account</p>
      <main className="bg-white p-4 rounded-lg space-y-7 md:w-full">
        <br />
        <section className="flex space-x-2 bg-gray-100 p-3 rounded-lg ">
          <img src={I} className="w-6" />
          <p className="text-blue-800 space-x-2">
            <span>Available Balance:</span>
            <span className="text-black font-bold text-lg">
              &#8358;
              {((referralData.availableBalance * percentage) / 100) *
                referralData.points +
                referralData.availableBalance}
            </span>
          </p>
        </section>

        <section className="space-y-3">
          <h1>Amount</h1>
          <Input
            value={withdrawalData.amount}
            type={"Number"}
            onChange={(e) => handleWithdrawalData(e)}
            name="amount"
            className={"w-full p-3 rounded-lg bg-gray-100"}
            placeholder="&#8358; 0.00"
          />

          <h1>Account Details:</h1>
          <div className="w-full space-x-2">
            <select
              className="inline-block p-2 max-w-[50%]"
              value={withdrawalData.bank}
              name="bank"
              onChange={(e) => handleWithdrawalData(e)}
            >
              {banks.map((bnk, i) => (
                <option value={bnk} key={i} className="p-2">
                  {bnk}
                </option>
              ))}
            </select>

            <Input
              value={withdrawalData.accountNo}
              type={"Number"}
              name="accountNo"
              onChange={(e) => handleWithdrawalData(e)}
              className={"max-w-[50%] p-3 rounded-lg bg-gray-100"}
              placeholder="Account Number"
            />
          </div>

          <Input
            value={withdrawalData.name}
            type={"text"}
            name="name"
            onChange={(e) => handleWithdrawalData(e)}
            className={"w-full block p-3 rounded-lg bg-gray-100"}
            placeholder="Bank Username"
          />
        </section>

        <section className="space-x-2 space-y-2 md:p-2">
          {/* <h1 className="text-">Select Withdrawal Method</h1>
          <Button className="p-3 rounded-lg space-x-1 bg-gray-50">
            <img src={paystack} className="w-5 inline-block" />
            <span> Paystack</span>
          </Button>
          <Button className="p-3 rounded-lg space-x-1 bg-gray-50">
            <img src={bank} className="w-6 inline-block" />
            <span>Bank Transfer</span>
          </Button>
          <Button className="p-3 rounded-lg space-x-1 bg-gray-50">
            <img src={crypto} className="w-6 inline-block" />
            <span>Cryptocurrency</span>
          </Button> */}

          <h1 className="text-blue-700">
            All Funds will be available within 24hrs
          </h1>
        </section>
      </main>
    </div>
  );
}
