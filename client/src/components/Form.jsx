import React, { useState } from "react"
import {
  postdata,
  useGLobalContext,
  toastMessage,
  Loader,
} from "../FIle/Exporter.js"

const Form = () => {
  const { isAuth, setValid } = useGLobalContext()
  const [disable, setdisable] = useState(false)

  const handleform = async (e) => {
    e.preventDefault()
    const firstname = e.target[0].value
    const lastName = e.target[1].value
    const email = e.target[2].value
    const about = e.target[3].value
    const application = e.target[4].value
    const salary = e.target[5].value
    const resume = e.target[6].files[0]

    const formdata = {
      fullname: firstname + "" + lastName,
      email,
      about,
      application,
      salary,
      resume,
    }

    if (isAuth) {
      setdisable(true)
      const formpostdata = await postdata("auth/form/v1", formdata)
      if (formpostdata?.status == 200 && formpostdata?.statusText == "OK") {
        return toastMessage("Form Submitted", "success"), setValid(true)
      }
    } else {
      setdisable(false)
      return toastMessage("please signup", "warning")
    }
  }

  return (
    <form
      className="mt-16"
      onSubmit={handleform}
      method="post"
      enctype="multipart/form-data"
    >
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Tell information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name <strong className="text-red-500">*</strong>
            </label>
            <div className="mt-2">
              <input
                disable={disable}
                type="text"
                name="first-name"
                required={true}
                className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 py-1.5"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name <strong className="text-red-500">*</strong>
            </label>
            <div className="mt-2">
              <input
                disable={disable}
                type="text"
                name="last-name"
                required={true}
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address <strong className="text-red-500">*</strong>
            </label>
            <div className="mt-2">
              <input
                disable={disable}
                name="email"
                type="email"
                required={true}
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              About <strong className="text-red-500">*</strong>
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                required={true}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about your academics.
            </p>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Application for <strong className="text-red-500">*</strong>
            </label>
            <div className="mt-2">
              <input
                disable={disable}
                type="text"
                name="application"
                required={true}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset px-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Salary Expectation <strong className="text-red-500">*</strong>
            </label>
            <div className="mt-2">
              <input
                disable={disable}
                type="text"
                name="salary"
                required={true}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 last-letter:text-red-600 text-gray-900">
              Upload your resume all formats are accepted{" "}
              <strong className="text-red-500">*</strong>
            </label>
            <div className="mt-2">
              <input
                disable={disable}
                type="file"
                required={true}
                name="file"
              />
            </div>
          </div>
        </div>
      </div>

      {disable ? (
        <div className="mt-6 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex flex-row gap-4 justify-center items-center ${
              disable && "opacity-40 cursor-not-allowed"
            } `}
          >
            upload
          </button>
        </div>
      )}
    </form>
  )
}

export default Form
