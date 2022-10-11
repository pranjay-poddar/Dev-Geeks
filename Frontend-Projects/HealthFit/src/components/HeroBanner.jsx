import HeroBannerImage from "../assets/images/banner.png"

const HeroBanner = () => {
  return (
    <>
      <section className="text-gray-600 body-font mt-16 lg:mt-0">
        <div className="mx-auto container flex md:flex-row flex-col items-center md:items-start">
          <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-28 lg:mb-52 items-center text-center relative py-10 md:px-20 md:py-20 lg:py-36">
            <h1 className="title-font text-3xl mb-6 font-semibold text-indigo-900 dark:text-indigo-400">
              Welcome Dear!
            </h1>
            <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900 dark:text-gray-200">
              Sweat, Smile
              <br className="md:inline-block hidden" /> & Repeat.
            </h1>
            <p className="mb-8 leading-relaxed dark:text-gray-200">Check out the most effective exercises</p>
            <div className="flex justify-center">
              <a
                href="#exercises"
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Explore Exercises
              </a>
            </div>
            <div className="opacity-10 hidden sm:block font-semibold text-[200px] text-indigo-900 -z-10 absolute top-20 md:top-96 -left-20 md:left-20 pointer-events-none dark:text-gray-500">
              Exercises
            </div>
          </div>

          <div className="md:w-1/2 w-0 md:float-right">
            <img
              src={HeroBannerImage}
              alt="Banner"
              className="object-cover object-center pointer-events-none rounded-[70px] lg:rounded-none"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroBanner
