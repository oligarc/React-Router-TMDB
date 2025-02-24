import Logo from "~/Components/Logo";

import React from 'react'
import Header from "~/Components/Layouts/Header";
import Footer from "~/Components/Layouts/Footer";

function Index() {
  return (
    <>
    
    <Header backgroundcolor="bg-yellow-500" textcolor="text-black" />
    <div className="max-w-7xl mx-auto my-5 bg-black">
    <Footer />
    </div>
    </>
  )
}

export default Index