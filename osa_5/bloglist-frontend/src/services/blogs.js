import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateBlog = async (blogObject) => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const deleteBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
    data: {
      blogObject: blogObject
    }
  }
 
  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)
 
  return response.data

}

export default { getAll, create, setToken, updateBlog, deleteBlog }
