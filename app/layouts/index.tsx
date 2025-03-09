import Header from "~/Components/Layouts/Header";
import Footer from "~/Components/Layouts/Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { clearLocalStorage } from "~/Services/storage";

function Index() {

  useEffect(() => {
    clearLocalStorage();
  }, []); // Cuidado con refrescar la web, se carga los favoritos y watchlist
  return (
    <>
    
    <Header backgroundcolor="bg-yellow-500" textcolor="text-black" />
    <div className="w-full mx-auto">
      <Outlet />
    </div>
    <Footer backgroundcolor="bg-amber-400" />
    </>
  )
}

export default Index