import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Cards from "./components/Cards";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export { Page }

function Page() {
  return (
    <div className="relative">
      <div className="noise-bg absolute inset-0 z-[1]" aria-hidden="true">
        <svg>
          <filter id="noise-bg-fx">
            <feTurbulence baseFrequency="0.5"></feTurbulence>
          </filter>
        </svg>
      </div>
      <div className="min-h-screen flex flex-col z-[10] relative">
        <div className="py-3 pb-20">
          <Navbar />
          <Header />
        </div>
        <div className="flex flex-col w-full items-center">
          <div className="relative h-px w-8/12 bg-gray-700">
            <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 rotate-[-12deg] py-2 px-4 rounded-full bg-red-800 text-gray-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">Services</span>
          </div>
          <Cards />
          <div className="w-full bg-gray-700/25 border-y border-gray-700">
            <Slider />
          </div>
          {/* <Projects /> */}
          <Contact />
          <div className="relative h-px w-10/12 bg-gray-700" />
          <Footer />
        </div>
      </div>
    </div>
  )
}