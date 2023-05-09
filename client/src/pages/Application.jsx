import React, { useEffect, useState } from "react"
import { PaperClipIcon } from "@heroicons/react/20/solid"
import {
  ContentWrapper,
  putdata,
  toastMessage,
  useGLobalContext,
} from "../FIle/Exporter.js"
import { downloadFIle } from "../utils/index.js"
import { NavLink } from "react-router-dom"

const Application = () => {
  const { isValid, setValid, setform, form, isAuth, formdataApi } =
    useGLobalContext()

  useEffect(() => {
    formdataApi()
  }, [])

  const [edit, setedit] = useState(false)
  const [disable, setdisable] = useState(true)

  const handleEdit = (e) => {
    e.preventDefault()
    setedit(true)
    setdisable(false)
  }

  const handleform = async (e) => {
    e.preventDefault()

    if (!disable) {
      const datasent = {}
      datasent.fullname = e.target[0].value
      datasent.application = e.target[1].value
      datasent.email = e.target[2].value
      datasent.salary = e.target[3].value
      datasent.about = e.target[4].value
      const editform = await putdata("auth/form/v1/update", datasent)

      if (
        editform?.data.statusEdited &&
        editform?.status == 200 &&
        editform?.statusText == "OK"
      ) {
        return (
          toastMessage("Form edited Succefully", "success"),
          setdisable(true),
          setedit(false)
        )
      } else {
        setdisable(false)
      }
    }
  }

  return (
    <ContentWrapper>
      <form className="mt-8" onSubmit={handleform}>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              {edit ? (
                <input
                  type="text"
                  required={true}
                  defaultValue={form?.data?.fullname}
                  className="border border-gray-200 rounded-base outline-none text-sm text-gray-700 p-1"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {form?.data?.fullname}
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Application for
              </dt>
              {edit ? (
                <input
                  type="text"
                  required={true}
                  defaultValue={form?.data?.application}
                  className="border border-gray-200 rounded-base outline-none text-sm text-gray-700 p-1"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {form?.data?.application}
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              {edit ? (
                <input
                  type="email"
                  required={true}
                  defaultValue={form?.data?.email}
                  className="border border-gray-200 rounded-base outline-none text-sm text-gray-700 p-1"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {form?.data?.email}
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Salary expectation
              </dt>

              {edit ? (
                <input
                  type="text"
                  required={true}
                  defaultValue={form?.data?.salary}
                  className="border border-gray-200 rounded-base outline-none text-sm text-gray-700 p-1"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  ${form?.data?.salary}
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              {edit ? (
                <textarea
                  required={true}
                  defaultValue={form?.data?.about}
                  className="border border-gray-200 p-2 text-gray-700 text-sm"
                ></textarea>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {form?.data?.about}
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          {form?.data?.resume}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <NavLink
                        onClick={() => downloadFIle(form?.data?.resume)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="w-fit px-4 py-2 text-sm bg-red-500 rounded-lg font-cabin text-white font-semibold mt-4"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className={`w-fit px-5 py-2 text-sm bg-violet-700 rounded-lg ${
              disable ? "opacity-40 cursor-not-allowed" : null
            } font-cabin text-white font-semibold mt-4`}
          >
            Save
          </button>
        </div>
      </form>
    </ContentWrapper>
  )
}

export default Application
