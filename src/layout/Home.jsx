import Button from "../component/Button";
import forward from "../assets/icon/Arrow forward.svg";
import image1 from "../assets/images/Image.png";
import growth from "../assets/icon/Frame (8).svg";
import stair from "../assets/icon/Frame (7).svg";
import shield from "../assets/icon/Vector.svg";
import { useNavigate } from "react-router";

export default function Home({ref}) {
  const navigate = useNavigate();
  return (
    <div ref={ref}
      id="home"
      className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-3 py-17 space-y-4 
      md:flex md:px-10 md:space-x-6 lg:px-15 xl:px-38"
    >
      <section className="space-y-6 md:space-y-5">
        <h1 className="font-extrabold text-3xl lg:text-5xl">
          Smart Investments for Your Financial Future
        </h1>

        <p>
          Kinnex Ltd offers strategic investment solutions tailored to your
          financial goals with proven results and expert guardiance
        </p>

        <Button
          className="bg-white text-blue-900 p-4 rounded-lg"
          onClick={() => navigate("/registration/signup")}
        >
          Explore Services
          <img src={forward} className="w-5 inline-block" />
        </Button>

        {/* <Button className="text-white p-4">Schedule Consultation</Button> */}
      </section>

      <section className="px-7 py-7 space-y-5 rounded-2xl bg-blue-900 shadow-2xl shadow-blue-950 md:max-h-fit">
        <img src={image1} className="w-full" />
        <div className="flex justify-between space-x-4">
          <div className="grid bg-[#5b7da6] p-4 rounded-xl">
            <img src={growth} className="ml-5" />
            <h1>Growth</h1>
          </div>

          <div className="grid bg-[#5b7da6] p-4 rounded-xl">
            <img src={shield} className="ml-5" />
            <h1>Security</h1>
          </div>

          <div className="grid bg-[#5b7da6] p-4 rounded-xl">
            <img src={stair} className="ml-5" />
            <h1>Returns</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
