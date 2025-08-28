import { createContext, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";

export const userDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [referralData, setReferralData] = useState({
    link: "",
    points: [],
    email: "",
    Firstname: "",
    Lastname: "",
    activeInvestment: 0,
    investmentBalance: 0,
    depositBalance: 0,
    bankDetails: {},
    refUid:''
  });
  const [refList, setRefList] = useState([]);

  //this particular amount state is used here incase a person had made payment and mistakenly exit the deposit page, the payment will still continue
  const [amount, setAmount] = useState(0);
  const [investmentdate, setInvestmentdate] = useState(null || undefined);

  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("kinnex-login") ||
      localStorage.getItem("kinnex-login")
  );

  const getUserData = () => {
    if (!currentUser) return;

    // 🔹 Real-time listener on user document
    const userDocRef = doc(db, "users", currentUser);
    const unsubscribeUser = onSnapshot(userDocRef, (docsnap) => {
      if (docsnap.exists()) {
        const userData = docsnap.data();
        setReferralData({
          link: `kinnexx.com.ng/registration/signup?ref=${userData.ReferralCode}`,
          points: userData.referralCount,
          email: userData.Email,
          Firstname: userData.Firstname,
          Lastname: userData.Lastname,
          activeInvestment: userData.activeInvestment,
          investmentBalance: userData.investmentBalance,
          depositBalance: userData.depositBalance,
          bankDetails: userData?.bankDetails,
          refUid: userData.ReferredBy
        });

        setInvestmentdate(userData?.investmentdate?.toDate() || null);
      }
    });

    // 🔹 Real-time listener on referral collection
    const referralRef = collection(db, "users", currentUser, "refs");
    const q = query(referralRef, orderBy("date"));
    const unsubscribeRefs = onSnapshot(q, (snapshot) => {
      const refs = snapshot.docs.map((docs) => ({
        id: docs.id,
        date: docs.data().date,
        name: docs.data().name,
      }));
      setRefList(refs);
    });

    // 🔹 Return a cleanup function that unsubscribes both
    return () => {
      unsubscribeUser();
      unsubscribeRefs();
    };
  };

  //submit transaction to database after payment
  const submitTransaction = async (response, amount) => {
    if (!currentUser) {
      console.error("⚠️ No logged in user. Cannot submit transaction.");
      return;
    }

    try {
      const transactionRef = collection(
        db,
        "users",
        currentUser,
        "transaction"
      );
      const userRef = doc(db, "users", currentUser); // reference to the user doc

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
        amount: amount,
        type: "deposit",
      });
      
        await updateDoc(userRef, {
          depositBalance: increment(amount),
        });
  

      console.log(response);
      toast.success("Transaction successful");
    } catch (err) {
      console.error("Transaction error:", err);
      toast.error("Transaction failed");
    }
  };

  return (
    <userDataContext.Provider
      value={{
        referralData,
        refList,
        getUserData,
        setCurrentUser,
        submitTransaction,
        investmentdate,
        amount,
        setAmount,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}
