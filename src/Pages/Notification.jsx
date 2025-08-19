import Header from "../layout/Header";
import info from "../assets/icon/Frame (12) (1).svg";
import { useState } from "react";

export default function Notification() {
  const [notification, setNotification] = useState();
  const getNotifications = async () => {};

  return (
    <main className="bg-gray-100 p-3 min-h-screen z-4 md:ml-[30%] lg:ml-[25%] md:w-[70%] lg:w-[75%] ">
      <Header Page={"Notification"} />
      <hr className="mt-10 mb-3" />
      <section className="invite bg-blue-100 text-blue-900 flex rounded-lg p-2 space-x-3">
        <img src={info} className="w-7 h-7" />
        <div className="space-y-2 space-x-4">
          <h1 className="inline-block">
            Click on the links below to join our channels;
          </h1>
          <a
            href="https://whatsapp.com/channel/0029Vb6ljpS17EmymUhLl61z"
            className="font-bold"
          >
            Whatsapp
          </a>
          <a href="https://t.me/kinnexglobal1937" className="font-bold">
            Telegram
          </a>
        </div>
      </section>

      <section></section>
    </main>
  );
}
