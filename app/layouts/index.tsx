import Header from "~/Components/Layouts/Header";
import Footer from "~/Components/Layouts/Footer";
import { Outlet } from "react-router";

function Index() {
  return (
    <>
    
    <Header backgroundcolor="bg-yellow-500" textcolor="text-black" />
    <div className="max-w-7xl mx-auto my-5">
      <Outlet />
    </div>
    <Footer backgroundcolor="bg-amber-400" />
    </>
  )
}

export default Index