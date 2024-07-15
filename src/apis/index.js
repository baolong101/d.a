import axios from 'axios';

// Tạo một hàm để lấy token từ localStorage
const getToken = localStorage.getItem('token')

// Tạo một axios instance và cấu hình Authorization header với token từ localStorage
export const instance = axios.create({
  baseURL: 'http://192.168.111.183:5204/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}` // Sử dụng getToken() để lấy token từ localStorage
  },
  maxBodyLength: Infinity,
  // timeout: 3000
});




export const getAll = async () => {
  try {
    const { data } = await instance.get('/User');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPr=async()=>{
  try {
    const { data } = await instance.post('/Product/Create');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}