import axios from 'axios';
const instance = axios.create({baseURL: 'https://18fe-68-50-33-57.ngrok.io',headers:{"Content-Type":"application/json"}});
// instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance