import rating from "../assets/icon/Frame (6).svg";

const review = [
  {
    detail:
      "Kinnex has transformed our company's financial strategy. Their expert guidiance has led to consistent growth of our portfolio even in volatile markets",
    name: "Sarah Johnson",
    title: "CEO, TechStart Inc.",
  },
  {
    detail:
      "I've been working with kinnex for my retirement planning for over 5 years. Their personalized approach and attention to detail has given me a peace of mind about my financial future",
    name: "Michael Chen",
    title: "Retired Professional",
  },
  {
    detail:
      "The Team of Kinnex truly understands the unique challenges of small business ownes. Their investment strategies have helped me both grow my business and secure my personal finances",
    name: "Rebecca Taylor",
    title: "Small Business Owner",
  },
];
export default function Reviews() {
  return (
    <div className='text-center py-9 px-3 bg-gray-200 space-y-5'>
      <h1 className='text-2xl font-bold'>What Our Clients Say</h1>
      <p>
        Don't just take our word for it. Here's what some of our clients have to
        say about their experience with Kinnex Ltd.
      </p>

      <div className='grid space-y-6 md:grid-cols-3 md:space-x-5 md:ml-[2%]'>
        {review.map((reviews, index) => (
          <section
            key={index}
            className='bg-white shadow-2xl p-5 text-left rounded-lg space-y-4 md:w-[93%] md:h-90 lg:h-76 xl:h-65'
          >
            <img src={rating} className='inline-block' />
            <img src={rating} className='inline-block' />
            <img src={rating} className='inline-block' />
            <img src={rating} className='inline-block' />
            <img src={rating} className='inline-block' />

            <p>{`"${reviews.detail}"`}</p>

            <article className='float-right'>
              <h1 className='font-bold text-lg'>{reviews.name}</h1>
              <p>{reviews.title}</p>
            </article>
          </section>
        ))}
      </div>
    </div>
  );
}
