import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://192.168.111.183:7248/api/',
  headers: {
    'Content-Type': 'application/json'
  },
  // timeout: 3000
})

export const getAll = async () => {
  try {
    const { data } = await instance.get('/User')
    return data
  } catch (error) {
    console.log(error)
  }
}
