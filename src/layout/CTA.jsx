import Button from "../component/Button";
import forward from "../assets/icon/Arrow forward.svg";
export default function CTA() {
  return (
    <div className='bg-gradient-to-r from-blue-700 to-blue-900 px-4 py-12 text-center text-white space-y-7 md:px-15 lg:px-25 xl:px-45'>
      <h1 className='text-2xl font-bold'>
        Ready to Secure Your Financial Future?
      </h1>
      <p>
        Schedule a consultation with one of our investment advisors to discuss
        how Kinnex Ltd can help you achieve your financial goals
      </p>
      <Button className='bg-white text-blue-800 font-bold p-3 rounded-lg w-[80%] lg:w-[60%] xl:w-[40%]'>
        <h1 className='inline-block'>Get Started Now</h1>
        <img src={forward} className='inline-block' />
      </Button>

      <section className='space-x-4'>
        <span>Whatsapp</span>
        <span>
          <b>+2349167950558</b>
        </span>
      </section>
    </div>
  );
}
