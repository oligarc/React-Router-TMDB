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
      <div className="flex flex-col min-h-screen">
        <Header backgroundcolor="bg-yellow-500" textcolor="text-black" />
        <div className="w-full mx-auto mb-7 flex-grow">
          <Outlet />
        </div>
        <Footer backgroundcolor="bg-amber-400" />
      </div>
    </>
  )
}

export default Index