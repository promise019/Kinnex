const performance = [
  { heading: "$1.2B", detail: "Assets Under Management" },
  { heading: "94%", detail: "Client Retention Rate" },
  { heading: "18%", detail: "Average Annual Return" },
  { heading: "2,500+", detail: "Satisfied Clients" },
];

export default function Performance({ref}) {
  return (
    <div ref={ref} className='text-center bg-blue-950 text-white px-5 py-10 space-y-5 lg:py-15'>
      <h1 className='text-2xl font-bold'>Our Performance</h1>
      <p>
        We take pride in our track record of delivering consistent results for
        our clients
      </p>

      <section className='grid grid-cols-2 space-y-3 md:grid-cols-4 space-x-3 lg:ml-[5%] xl:ml-[10%]'>
        {performance.map((i, index) => (
          <div
            key={index}
            className='p-2 bg-blue-900 rounded-lg w-[94%] space-y-2 h-[100px] lg:w-[80%] xl:w-[60%]'
          >
            <h1 className='font-bold text-xl'>{i.heading}</h1>
            <p>{i.detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
