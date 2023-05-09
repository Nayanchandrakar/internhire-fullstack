import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { fetchData, logo, useGLobalContext } from "../FIle/Exporter.js"

const User = () => {
  const { isAuth, setisAuth, setValid, setdata } = useGLobalContext()

  const handlelogout = async () => {
    return (
      await fetchData("auth/logout"),
      setisAuth(false),
      setValid(false),
      setdata([])
    )
  }

  return (
    <div className="w-[10rem] h-auto shadow-lg  shadow-black/[.2] absolute rounded-lg top-[6rem] p-4 right-[1.5rem] transition-all bg-white">
      {isAuth ? (
        <li className="flex flex-col gap-3 text-sm font-thin">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/Application"}>Application</NavLink>
          <NavLink onClick={handlelogout}>logout</NavLink>
        </li>
      ) : (
        <li className="flex flex-col gap-3 text-sm font-thin">
          <NavLink
            onClick={() =>
              window.open(
                import.meta.env.VITE_REACT_LOCAL_URL + "auth/google",
                "_self"
              )
            }
          >
            login/register
          </NavLink>
        </li>
      )}
    </div>
  )
}

const Header = () => {
  const [open, setopen] = useState(false)
  const { data, isAuth } = useGLobalContext()
  const handleClick = () => (open ? setopen(false) : setopen(true))

  return (
    <nav className="max-w-7xl mx-auto w-full sm:px-8 xl:px-0 px-4 h-[76px] flex justify-center items-center relative">
      <div className="w-full flex justify-between ">
        <span className="flex justify-center items-center">
          <NavLink
            to="/"
            className="first-letter:text-red-600 first-letter:text-2xl first-letter:font-bold font-medium text-xl"
          >
            <img src="/headerlogo.jpeg" className="w-full h-6" alt="" />
          </NavLink>
        </span>

        <li className="flex text-black/[.5] flex-row gap-4 justify-center items-center">
          <img
            src={isAuth ? data?.data?.profileImage : logo}
            onClick={handleClick}
            className="w-10 cursor-pointer h-10 rounded-full"
            alt=""
          />
          {open ? <User /> : null}
        </li>
      </div>
    </nav>
  )
}

export default Header
