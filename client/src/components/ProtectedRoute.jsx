import { useGLobalContext, Notfound } from "../FIle/Exporter.js"

const ProtectedRoute = ({ RenderElement }) => {
  const { isAuth, isValid } = useGLobalContext()

  if (isAuth) {
    if (isValid) {
      return <RenderElement />
    } else {
      return (
        <div className="flex justify-center items-center text-[1.3rem] text-gray-500 h-[80vh] font-Cabin font-bold">
          No Applications found.
        </div>
      )
    }
  } else {
    return <Notfound />
  }
}

export default ProtectedRoute
