import React from "react";

import Header from "../components/Header.component.jsx";
import CallToAction from "../components/CallToAction.component.jsx";
import About from "../components/About.component.jsx";
import Pricing from "../components/Pricing.component.jsx";
import Footer from "../components/Footer.component.jsx"
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
