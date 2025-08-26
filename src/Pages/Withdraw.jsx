import Header from "../layout/Header";
import Button from "../component/Button";
import Input from "../component/Input";
import I from "../assets/icon/Frame (12) (1).svg";
import bank from "../assets/icon/Bank.svg";
import paystack from "../assets/icon/Paystack.svg";
import crypto from "../assets/icon/Frame (15) (1).svg";

import { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserDataContext";
import { addDoc, collection, doc, increment, setDoc, updateDoc } from "firebase/firestore";
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
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
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

  const { referralData } = useContext(userDataContext);

  const percentage =
    referralData.availableBalance <= 15000
      ? 1
      : referralData.availableBalance > 15000 ||
        referralData.availableBalance <= 100000
      ? 3
      : 25;

  const total =
    ((referralData.availableBalance * percentage) / 100) * referralData.points +
    referralData.availableBalance;

  const submitBankDetails = async () => {
    const newErrors = {};
    if (withdrawalData.amount < 1000 || withdrawalData.amount > total) {
      newErrors.amount = true;
    }
    if (withdrawalData.accountNo.length !== 10) {
      newErrors.accountNo = true;
    }
    if (withdrawalData.bank === "Bank" || withdrawalData.bank === "") {
      newErrors.bank = true;
    }
    if (withdrawalData.name.trim() === "") {
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
      await updateDoc(detailsRef, {
        activeBalance: increment(-withdrawalData.amount),
      });

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
        type:'withdraw'
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
              {total}
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

          <Button
            className="w-full p-2.5 rounded-lg bg-blue-700 text-white font-bold lg:w-fit"
            onClick={() => submitBankDetails()}
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
