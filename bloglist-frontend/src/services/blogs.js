import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null


const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    await axios.delete(`${baseUrl}/${id}`, config)
  } catch (error) {
    console.error('Error deleting the blog:', error.response ? error.response.data : error.message)
  }
}

const update = async (id, newObject) => {
  //console.log(`${baseUrl}/${id}`)
  try
  {
    // const request = axios.put(`${baseUrl}/${id}`, newObject)
    // console.log("Requestin response data: ",request.then(response => response.data))
    // return request.then(response => response.data)
    await axios.put(`${baseUrl}/${id}`, newObject)
  }
  catch (error)
  {
    console.log("Updaten error: ", error)}
} 


export default { getAll, create, remove, update, setToken }