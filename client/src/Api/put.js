import axios from "axios"

const url = import.meta.env.VITE_REACT_LOCAL_URL

const putdata = async (endpoint, modifyformdata) => {
  try {
    const data = await axios.put(
      url + endpoint,
      { ...modifyformdata },
      { withCredentials: true }
    )
    return data
  } catch (error) {
    window.alert(error)
    console.log(error)
  }
}

export { putdata }
