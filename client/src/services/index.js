import axios from "axios";

const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

export const defaultRoute = async () => {
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
} 

export const login = async (userInfo) => {
  try{
    const response = await  axios.post(`${apiURL}/user/login`, userInfo)
    return response.data;
  }catch(error){
    console.error(error.message)
  }
}

export const register = async (newUser) => {
  try {
    const response = await axios.post(`${apiURL}/user/register`, newUser);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export const logout = async () => {
  try {
    await axios.get(`${apiURL}/auth/logout`)
  } catch (error) {
    console.error(error.message)
  }
}

export const getAllStops = async() => {
  try {
    const response = await axios.get(`${apiURL}/stops/`)
    return response.data
  } catch (error) {
    console.error(error.message)
  }
}

export const postStop = async (newStop) => {
  try {
    await axios.post(`${apiURL}/stops/new`, newStop)
  } catch (error) {
    console.error(error.message)
  }
}


export const updateStop = async (updatedStop, stopId) => {
  try {
    await axios.put(`${apiURL}/stops/${stopId}`,updatedStop)
  } catch (error) {
    console.error(error.message)
  }
}

export const deleteStop = async (stopId) => {
  try {
    await axios.delete(`${apiURL}/stops/${stopId}`)
  } catch (error) {
    console.error(error.message)
  }
}

