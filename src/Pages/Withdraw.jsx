import Header from "../layout/Header";
import Button from "../component/Button";
import Input from "../component/Input";
import I from "../assets/icon/Frame (12) (1).svg";
import bank from "../assets/icon/Bank.svg";
import paystack from "../assets/icon/Paystack.svg";
import crypto from "../assets/icon/Frame (15) (1).svg";

import { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserDataContext";
import {
  addDoc,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "emailjs-com";

const banks = [
  "Bank",
  "OPAY",
  "PALMPAY",
  "Monie Point",
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
  const [currentUser] = useState(
    sessionStorage.getItem("kinnex-login") ||
      localStorage.getItem("kinnex-login")
  );

  const { referralData, investmentdate } = useContext(userDataContext);

  const [withdrawalData, setWithdrawalData] = useState({
    amount: 0,
    accountNo: "",
    bank: "",
    name: "",
    userId: currentUser,
  });

  const [errors, setErrors] = useState({});

  const handleWithdrawalData = (e) => {
    const { value, name } = e.target;
    setWithdrawalData((prev) => ({ ...prev, [name]: value }));
  };

  const today = new Date();

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSince = Math.floor((today - investmentdate) / msPerDay);

  const hasReferral = referralData.points.length >= 1;
  console.log(referralData.points.length);
  const dateError = daysSince === 0 ? 0 : 20 * daysSince;

  // If referral → fixed 25%, else use dateError
  const percent = hasReferral ? 25 * daysSince : dateError;
  const points = referralData.points;

  let referralBalance = points.reduce((i, index) => i + index, 0);

  const totalAvailable =
    referralData.depositBalance +
    (((referralBalance * 25) / 100 )+
      ((referralData.investmentBalance * 20) / 100) * daysSince) -
     ( ((referralData.referralEarningsWithdrawn || 0)) + (referralData.investmentEarningsWithdrawn || 0))

  // referralData.depositBalance + ((referralBalance * 25) / 100) + ((referralData.investmentBalance * 20) / 100);

  const submitBankDetails = async () => {
    const newErrors = {};
    if (
      Number(withdrawalData.amount) < 1000 ||
      withdrawalData.amount > totalAvailable
    ) {
      newErrors.amount = true;
    }
    if (withdrawalData.accountNo?.length !== 10) {
      newErrors.accountNo = true;
    }
    if (withdrawalData.bank === "Bank" || withdrawalData.bank === "") {
      newErrors.bank = true;
    }
    if (withdrawalData.name?.trim() === "") {
      newErrors.name = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Input Valid Bank Details");
      return;
    }

    try {
      setErrors({});
      const detailsRef = doc(db, "users", currentUser);
      const transactionRef = collection(
        db,
        "users",
        currentUser,
        "transaction"
      );

      await setDoc(
        detailsRef,
        { bankDetails: withdrawalData },
        { merge: true }
      );

      // Deduct from depositBalance first
      let remaining = Number(withdrawalData.amount);

      // Deduct from investment earnings if still remaining
      if (remaining > 0) {
        const investAvailable = referralData.investmentBalance * 0.2; // 20% of investments

        const investDeduction = Math.min(remaining, investAvailable);// returns the smallest amount 

        remaining -= investDeduction;

        await updateDoc(detailsRef, {
          investmentEarningsWithdrawn: increment(investDeduction || 0),
        });
      }

      if (remaining >= referralData.depositBalance) {
        const depositDeduction = referralData.depositBalance;
        remaining -= depositDeduction;

        await updateDoc(detailsRef, {
          depositBalance: increment(-depositDeduction),
        });
      } else {
        const depositDeduction = remaining;
        remaining = 0;

        await updateDoc(detailsRef, {
          depositBalance: increment(-depositDeduction),
        });
      }

      // Deduct from referral earnings (25% of points - already withdrawn)
      if (remaining > 0) {
        const referralBalance = referralData.points.reduce(
          (i, index) => i + index,
          0
        );
        const referralAvailable =
          referralBalance * 0.25 -
          (referralData.referralEarningsWithdrawn || 0);

        const refEarningsDeduction = Math.min(remaining, referralAvailable);

        await updateDoc(detailsRef, {
          referralEarningsWithdrawn:
            (referralData.referralEarningsWithdrawn || 0) +
            refEarningsDeduction,
        });

        remaining -= refEarningsDeduction;
      }

      if (remaining > 0.01) {
        console.warn("Remaining not fully deducted:", remaining);
        // optionally update a debug field in Firestore if you want visibility
      }

      const date = new Date();

      // 1. Add transaction record
      await addDoc(transactionRef, {
        date: date.toLocaleDateString("default", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: date.toLocaleTimeString("default", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        amount: withdrawalData.amount,
        type: "withdraw",
      });

      // email services
      emailjs
        .send(
          "service_22oyzes",
          "template_xn6nwwo",
          withdrawalData,
          "9HJZmqsl0-dv0aCCq"
        )
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

      console.log("submit successful");
      toast.success("Bank Details Submitted");
    } catch (error) {
      console.log(error);
      toast.error("Error Submiting Details");
    }
  };

  return (
    <div className="bg-gray-100 p-3 min-h-screen z-4 md:ml-[30%] lg:ml-[25%] md:w-[70%] lg:w-[75%]">
      <ToastContainer />
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
              {totalAvailable.toLocaleString()}
            </span>
          </p>
        </section>

        <section className="space-y-3">
          <h1>Amount</h1>
          <Input
            value={withdrawalData.amount}
            type={"number"}
            onChange={(e) => handleWithdrawalData(e)}
            name="amount"
            className={`w-full p-3 rounded-lg bg-gray-100 border ${
              errors.amount ? " border-red-500 text-red-500" : ""
            }`}
            placeholder="&#8358; 0.00"
          />

          <h1>Account Details:</h1>
          <div className="w-full space-x-2 lg:inline-block lg:w-fit">
            <select
              className={`inline-block border p-3 max-w-[46%] ${
                errors.bank ? " border-red-500" : ""
              }`}
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
              type={"number"}
              name="accountNo"
              onChange={(e) => handleWithdrawalData(e)}
              className={`max-w-[50%] p-3 border rounded-lg bg-gray-100 ${
                errors.accountNo ? " border-red-500 text-red-500" : ""
              }`}
              placeholder="Account Number"
            />
          </div>

          <Input
            value={withdrawalData.name}
            type={"text"}
            name="name"
            onChange={(e) => handleWithdrawalData(e)}
            className={`w-full p-3 rounded-lg border bg-gray-100 lg:w-[38%] ${
              errors.name ? " border-red-500 text-red-500" : ""
            }`}
            placeholder="Bank Username"
          />

          <br className="hidden xl:block" />

          <Button
            className="w-full p-2.5 rounded-lg bg-blue-700 text-white font-bold lg:w-fit"
            onClick={() => submitBankDetails()}
            disabled={today.getHours() >= 18 || today.getHours() < 9
              ? true
              : false }
          >
            Withdraw
          </Button>
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
