import { toastModify } from "../constants/constants.js"
import { toast } from "react-toastify"
import FileSaver from "file-saver"

export const toastMessage = (message, type) => {
  if (type == "info") {
    return toast.info(message, toastModify)
  }
  if (type == "warning") {
    return toast.warn(message, toastModify)
  }
  if (type == "success") {
    return toast.success(message, toastModify)
  }
  if (type == "error") {
    return toast.error(message, toastModify)
  }
}

export const downloadFIle = (url) => FileSaver.saveAs(url, "resume.pdf")
