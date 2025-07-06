import Button from "../component/Button";
import Input from "../component/Input";
import Header from "../layout/Header";
import copy from "../assets/icon/Frame (16).svg";
import facebook from "../assets/icon/Frame (20).svg";
import twitter from "../assets/icon/Frame (19).svg";
import email from "../assets/icon/Frame (18).svg";
import share from "../assets/icon/Frame (17).svg";

export default function Invite() {
  return (
    <div className='bg-gray-100 p-3 min-h-screen z-4 md:w-[70%] lg:w-[75%]'>
      <Header Page={"Referral"} />
      <main className='lg:flex lg:space-x-2 lg:mt-3 '>
        <div className='bg-white p-4 mt-12 rounded-lg space-y-5 md:w-full'>
          <section className='space-y-2'>
            <h1 className='font-bold'>Your Referral Link</h1>
            <Input
              readOnly={true}
              value={"https://Kinnex.com/ref/alex123"}
              className={"p-3 bg-gray-100 rounded-l-lg max-w-[70%]"}
            />
            <Button
              className={
                "text-white p-3 rounded-r-lg bg-[#1E3A8A] min-w-[30%] space-x-1"
              }
            >
              <img src={copy} className='w-6 inline-block' />
              <span>Copy</span>
            </Button>
          </section>

          <section className='space-y-4 space-x-4'>
            <h1 className='font-bold'>Share Via</h1>

            <Button>
              <img src={facebook} className='w-6 inline-block' />
              <span>Facebook</span>
            </Button>

            <Button>
              <img src={twitter} className='w-6 inline-block' />
              <span>Twitter</span>
            </Button>

            <Button>
              <img src={email} className='w-6 inline-block' />
              <span>Email</span>
            </Button>

            <Button>
              <img src={share} className='w-6 inline-block' />
              <span>More</span>
            </Button>
          </section>
        </div>

        <section className='bg-white p-4 mt-12 rounded-lg space-y-5 md:w-full'>
          <div className='flex justify-between'>
            <h1 className='font-bold'>Your Referrals</h1>
            <h1 className='bg-purple-300 p-1 text-sm rounded-xl text-blue-600 font-bold w-fit'>
              21 Total
            </h1>
          </div>

          <table>
            <thead>
              <tr className='text-sm text-gray-600 space-x-3'>
                <th>Name</th>
                <th>Date Joined</th>
                <th>Initial Investment</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
