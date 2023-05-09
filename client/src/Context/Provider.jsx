import React, { useContext, useState, useEffect } from "react"
import { fetchData } from "../FIle/Exporter.js"

const AppContext = React.createContext()
const Provider = ({ children }) => {
  // React usestate Hooks
  const [data, setdata] = useState([])
  const [isAuth, setisAuth] = useState(false)
  const [form, setform] = useState([])
  const [isValid, setValid] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const callApi = async () => {
    const resdata = await fetchData("auth")
    if (resdata?.status == 200 && resdata?.statusText == "OK") {
      return setisAuth(true), setdata(resdata)
    } else {
      return setisAuth(false)
    }
  }

  const formdataApi = async () => {
    setSpinner(true)
    const formdata = await fetchData("auth/verify/v1")
    if (
      formdata?.status == 200 &&
      formdata?.statusText == "OK" &&
      formdata?.data?.applicationStatus
    ) {
      return setValid(true), setform(formdata?.data), setSpinner(false)
    } else {
      return setValid(false), setSpinner(false)
    }
  }

  useEffect(() => {
    callApi(), formdataApi()
  }, [])

  return (
    <AppContext.Provider
      value={{
        data,
        isAuth,
        setisAuth,
        isValid,
        setValid,
        setform,
        form,
        formdataApi,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGLobalContext = () => useContext(AppContext)
export { useGLobalContext, Provider }
