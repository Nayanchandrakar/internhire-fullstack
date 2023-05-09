import React, { lazy, Suspense } from "react"
import {
  Header,
  Home,
  Footer,
  Loader,
  ProtectedRoute,
} from "./FIle/Exporter.js"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const Application = lazy(() => import("./pages/Application"))
  const Notfound = lazy(() => import("./pages/Notfound.jsx"))

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[80vh]">
            <Loader />
          </div>
        }
      >
        <ToastContainer />
        <header className=" bg-white text-white sticky top-0 z-30 border-b-[1px] border-gray-200">
          <Header />
        </header>
        <main className="overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Application"
              element={<ProtectedRoute RenderElement={Application} />}
            />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
