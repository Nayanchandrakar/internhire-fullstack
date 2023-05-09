import React from "react"
import {
  About,
  Form,
  ContentWrapper,
  useGLobalContext,
  toastMessage,
} from "../FIle/Exporter.js"

const Home = () => {
  const { isAuth, isValid } = useGLobalContext()

  const handlehired = () => {
    if (isAuth) {
      return window.scrollTo(0, 500)
    } else {
      return toastMessage("please Signup first", "error")
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center gap-2 flex-col w-full">
        <div className="flex w-full justify-center items-end relative">
          <img
            src="/hero.jpg"
            className="w-full h-[30rem] object-cover"
            alt=""
          />
        </div>
        <div className="absolute p-3  bg-gray-100 w-[18rem] h-fit rounded-lg shadow-lg top-[32rem] shadow-black/[.2] flex justify-center flex-col items-center">
          <p className="text-gray-700 text-xs underline">
            Internhire is a platform for programers to land their job
          </p>
          <button
            onClick={handlehired}
            className="w-fit px-3 py-2 text-sm bg-violet-700 rounded-lg text-white font-semibold mt-4"
          >
            Get Hired!
          </button>
        </div>
      </div>
      <ContentWrapper>
        <About />
        <span id="formid" />
        {isValid ? (
          <div className="flex justify-center items-center border-dashed border border-blue-800 bg-sky-100 mt-8 h-[4rem] rounded-lg text-base text-blue-500 font-Cabin">
            Applied Succefully
          </div>
        ) : (
          <Form />
        )}
      </ContentWrapper>
    </div>
  )
}

export default Home
