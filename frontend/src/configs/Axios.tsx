import axios from 'axios'

export const Axios = axios.create({
	baseURL: 'http://192.168.0.110:8080/api',
})
