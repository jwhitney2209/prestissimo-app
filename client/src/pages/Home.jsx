import Header from "../components/landing-page/Header";
import CallToAction from "../components/landing-page/CallToAction";
import About from "../components/landing-page/About";
import Pricing from "../components/landing-page/Pricing";
import Footer from "../components/landing-page/Footer";
import Contact from "../components/landing-page/Contact.jsx";
export default function Home() {
  return (
    <>
      <div className="mx-auto">
        <Header />
        <CallToAction />
        <About />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
