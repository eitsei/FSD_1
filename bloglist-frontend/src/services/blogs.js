import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  try
  {const response = await axios.post(baseUrl, newObject, config)
    return response.data}
  catch (error) {
    console.log('Createn error: ', error)
  }
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

const update = async (newObject) => {
  console.log('New Object: ',newObject)
  try
  {
    // const request = axios.put(`${baseUrl}/${id}`, newObject)
    // console.log("Requestin response data: ",request.then(response => response.data))
    // return request.then(response => response.data)
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    console.log('Response data: ',response.data)
    return response.data
  }
  catch (error)
  {
    console.log('Updaten error: ', error)}
}


export default { getAll, create, remove, update, setToken }