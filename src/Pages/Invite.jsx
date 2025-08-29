import Button from "../component/Button";
import Input from "../component/Input";
import Header from "../layout/Header";
import copy from "../assets/icon/Frame (16).svg";
import facebook from "../assets/icon/Frame (20).svg";
import twitter from "../assets/icon/Frame (19).svg";
import email from "../assets/icon/Frame (18).svg";
import share from "../assets/icon/Frame (17).svg";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { userDataContext } from "../context/UserDataContext";

export default function Invite() {
  const { referralData, refList } = useContext(userDataContext);

  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralData.link);
      setCopied(true);
      toast.success("link copied");
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error("error copying link");
    }
  }

  function Moreshare() {
    if (navigator.share) {
      navigator
        .share({
          title: "Kinnex Ltd",
          text: "Start investing with Kinnex! Use my referral link:",
          url: referralData.link,
        })
        .then(() => toast.success("Link shared successfully"))
        .catch((err) => toast.error("Share failed"));
    } else {
      toast.info("This device does not support native sharing");
    }
  }

  return (
    <div className='bg-gray-100 p-3 min-h-screen z-4 md:ml-[30%] lg:ml-[25%] md:w-[70%] lg:w-[75%]'>
      <ToastContainer />
      <Header Page={"Referral"} />
      <main className='lg:flex lg:space-x-2 lg:mt-3 '>
        <div className='bg-white p-4 mt-12 rounded-lg space-y-5 md:w-full'>
          <section className='space-y-2'>
            <h1 className='font-bold'>Your Referral Link</h1>
            <Input
              readOnly={true}
              value={referralData.link}
              className={"p-3 bg-gray-100 rounded-l-lg max-w-[70%]"}
            />
            <Button
              className={
                "text-white p-3 rounded-r-lg bg-[#1E3A8A] min-w-[30%] space-x-1"
              }
              onClick={() => copyLink()}
            >
              <img src={copy} className='w-6 inline-block' />
              <span className='text-sm md:text-lg'>
                {copied ? "copied" : "copy"}
              </span>
            </Button>
          </section>

          <section className='space-y-4 space-x-4'>
            <h1 className='font-bold'>Share Via</h1>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${referralData.link}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button className={"space-x-1"}>
                <img src={facebook} className='w-6 inline-block' />
                <span>Facebook</span>
              </Button>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${referralData.link}&text=Join Kinnex Ltd and start investing!`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button className={"space-x-1"}>
                <img src={twitter} className='w-6 inline-block' />
                <span>Twitter</span>
              </Button>
            </a>

            <a
              href={`mailto:?subject=Join Kinnex Ltd&body=Start investing with Kinnex! Use my referral link: ${referralData.link}`}
            >
              <Button className={"space-x-1"}>
                <img src={email} className='w-6 inline-block' />
                <span>Email</span>
              </Button>
            </a>

            <Button className={"space-x-1"} onClick={() => Moreshare()}>
              <img src={share} className='w-6 inline-block' />
              <span>More</span>
            </Button>
          </section>
        </div>

        <section className='bg-white p-4 mt-12 rounded-lg space-y-5 md:w-full'>
          <div className='flex justify-between'>
            <h1 className='font-bold'>Your Referrals</h1>
            <h1 className='bg-purple-300 p-1 text-sm rounded-xl text-blue-600 font-bold w-fit'>
              {referralData.referred} Total
            </h1>
          </div>

          <table className='w-full text-left'>
            <thead className='w-full'>
              <tr className='text-sm text-gray-600 space-x-3'>
                <th>Name</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {refList.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
