import axios from 'axios';
const instance = axios.create({baseURL: 'https://025b-2601-801-100-f620-b8c8-b8b4-6a76-4456.ngrok.io/',headers:{"Content-Type":"application/json"}});
// instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance