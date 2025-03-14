import Header from "~/Components/Layouts/Header";
import Footer from "~/Components/Layouts/Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { clearLocalStorage } from "~/Services/storage";

function Index() {
  const backgroundcolor = "bg-gray-900";
  const textcolor = "text-white";

  useEffect(() => {
    clearLocalStorage();
  }, []); // Everytime we launch the app
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header backgroundcolor={backgroundcolor} textcolor={textcolor} />
        <div className="w-full mx-auto mb-7 flex-grow">
          <Outlet />
        </div>
        <Footer backgroundcolor={backgroundcolor} textcolor={textcolor} />
      </div>
    </>
  )
}

export default Index