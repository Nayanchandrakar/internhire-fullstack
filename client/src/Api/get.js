import axios from "axios"

const url = import.meta.env.VITE_REACT_LOCAL_URL

const fetchData = async (endpoint) => {
  try {
    const data = await axios.get(url + endpoint, { withCredentials: true })
    return data
  } catch (error) {
    console.log(error)
  }
}

export { fetchData }
