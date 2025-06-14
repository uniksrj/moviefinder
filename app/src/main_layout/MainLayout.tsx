import Header from "../include/Header"
import Footer from "../include/Footer"
import { Outlet } from "react-router"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
