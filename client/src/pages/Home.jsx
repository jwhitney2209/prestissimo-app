import Header from "../components/Header";
import CallToAction from "../components/CallToAction";
import About from "../components/About";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import Contact from "../components/Contact.jsx";
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
