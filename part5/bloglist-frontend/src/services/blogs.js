import axios from 'axios'
const baseUrl = '/api/blogs'
const userUrl = 'api/users'

let token = null 

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject, username) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const users = await axios.get(userUrl)
  blogObject.userId = users.data.find(obj => obj.username === username).id
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

export default { getAll, setToken, create }