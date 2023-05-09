import axios from "axios"

const url = import.meta.env.VITE_REACT_LOCAL_URL

const postdata = async (endpoint, formdata) => {
  try {
    const data = await axios.post(
      url + endpoint,
      { ...formdata },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    return data
  } catch (error) {
    window.alert(error)
    console.log(error)
  }
}

export { postdata }
