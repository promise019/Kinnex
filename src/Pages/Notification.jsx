import Header from "../layout/Header";
import info from "../assets/icon/Frame (12) (1).svg";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Notification() {
  const [transactions, setTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("kinnex-login") ||
      localStorage.getItem("kinnex-login")
  );

  useEffect(() => {
    if (!currentUser) return;

    const transactionRef = collection(
      db,
      "users",
      currentUser, //currentUser is UID string
      "transaction"
    );

    //Listen in real-time instead of fetching once
    const unsubscribe = onSnapshot(transactionRef, (snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      //Sort by date string (since you're not using timestamp)
      data.sort((a, b) => {
        const d1 = new Date(`${a.date} ${a.time}`);
        const d2 = new Date(`${b.date} ${b.time}`);
        return d2 - d1; // newest first
      });

      setTransactions(data);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [currentUser, db]);

  return (
    <main className="bg-gray-100 p-3 min-h-screen z-4 md:ml-[30%] lg:ml-[25%] md:w-[70%] lg:w-[75%] ">
      <Header Page={"Notification"} />
      <hr className="mt-10 mb-3" />
      <section className="invite bg-blue-100 text-blue-900 flex rounded-lg p-2 space-x-3 space-y-3">
        <img src={info} className="w-7 h-7" />
        <div className="space-y-2 space-x-4">
          <h1 className="inline-block">
            Click on the links below to join our channels;
          </h1>
          <a
            href="https://bit.ly/4fZzBy6"
            className="font-bold"
          >
            Whatsapp
          </a>
          <a href="https://t.me/kinnexglobal1937" className="font-bold">
            Telegram
          </a>
          <a href="https://wa.me/+13657400656" className="font-bold">
            Customer Support
          </a>
        </div>
      </section>

      <section className="pb-18">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <div className="space-y-3 lg:grid lg:grid-cols-2">
            {transactions.map((tx) => (
              <table className="w-full p-4 shadow rounded-lg">
                <tbody className="space-y-3 p-4">
                  <tr>
                    <td className="p-2 font-bold">Transaction Details</td>
                  </tr>
                  <tr>
                    <td className="p-2">Amount:</td>
                    <td
                      className={`text-right p-2 font-bold ${
                        tx.type === "withdraw" ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      &#8358;{tx.amount}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Date:</td>
                    <td className="text-right p-2 font-bold">{tx.date}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Time</td>
                    <td className="text-right p-2 font-bold text-green-400">
                      {tx?.time}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
