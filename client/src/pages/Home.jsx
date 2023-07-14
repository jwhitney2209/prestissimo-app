import React from "react";

import Header from "../components/Header.component.jsx";
import CallToAction from "../components/CallToAction.component.jsx";
import Footer from "../components/Footer.component.jsx"
export default function Home() {
  return (
    <>
      <div className="mx-auto">
        <Header />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
}
